// Mock Firebase configuration for Choppi
// This replaces Firebase with local mock implementations

import { mockAuth } from "../js/MockDatabase";
import { onAuthStateChanged as mockOnAuthStateChanged } from "../js/MockAuth";

// Mock Firebase app
export const firebaseApp = {
  name: "choppi-mock-app",
  options: {
    projectId: "choppi-mock",
    appId: "mock-app-id"
  }
};

// Export mock auth with additional methods
export const auth = {
  ...mockAuth,
  onAuthStateChanged: mockOnAuthStateChanged,
  signOut: () => {
    console.log("[MockAuth] User signed out");
    mockAuth.currentUser = null;
    return Promise.resolve();
  }
};

// Mock Firestore
export const db = {
  collection: (name) => ({
    doc: (id) => ({ id }),
    add: () => Promise.resolve({ id: "mock-doc-id" }),
    get: () => Promise.resolve({ docs: [] })
  })
};

// Mock Storage
export const storage = {
  ref: (path) => ({
    getDownloadURL: () => Promise.resolve("https://mock-storage-url.com/" + path)
  })
};

console.log("[MockFirebase] Using mock Firebase configuration for Choppi");
// const analytics = getAnalytics(app);
