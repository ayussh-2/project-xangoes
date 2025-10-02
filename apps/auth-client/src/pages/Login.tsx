import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth";

export const LoginPage = () => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && !loading) {
            navigate("/register");
        }
    }, [isAuthenticated, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Checking authentication...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <LoginForm />
        </div>
    );
};
