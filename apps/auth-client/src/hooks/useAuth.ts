import { useEffect, useState } from "react";

import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    type User,
} from "firebase/auth";

import { config } from "@/config/environment";
import { auth } from "@/lib/firebase";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [isAlreadyRegistered, setIsAlreadyRegistered] =
        useState<boolean>(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // when user changes, automatically check registration status
    useEffect(() => {
        if (!user) {
            setIsAlreadyRegistered(false);
            setUserData(null);
            return;
        }

        // fire-and-forget; callers can also call checkAlreadyRegistered() directly
        void checkAlreadyRegistered();
    }, [user]);

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
            console.error("Error getting ID token:", error);
            return null;
        }
    };

    const checkAlreadyRegistered = async (): Promise<boolean> => {
        try {
            setLoading(true);
            const idToken = await getIdToken();
            if (!idToken) {
                setIsAlreadyRegistered(false);
                setUserData(null);
                return false;
            }

            const response = await fetch(config.API_BASE_URL + "/user/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data.data);
                setIsAlreadyRegistered(true);
                return true;
            }

            // not found or unauthorized
            setUserData(null);
            setIsAlreadyRegistered(false);
            return false;
        } catch (error) {
            console.error("Error checking registration status:", error);
            setUserData(null);
            setIsAlreadyRegistered(false);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        loginWithGoogle,
        logout,
        getIdToken,
        checkAlreadyRegistered,
        isAuthenticated: !!user,
        isAlreadyRegistered,
        userData,
    };
};
