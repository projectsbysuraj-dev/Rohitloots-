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
 * Compresses an image file from device gallery to a lightweight base64 Data URL (approx 20-30KB).
 */
export function compressImageFile(file: File, maxWidth = 300, maxHeight = 300, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(event.target?.result as string);
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads a file to Firebase Storage with a fast timeout fallback to compressed Data URL
 * to guarantee image uploads never get stuck on 'Uploading...'.
 */
export async function uploadToFirebaseStorage(file: File, folder = 'app_logos'): Promise<string> {
  // Always create compressed data URL first
  const compressedDataUrl = await compressImageFile(file, 300, 300, 0.85).catch(() => '');

  try {
    const fileExtension = file.name.split('.').pop() || 'png';
    const uniqueFileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
    const fileRef = storageRef(storage, uniqueFileName);

    // 3.5 second timeout to prevent infinite "Uploading..." spinner if Firebase Storage rules block write
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Firebase Storage upload timeout')), 3500);
    });

    const uploadTask = (async () => {
      await uploadBytes(fileRef, file);
      return await getDownloadURL(fileRef);
    })();

    const downloadUrl = await Promise.race([uploadTask, timeoutPromise]);
    return downloadUrl;
  } catch (error) {
    console.warn('Firebase Storage direct upload skipped or timed out, using compressed image URL:', error);
    if (compressedDataUrl) {
      return compressedDataUrl;
    }
    throw error;
  }
}
