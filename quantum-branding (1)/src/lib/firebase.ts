import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { 
  getAuth, 
  signInAnonymously, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";

// User's Firebase web configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoPZ2kxaBqRD8wCmi_d6YeGDkvI8LOUS8",
  authDomain: "quantum-branding.firebaseapp.com",
  projectId: "quantum-branding",
  storageBucket: "quantum-branding.firebasestorage.app",
  messagingSenderId: "1065612103310",
  appId: "1:1065612103310:web:e147cb0c67620fa68c43df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Authorized Admin Email accounts and credentials
export const AUTHORIZED_ADMIN_EMAILS = [
  'tiwaritrayam@gmail.com',
  'tiwartitrayam@gmail.com',
];

export const ADMIN_MASTER_CREDENTIALS = {
  email: 'tiwaritrayam@gmail.com',
  altEmail: 'tiwartitrayam@gmail.com',
  passcode: '932925',
};

export function isAuthorizedAdmin(email?: string | null): boolean {
  if (!email) return false;
  return AUTHORIZED_ADMIN_EMAILS.map(e => e.toLowerCase()).includes(email.trim().toLowerCase());
}

// Session key for local admin sign-in persistence
const ADMIN_SESSION_KEY = 'quantum_admin_auth_user';

export function getLocalAdminSession(): { email: string; displayName: string } | null {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY) || sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.email && isAuthorizedAdmin(parsed.email)) {
      return parsed;
    }
  } catch (e) {
    // Ignore JSON parse errors
  }
  return null;
}

export function setLocalAdminSession(user: { email: string; displayName: string }, remember: boolean = true) {
  const data = JSON.stringify(user);
  if (remember) {
    localStorage.setItem(ADMIN_SESSION_KEY, data);
  } else {
    sessionStorage.setItem(ADMIN_SESSION_KEY, data);
  }
}

export function clearLocalAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

// Email/Password sign in for Admin
export async function signInAdminWithCredentials(email: string, passcode: string, remember: boolean = true): Promise<{ email: string; displayName: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = passcode.trim();

  // Validate admin identity
  const isMatchEmail = (cleanEmail === ADMIN_MASTER_CREDENTIALS.email || cleanEmail === ADMIN_MASTER_CREDENTIALS.altEmail);
  const isMatchPass = (cleanPass === ADMIN_MASTER_CREDENTIALS.passcode);

  if (!isAuthorizedAdmin(cleanEmail)) {
    throw new Error(`Unauthorized Email: '${cleanEmail}' does not have administrative privileges.`);
  }

  if (!isMatchPass) {
    throw new Error('Invalid Admin Password. Please verify your passcode.');
  }

  // Attempt Firebase Auth sign-in or account creation in background
  try {
    await signInWithEmailAndPassword(auth, cleanEmail, cleanPass).catch(async (err) => {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        // Try creating the account in Firebase Auth
        await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass).catch(() => {});
      }
    });
  } catch (err) {
    // Non-blocking for Firebase user creation
  }

  const adminSessionUser = {
    email: cleanEmail,
    displayName: 'Trayam Tiwari (Founder & Admin)',
  };

  setLocalAdminSession(adminSessionUser, remember);
  return adminSessionUser;
}

// Google Login Trigger
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  if (result.user?.email && isAuthorizedAdmin(result.user.email)) {
    setLocalAdminSession({
      email: result.user.email,
      displayName: result.user.displayName || 'Administrator',
    }, true);
  }
  return result.user;
}

// Admin Logout
export async function logOutAdmin(): Promise<void> {
  clearLocalAdminSession();
  await signOut(auth).catch(() => {});
}

// Attempt anonymous sign-in fallback
signInAnonymously(auth).catch(() => {
  // Anonymous auth might not be enabled in user's Firebase console
});

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
    },
    operationType,
    path,
  };
  console.warn('Firestore Operation Notice:', JSON.stringify(errInfo));
  return errInfo;
}

// --- Firestore & Server Dual-Layer CRUD Helper Methods for Admin Portal ---

