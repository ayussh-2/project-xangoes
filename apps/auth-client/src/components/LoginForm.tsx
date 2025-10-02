import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { loginWithGoogle, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            await loginWithGoogle();
            navigate("/register");
        } catch (err: any) {
            setError(err.message || "Google sign-in failed");
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="pt-6">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-sm text-muted-foreground">
                            Redirecting...
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold tracking-tight">
                    Login
                </CardTitle>
                <CardDescription>
                    Please sign in with Google to continue with your
                    registration.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    onClick={handleGoogleSignIn}
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in with Google"}
                </Button>
                {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mt-4">
                        {error}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
