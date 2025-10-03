import { useEffect, useState } from "react";

import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    type User,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    };

    const getIdToken = async (): Promise<string | null> => {
        try {
            if (!user) {
                return null;
            }
            return await user.getIdToken();
        } catch (error) {
            console.error('Error getting ID token:', error);
            return null;
        }
    };

    return {
        user,
        loading,
        loginWithGoogle,
        logout,
        getIdToken,
        isAuthenticated: !!user,
    };
};
