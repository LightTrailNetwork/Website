import QRCode from 'qrcode';
import { QRPayload, QRLinkCard, QRActivitySnapshot, Role, Relation } from '../data/models';

// Base64url encoding (URL-safe, no padding)
function base64urlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Encode payload to base64url string
export function encodeQRPayload(payload: QRPayload): string {
  const json = JSON.stringify(payload);
  return base64urlEncode(json);
}

// Generate QR code data URL from payload
export async function generateQRCode(payload: QRPayload): Promise<string> {
  const encoded = encodeQRPayload(payload);
  
  try {
    const dataUrl = await QRCode.toDataURL(encoded, {
      width: 256,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    });
    
    return dataUrl;
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

// Create a link card QR payload
export function createLinkCard(
  myId: string,
  relation: Relation
): QRLinkCard {
  return {
    v: 1,
    kind: 'link',
    from: myId,
    relation,
    ts: Date.now()
  };
}

// Create an activity snapshot QR payload
export function createActivitySnapshot(
  myId: string,
  role: Role,
  todayISO: string,
  todayActivity: { M?: number; A?: number; N?: number },
  recentActivity: Array<{ dateISO: string; M?: number; A?: number; N?: number }>
): QRActivitySnapshot {
  // Convert timestamps to boolean completion status for QR (smaller payload)
  const today = {
    d: todayISO,
    M: !!todayActivity.M,
    A: !!todayActivity.A,
    N: !!todayActivity.N
  };
  
  // Limit recent activity to last 7 days and convert to boolean
  const recent = recentActivity
    .slice(-7)
    .map(day => ({
      d: day.dateISO,
      M: !!day.M,
      A: !!day.A,
      N: !!day.N
    }));
  
  return {
    v: 1,
    kind: 'snapshot',
    from: myId,
    role,
    today,
    recent,
    ts: Date.now()
  };
}

// Generate link card QR code
export async function generateLinkQR(
  myId: string,
  relation: Relation
): Promise<string> {
  const payload = createLinkCard(myId, relation);
  return generateQRCode(payload);
}

// Generate activity snapshot QR code
export async function generateActivityQR(
  myId: string,
  role: Role,
  todayISO: string,
  todayActivity: { M?: number; A?: number; N?: number },
  recentActivity: Array<{ dateISO: string; M?: number; A?: number; N?: number }> = []
): Promise<string> {
  const payload = createActivitySnapshot(myId, role, todayISO, todayActivity, recentActivity);
  return generateQRCode(payload);
}

// Validate QR payload size (should be under 2.5KB for reliable QR scanning)
export function validatePayloadSize(payload: QRPayload): boolean {
  const encoded = encodeQRPayload(payload);
  const sizeInBytes = new TextEncoder().encode(encoded).length;
  return sizeInBytes < 2500; // 2.5KB limit
}

// Get human-readable relation name
export function getRelationDisplayName(relation: Relation): string {
  const relationNames: Record<Relation, string> = {
    myMentor: 'My Mentor',
    myMentee: 'My Mentee',
    mySteward: 'My Steward',
    myScout: 'My Scout',
    myPreScout: 'My Pre-Scout'
  };
  
  return relationNames[relation] || relation;
}

// Get human-readable role name
export function getRoleDisplayName(role: Role): string {
  const roleNames: Record<Role, string> = {
    [Role.PRE_SCOUT]: 'Pre-Scout',
    [Role.SCOUT]: 'Scout',
    [Role.MENTEE]: 'Mentee',
    [Role.MENTOR]: 'Mentor',
    [Role.STEWARD]: 'Steward'
  };
  
  return roleNames[role] || role;
}