import { openDB, type IDBPDatabase, type DBSchema } from "idb";
import { v4 as uuidv4 } from "uuid";
import type {
  UserProfile,
  Contacts,
  MyActivity,
  Snapshots,
  Contact,
  ActivitySnapshot,
  DailyActivity,
} from "./types";
import { Role } from "./types";

const DB_NAME = "MentorshipApp";
const DB_VERSION = 1;

interface MentorshipDB extends DBSchema {
  profile: {
    key: "current";
    value: UserProfile;
  };
  contacts: {
    key: string;
    value: Contact;
  };
  activity: {
    key: string; // dateISO
    value: DailyActivity;
  };
  snapshots: {
    key: string; // contactId
    value: ActivitySnapshot;
  };
  settings: {
    key: string;
    value: any;
  };
}

let dbPromise: Promise<IDBPDatabase<MentorshipDB>> | undefined;

// Initialize database
export function initDB() {
  if (!dbPromise) {
    dbPromise = openDB<MentorshipDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create object stores
        db.createObjectStore("profile");
        db.createObjectStore("contacts");
        db.createObjectStore("activity");
        db.createObjectStore("snapshots");
        db.createObjectStore("settings");
      },
    });
  }
  return dbPromise;
}

// Profile Management
export async function getProfile(): Promise<UserProfile | null> {
  const db = await initDB();
  const profile = await db.get("profile", "current");
  return profile || null;
}

export async function setProfile(profile: UserProfile): Promise<void> {
  const db = await initDB();
  await db.put("profile", profile, "current");
}

export async function createProfile(
  displayName?: string,
  role: Role = Role.MENTEE
): Promise<UserProfile> {
  const profile: UserProfile = {
    id: uuidv4(),
    displayName: displayName || null,
    currentRole: role,
    createdAt: Date.now(),
  };
  await setProfile(profile);
  return profile;
}

// Contact Management
export async function getContacts(): Promise<Contacts> {
  const db = await initDB();
  const contacts: Contacts = {};

  let cursor = await db.transaction("contacts").store.openCursor();
  while (cursor) {
    const key = String(cursor.key);
    contacts[key] = cursor.value as Contact;
    cursor = await cursor.continue();
  }

  return contacts;
}

export async function getContact(id: string): Promise<Contact | null> {
  const db = await initDB();
  const contact = await db.get("contacts", id);
  return contact || null;
}

export async function setContact(contact: Contact): Promise<void> {
  const db = await initDB();
  await db.put("contacts", contact, contact.id);
}

export async function removeContact(id: string): Promise<void> {
  const db = await initDB();
  await db.delete("contacts", id);
}

// Activity Management
export async function getMyActivity(): Promise<MyActivity> {
  const db = await initDB();
  const activity: MyActivity = {};

  let cursor = await db.transaction("activity").store.openCursor();
  while (cursor) {
    const key = String(cursor.key);
    activity[key] = cursor.value as DailyActivity;
    cursor = await cursor.continue();
  }

  return activity;
}

export async function getDayActivity(
  dateISO: string
): Promise<DailyActivity | null> {
  const db = await initDB();
  const activity = await db.get("activity", dateISO);
  return activity || null;
}

export async function setDayActivity(
  dateISO: string,
  activity: DailyActivity
): Promise<void> {
  const db = await initDB();
  await db.put("activity", activity, dateISO);
}

export async function markSlotComplete(
  dateISO: string,
  slot: "M" | "A" | "N"
): Promise<void> {
  const db = await initDB();
  const existing = (await db.get("activity", dateISO)) || {};
  const updated = {
    ...existing,
    [slot]: Date.now(),
  };
  await db.put("activity", updated, dateISO);
}

// Snapshot Management
export async function getSnapshots(): Promise<Snapshots> {
  const db = await initDB();
  const snapshots: Snapshots = {};

  let cursor = await db.transaction("snapshots").store.openCursor();
  while (cursor) {
    const key = String(cursor.key);
    snapshots[key] = cursor.value as ActivitySnapshot;
    cursor = await cursor.continue();
  }

  return snapshots;
}

export async function getSnapshot(
  contactId: string
): Promise<ActivitySnapshot | null> {
  const db = await initDB();
  const snapshot = await db.get("snapshots", contactId);
  return snapshot || null;
}

export async function setSnapshot(
  contactId: string,
  snapshot: ActivitySnapshot
): Promise<void> {
  const db = await initDB();
  await db.put("snapshots", snapshot, contactId);
}

// Settings Management
export async function getSetting(key: string): Promise<any> {
  const db = await initDB();
  return await db.get("settings", key);
}

export async function setSetting(key: string, value: any): Promise<void> {
  const db = await initDB();
  await db.put("settings", value, key);
}

// Backup and Restore
export interface AppBackup {
  version: number;
  timestamp: number;
  profile: UserProfile | null;
  contacts: Contacts;
  activity: MyActivity;
  snapshots: Snapshots;
  settings: Record<string, any>;
}

export async function exportAll(): Promise<AppBackup> {
  const db = await initDB();

  // Get all settings
  const settings: Record<string, any> = {};
  let settingsCursor = await db.transaction("settings").store.openCursor();
  while (settingsCursor) {
    const key = String(settingsCursor.key);
    settings[key] = settingsCursor.value as any;
    settingsCursor = await settingsCursor.continue();
  }

  return {
    version: 1,
    timestamp: Date.now(),
    profile: await getProfile(),
    contacts: await getContacts(),
    activity: await getMyActivity(),
    snapshots: await getSnapshots(),
    settings,
  };
}

export async function importAll(backup: AppBackup): Promise<void> {
  const db = await initDB();

  // Clear all existing data
  await db.clear("profile");
  await db.clear("contacts");
  await db.clear("activity");
  await db.clear("snapshots");
  await db.clear("settings");

  // Import profile
  if (backup.profile) {
    await setProfile(backup.profile);
  }

  // Import contacts
  const tx1 = db.transaction("contacts", "readwrite");
  for (const [id, contact] of Object.entries(backup.contacts)) {
    await tx1.store.put(contact, id);
  }
  await tx1.done;

  // Import activity
  const tx2 = db.transaction("activity", "readwrite");
  for (const [date, activity] of Object.entries(backup.activity)) {
    await tx2.store.put(activity, date);
  }
  await tx2.done;

  // Import snapshots
  const tx3 = db.transaction("snapshots", "readwrite");
  for (const [id, snapshot] of Object.entries(backup.snapshots)) {
    await tx3.store.put(snapshot, id);
  }
  await tx3.done;

  // Import settings
  const tx4 = db.transaction("settings", "readwrite");
  for (const [key, value] of Object.entries(backup.settings)) {
    await tx4.store.put(value, key);
  }
  await tx4.done;
}

// Clear all data (reset app)
export async function resetApp(): Promise<void> {
  const db = await initDB();

  await db.clear("profile");
  await db.clear("contacts");
  await db.clear("activity");
  await db.clear("snapshots");
  await db.clear("settings");
}