export interface StoredEnquiry {
  id: string;
  business?: string;
  businessName?: string;
  createdAt?: any;
  email?: string;
  message?: string;
  name?: string;
  phone?: string;
  service?: string;
  requiredService?: string;
  budget?: string;
  source?: string;
  status?: string;
}

export interface StoredWebinarRegistration {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  businessName?: string;
  preferredSlot?: string;
  webinarId?: string;
  webinarTitle?: string;
  webinarType?: string;
  ticketNumber?: string;
  createdAt?: any;
  status?: string;
}

// Local storage backup keys
const LOCAL_ENQUIRIES_KEY = 'quantum_backup_enquiries';
const LOCAL_WEBINARS_KEY = 'quantum_backup_webinars';

function getLocalEnquiries(): StoredEnquiry[] {
  try {
    const raw = localStorage.getItem(LOCAL_ENQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalEnquiries(list: StoredEnquiry[]) {
  try {
    localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify(list));
  } catch {}
}

function getLocalWebinars(): StoredWebinarRegistration[] {
  try {
    const raw = localStorage.getItem(LOCAL_WEBINARS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalWebinars(list: StoredWebinarRegistration[]) {
  try {
    localStorage.setItem(LOCAL_WEBINARS_KEY, JSON.stringify(list));
  } catch {}
}

// Fetch all Enquiries from Firestore + Server Store + Local Backup
export async function fetchAllEnquiries(): Promise<StoredEnquiry[]> {
  const combinedMap = new Map<string, StoredEnquiry>();

  // 1. Try Firestore
  try {
    const enquiriesRef = collection(db, 'enquiries');
    const q = query(enquiriesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q).catch(async () => {
      return await getDocs(enquiriesRef);
    });

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      combinedMap.set(docSnap.id, {
        id: docSnap.id,
        business: data.business || data.businessName || '',
        name: data.name || '',
        phone: data.phone || '',
        email: data.email || '',
        service: data.service || data.requiredService || '',
        message: data.message || '',
        status: data.status || 'New',
        source: data.source || 'website',
        createdAt: data.createdAt,
        ...data,
      });
    });
  } catch (err) {
    console.warn('Firestore fetch enquiries fallback:', err);
  }

  // 2. Try Server API
  try {
    const res = await fetch('/api/admin/enquiries');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.enquiries)) {
        data.enquiries.forEach((item: StoredEnquiry) => {
          // Check if already in map by ID or match by phone+email+name
          let existingKey: string | null = null;
          if (combinedMap.has(item.id)) {
            existingKey = item.id;
          } else {
            for (const [key, val] of combinedMap.entries()) {
              if (val.phone && item.phone && val.phone === item.phone && val.name === item.name) {
                existingKey = key;
                break;
              }
            }
          }

          if (!existingKey) {
            combinedMap.set(item.id, item);
          }
        });
      }
    }
  } catch (err) {
    console.warn('Server fetch enquiries fallback:', err);
  }

  // 3. Merge Local Backup
  const localList = getLocalEnquiries();
  localList.forEach((item) => {
    if (!combinedMap.has(item.id)) {
      combinedMap.set(item.id, item);
    }
  });

  const finalItems = Array.from(combinedMap.values());
  saveLocalEnquiries(finalItems);
  return finalItems;
}

