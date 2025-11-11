export enum Role {
  PRE_SCOUT = "PRE_SCOUT",
  SCOUT = "SCOUT",
  MENTEE = "MENTEE",
  MENTOR = "MENTOR",
  STEWARD = "STEWARD",
}

export type Relation =
  | "myMentor"
  | "myMentee"
  | "mySteward"
  | "myScout"
  | "myPreScout";

export type Slot = "M" | "A" | "N";

export interface UserProfile {
  id: string;
  displayName?: string | null;
  currentRole: Role;
  createdAt: number;
}

export interface Contact {
  id: string;
  label?: string;
  relation: Relation;
  lastSeenAt?: number;
}

export type Contacts = Record<string, Contact>;

export interface DailyActivity {
  M?: number;
  A?: number;
  N?: number;
}

export type MyActivity = Record<string, DailyActivity>;

export interface ActivitySnapshot {
  asOf: number;
  role?: Role;
  today?: {
    dateISO: string;
    M?: number;
    A?: number;
    N?: number;
  };
  recent?: Array<{
    dateISO: string;
    M?: boolean;
    A?: boolean;
    N?: boolean;
  }>;
}

export type Snapshots = Record<string, ActivitySnapshot>;

export interface ActivityTick {
  dateISO: string;
  slot: Slot;
  completedAt: number;
}
