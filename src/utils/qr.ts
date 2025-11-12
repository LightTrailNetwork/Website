import QRCode from 'qrcode';
import jsQR from 'jsqr';
import type { Relation, UserProfile } from '../data/types';

export interface LinkPayload {
  type: 'triad-link';
  version: '1.0';
  userId: string;
  userName: string;
  relation: Relation;
  timestamp: number;
}

export interface ActivitySnapshot {
  type: 'activity-snapshot';
  version: '1.0';
  userId: string;
  userName: string;
  todayProgress: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
  };
  currentRole: string;
  timestamp: number;
}

/**
 * Generate a QR code as a data URL for a relation link
 */
export async function generateLinkQR(
  userProfile: UserProfile,
  relation: Relation
): Promise<string> {
  const payload: LinkPayload = {
    type: 'triad-link',
    version: '1.0',
    userId: userProfile.id,
    userName: userProfile.name,
    relation,
    timestamp: Date.now(),
  };

  const dataString = JSON.stringify(payload);
  
  try {
    const qrDataUrl = await QRCode.toDataURL(dataString, {
      width: 300,
      margin: 2,
      color: {
        dark: '#2563eb',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
    return qrDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generate a QR code for current activity snapshot
 */
export async function generateActivityQR(
  userProfile: UserProfile,
  todayProgress: { morning: boolean; afternoon: boolean; night: boolean }
): Promise<string> {
  const payload: ActivitySnapshot = {
    type: 'activity-snapshot',
    version: '1.0',
    userId: userProfile.id,
    userName: userProfile.name,
    todayProgress,
    currentRole: userProfile.currentRole,
    timestamp: Date.now(),
  };

  const dataString = JSON.stringify(payload);
  
  try {
    const qrDataUrl = await QRCode.toDataURL(dataString, {
      width: 300,
      margin: 2,
      color: {
        dark: '#059669',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
    return qrDataUrl;
  } catch (error) {
    console.error('Error generating activity QR code:', error);
    throw new Error('Failed to generate activity QR code');
  }
}

/**
 * Decode QR code from image data
 */
export function decodeQR(imageData: ImageData): LinkPayload | ActivitySnapshot | null {
  try {
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (!code) {
      return null;
    }

    const decoded = JSON.parse(code.data);
    
    // Validate the decoded data
    if (
      (decoded.type === 'triad-link' || decoded.type === 'activity-snapshot') &&
      decoded.version === '1.0' &&
      decoded.userId &&
      decoded.userName
    ) {
      return decoded;
    }
    
    return null;
  } catch (error) {
    console.error('Error decoding QR code:', error);
    return null;
  }
}

/**
 * Process a decoded link payload to establish relationship
 */
export function processLinkPayload(payload: LinkPayload): {
  success: boolean;
  message: string;
  action?: 'add-relation';
  relation?: Relation;
  userId?: string;
  userName?: string;
} {
  // Check if payload is recent (within 5 minutes)
  const ageMinutes = (Date.now() - payload.timestamp) / (1000 * 60);
  if (ageMinutes > 5) {
    return {
      success: false,
      message: 'This QR code has expired. Please generate a new one.',
    };
  }

  return {
    success: true,
    message: `Ready to connect with ${payload.userName} as your ${payload.relation}`,
    action: 'add-relation',
    relation: payload.relation,
    userId: payload.userId,
    userName: payload.userName,
  };
}

/**
 * Process a decoded activity snapshot
 */
export function processActivitySnapshot(payload: ActivitySnapshot): {
  success: boolean;
  message: string;
  data?: ActivitySnapshot;
} {
  return {
    success: true,
    message: `Activity snapshot from ${payload.userName}`,
    data: payload,
  };
}