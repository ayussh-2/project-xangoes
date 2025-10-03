import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import { env } from "./env";

// Initialize Firebase Admin if not already initialized
if (getApps().length === 0) {
    initializeApp({
        credential: cert({
            projectId: env.firebase.FIREBASE_PROJECT_ID,
            privateKey: env.firebase.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            clientEmail: env.firebase.FIREBASE_CLIENT_EMAIL,
        }),
    });
}

// Export auth instance for token verification
export const auth = getAuth();
