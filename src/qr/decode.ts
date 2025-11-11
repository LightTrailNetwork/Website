import jsQR from 'jsqr';
import { QRPayload, QRLinkCard, QRActivitySnapshot } from '../data/models';

// Base64url decoding (URL-safe, no padding)
function base64urlDecode(str: string): string {
  // Add padding if needed
  let padded = str;
  while (padded.length % 4) {
    padded += '=';
  }
  
  // Convert URL-safe characters back
  const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  
  try {
    return atob(base64);
  } catch (error) {
    throw new Error('Invalid base64 encoding');
  }
}

// Decode QR payload from base64url string
export function decodeQRPayload(encoded: string): QRPayload {
  try {
    const json = base64urlDecode(encoded);
    const payload = JSON.parse(json);
    
    // Validate basic structure
    if (!payload.v || !payload.kind || !payload.from || !payload.ts) {
      throw new Error('Invalid payload structure');
    }
    
    // Validate version
    if (payload.v !== 1) {
      throw new Error(`Unsupported payload version: ${payload.v}`);
    }
    
    // Validate kind
    if (payload.kind !== 'link' && payload.kind !== 'snapshot') {
      throw new Error(`Unknown payload kind: ${payload.kind}`);
    }
    
    return payload as QRPayload;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to decode QR payload');
  }
}

// Validate link card payload
export function validateLinkCard(payload: QRLinkCard): void {
  if (!payload.relation) {
    throw new Error('Missing relation in link card');
  }
  
  const validRelations = ['myMentor', 'myMentee', 'mySteward', 'myScout', 'myPreScout'];
  if (!validRelations.includes(payload.relation)) {
    throw new Error(`Invalid relation: ${payload.relation}`);
  }
}

// Validate activity snapshot payload
export function validateActivitySnapshot(payload: QRActivitySnapshot): void {
  if (!payload.role) {
    throw new Error('Missing role in activity snapshot');
  }
  
  if (!payload.today || !payload.today.d) {
    throw new Error('Missing today data in activity snapshot');
  }
  
  const validRoles = ['PRE_SCOUT', 'SCOUT', 'MENTEE', 'MENTOR', 'STEWARD'];
  if (!validRoles.includes(payload.role)) {
    throw new Error(`Invalid role: ${payload.role}`);
  }
}

// Scan QR code from image data
export function scanQRFromImageData(
  imageData: ImageData
): string | null {
  try {
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    return code?.data || null;
  } catch (error) {
    console.error('QR scan error:', error);
    return null;
  }
}

// Process scanned QR code text
export function processScannedQR(qrText: string): QRPayload {
  // Try to decode as base64url first
  try {
    return decodeQRPayload(qrText);
  } catch (error) {
    // If that fails, try to parse as direct JSON
    try {
      const payload = JSON.parse(qrText);
      
      // Validate basic structure
      if (!payload.v || !payload.kind || !payload.from || !payload.ts) {
        throw new Error('Invalid payload structure');
      }
      
      return payload as QRPayload;
    } catch (jsonError) {
      throw new Error('Invalid QR code format');
    }
  }
}

// Check if QR payload is expired (optional staleness check)
export function isPayloadExpired(payload: QRPayload, maxAgeMs: number = 24 * 60 * 60 * 1000): boolean {
  const age = Date.now() - payload.ts;
  return age > maxAgeMs;
}

// Extract camera stream for QR scanning
export async function getCameraStream(
  constraints: MediaStreamConstraints = { video: { facingMode: 'environment' } }
): Promise<MediaStream> {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    console.error('Camera access error:', error);
    throw new Error('Camera access denied or not available');
  }
}

// Stop camera stream
export function stopCameraStream(stream: MediaStream): void {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

// Convert video frame to ImageData for QR scanning
export function getImageDataFromVideo(
  video: HTMLVideoElement,
  canvas?: HTMLCanvasElement
): ImageData | null {
  if (!video.videoWidth || !video.videoHeight) {
    return null;
  }
  
  const canvasElement = canvas || document.createElement('canvas');
  const context = canvasElement.getContext('2d');
  
  if (!context) {
    return null;
  }
  
  canvasElement.width = video.videoWidth;
  canvasElement.height = video.videoHeight;
  
  context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  
  return context.getImageData(0, 0, video.videoWidth, video.videoHeight);
}

// Scan QR from video element
export function scanQRFromVideo(
  video: HTMLVideoElement,
  canvas?: HTMLCanvasElement
): string | null {
  const imageData = getImageDataFromVideo(video, canvas);
  if (!imageData) {
    return null;
  }
  
  return scanQRFromImageData(imageData);
}