export const config = {
    firebase: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
    },
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    cloudinary: {
        cloudname: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadpreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    },
};
