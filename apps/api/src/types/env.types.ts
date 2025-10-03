// Environment configuration types

export interface EnvConfig {
    // Server Configuration
    PORT: number;
    // Database Configuration
    DATABASE_URL: string;
    RATE_LIMIT: number;
    RATE_LIMIT_WINDOW: number;
    // Firebase Configuration
    firebase: {
        FIREBASE_PROJECT_ID: string;
        FIREBASE_PRIVATE_KEY: string;
        FIREBASE_CLIENT_EMAIL: string;
    };
}