// Update Enquiry Status
export async function updateEnquiryStatus(id: string, status: string): Promise<boolean> {
  let success = false;

  // 1. Update Firestore
  try {
    const docRef = doc(db, 'enquiries', id);
    await updateDoc(docRef, { status });
    success = true;
  } catch (err) {
    console.warn('Firestore update enquiry fallback:', err);
  }

  // 2. Update Server Endpoint
  try {
    const res = await fetch(`/api/admin/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) success = true;
  } catch (err) {
    console.warn('Server update enquiry fallback:', err);
  }

  // 3. Update Local Storage
  const localList = getLocalEnquiries();
  const updatedList = localList.map(item => item.id === id ? { ...item, status } : item);
  saveLocalEnquiries(updatedList);

  return success || true;
}

// Delete Enquiry
export async function deleteEnquiryDoc(id: string): Promise<boolean> {
  let success = false;

  // 1. Delete Firestore
  try {
    const docRef = doc(db, 'enquiries', id);
    await deleteDoc(docRef);
    success = true;
  } catch (err) {
    console.warn('Firestore delete enquiry fallback:', err);
  }

  // 2. Delete Server
  try {
    const res = await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
    if (res.ok) success = true;
  } catch (err) {
    console.warn('Server delete enquiry fallback:', err);
  }

  // 3. Delete Local Storage
  const localList = getLocalEnquiries();
  const filtered = localList.filter(item => item.id !== id);
  saveLocalEnquiries(filtered);

  return success || true;
}

// Fetch all Webinar Registrations from Firestore + Server + Local Backup
export async function fetchAllWebinarRegistrations(): Promise<StoredWebinarRegistration[]> {
  const combinedMap = new Map<string, StoredWebinarRegistration>();

  // 1. Try Firestore
  try {
    const regRef = collection(db, 'webinarRegistrations');
    const q = query(regRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q).catch(async () => {
      return await getDocs(regRef);
    });

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      combinedMap.set(docSnap.id, {
        id: docSnap.id,
        name: data.name || '',
        phone: data.phone || '',
        email: data.email || '',
        businessName: data.businessName || '',
        preferredSlot: data.preferredSlot || '',
        webinarId: data.webinarId || '',
        webinarTitle: data.webinarTitle || '',
        webinarType: data.webinarType || '',
        ticketNumber: data.ticketNumber || '',
        status: data.status || 'Confirmed',
        createdAt: data.createdAt,
        ...data,
      });
    });
  } catch (err) {
    console.warn('Firestore fetch webinars fallback:', err);
  }

  // 2. Try Server API
  try {
    const res = await fetch('/api/admin/webinars');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.registrations)) {
        data.registrations.forEach((item: StoredWebinarRegistration) => {
          let existingKey: string | null = null;
          if (combinedMap.has(item.id)) {
            existingKey = item.id;
          } else {
            for (const [key, val] of combinedMap.entries()) {
              if (val.ticketNumber && item.ticketNumber && val.ticketNumber === item.ticketNumber) {
                existingKey = key;
                break;
              }
            }
          }

          if (!existingKey) {
            combinedMap.set(item.id, item);
          }
        });
      }
    }
  } catch (err) {
    console.warn('Server fetch webinars fallback:', err);
  }

  // 3. Merge Local Backup
  const localList = getLocalWebinars();
  localList.forEach((item) => {
    if (!combinedMap.has(item.id)) {
      combinedMap.set(item.id, item);
    }
  });

  const finalItems = Array.from(combinedMap.values());
  saveLocalWebinars(finalItems);
  return finalItems;
}

// Update Webinar Registration Status
export async function updateWebinarStatus(id: string, status: string): Promise<boolean> {
  let success = false;

  // 1. Update Firestore
  try {
    const docRef = doc(db, 'webinarRegistrations', id);
    await updateDoc(docRef, { status });
    success = true;
  } catch (err) {
    console.warn('Firestore update webinar fallback:', err);
  }

  // 2. Update Server Endpoint
  try {
    const res = await fetch(`/api/admin/webinars/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) success = true;
  } catch (err) {
    console.warn('Server update webinar fallback:', err);
  }

  // 3. Update Local Storage
  const localList = getLocalWebinars();
  const updatedList = localList.map(item => item.id === id ? { ...item, status } : item);
  saveLocalWebinars(updatedList);

  return success || true;
}

// Delete Webinar Registration
export async function deleteWebinarRegistrationDoc(id: string): Promise<boolean> {
  let success = false;

  // 1. Delete Firestore
  try {
    const docRef = doc(db, 'webinarRegistrations', id);
    await deleteDoc(docRef);
    success = true;
  } catch (err) {
    console.warn('Firestore delete webinar fallback:', err);
  }

  // 2. Delete Server
  try {
    const res = await fetch(`/api/admin/webinars/${id}`, { method: 'DELETE' });
    if (res.ok) success = true;
  } catch (err) {
    console.warn('Server delete webinar fallback:', err);
  }

  // 3. Delete Local Storage
  const localList = getLocalWebinars();
  const filtered = localList.filter(item => item.id !== id);
  saveLocalWebinars(filtered);

  return success || true;
}


