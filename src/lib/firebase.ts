import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBaLyagH3BqRD2R2_aLbxSYjrZ7R0twx-8",
  authDomain: "rohitloots-f96ba.firebaseapp.com",
  databaseURL: "https://rohitloots-f96ba-default-rtdb.firebaseio.com",
  projectId: "rohitloots-f96ba",
  storageBucket: "rohitloots-f96ba.firebasestorage.app",
  messagingSenderId: "421207711595",
  appId: "1:421207711595:web:c93418e0d8429a29dbf62e",
  measurementId: "G-0KL8MLF0WT"
};

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Realtime Database instance
export const db = getDatabase(app);

// Storage instance
export const storage = getStorage(app);

/**
 * Uploads a file (e.g. app logo or banner) to Firebase Storage and returns its public Download URL.
 */
export async function uploadToFirebaseStorage(file: File, folder = 'app_logos'): Promise<string> {
  try {
    const fileExtension = file.name.split('.').pop() || 'png';
    const uniqueFileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
    const fileRef = storageRef(storage, uniqueFileName);
    
    await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(fileRef);
    return downloadUrl;
  } catch (error) {
    console.error('Firebase Storage upload failed:', error);
    throw error;
  }
}
