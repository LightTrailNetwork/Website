import { useEffect, useRef, useState, useCallback } from 'react';
import { decodeQR } from '../utils/qr';
import type { LinkPayload, ActivitySnapshot } from '../utils/qr';

interface QRScannerProps {
  onScanResult: (result: LinkPayload | ActivitySnapshot) => void;
  onError: (error: string) => void;
  isActive: boolean;
}

export default function QRScanner({ onScanResult, onError, isActive }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scanIntervalRef = useRef<number>();

  const startScanning = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || isScanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    setIsScanning(true);

    const scan = () => {
      if (!video.videoWidth || !video.videoHeight) {
        scanIntervalRef.current = requestAnimationFrame(scan);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const decoded = decodeQR(imageData);

      if (decoded) {
        setIsScanning(false);
        onScanResult(decoded);
        return;
      }

      if (isScanning) {
        scanIntervalRef.current = requestAnimationFrame(scan);
      }
    };

    scanIntervalRef.current = requestAnimationFrame(scan);
  }, [onScanResult, isScanning]);

  const stopScanning = useCallback(() => {
    setIsScanning(false);
    if (scanIntervalRef.current) {
      cancelAnimationFrame(scanIntervalRef.current);
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });

      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
        startScanning();
      }
    } catch (error) {
      console.error('Error starting camera:', error);
      onError('Failed to access camera. Please check permissions.');
    }
  }, [startScanning, onError]);

  const stopCamera = useCallback(() => {
    stopScanning();
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream, stopScanning]);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isActive, startCamera, stopCamera]);

  return (
    <div className="relative">
      {/* Video element for camera feed */}
      <video
        ref={videoRef}
        className="w-full h-48 bg-black rounded-lg object-cover"
        playsInline
        muted
        style={{ display: stream ? 'block' : 'none' }}
      />
      
      {/* Canvas for image processing (hidden) */}
      <canvas
        ref={canvasRef}
        className="hidden"
      />
      
      {/* Placeholder when camera is not active */}
      {!stream && (
        <div className="w-full h-48 bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <span className="text-gray-500">
            Camera not active
          </span>
        </div>
      )}
      
      {/* Scanning overlay */}
      {stream && isScanning && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-2 border-primary-500 rounded-lg animate-pulse" />
        </div>
      )}
      
      {/* Status text */}
      <p className="text-sm text-gray-600 mt-2 text-center">
        {stream ? (
          isScanning ? 'Scanning for QR code...' : 'Camera active'
        ) : (
          'Camera not started'
        )}
      </p>
    </div>
  );
}