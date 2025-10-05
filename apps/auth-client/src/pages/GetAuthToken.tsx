import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const GetAuthTokenPage: React.FC = () => {
    const { isAuthenticated, getIdToken } = useAuth();
    const [token, setToken] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchToken = async () => {
                setLoading(true);
                try {
                    const idToken = await getIdToken();
                    setToken(idToken);
                } catch (error) {
                    console.error("Error fetching token:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchToken();
        }
    }, [isAuthenticated, getIdToken]);

    const handleCopy = () => {
        if (token) {
            navigator.clipboard.writeText(token);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="w-full max-w-md rounded-lg border bg-background/50 p-6 shadow-md">
                    <h1 className="text-2xl font-semibold mb-2">
                        Get Auth Token
                    </h1>
                    <p className="text-sm text-muted-foreground mb-4">
                        You are not logged in. Please
                        <Link to="/login" className="ml-1">
                            <Button variant="link" size="sm">
                                Log in
                            </Button>
                        </Link>
                        to access your auth token.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="w-full max-w-2xl rounded-lg border bg-background/50 p-6 shadow-md">
                <div className="flex items-start justify-between">
                    <h2 className="text-xl text-center w-full font-semibold">
                        Get Auth Token
                    </h2>
                </div>

                <div className="mt-4">
                    {loading ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <svg
                                className="h-5 w-5 animate-spin text-primary"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            Loading token...
                        </div>
                    ) : token ? (
                        <>
                            <label className="text-sm font-medium text-muted-foreground">
                                Your auth token
                            </label>
                            <div className="mt-2 flex flex-col sm:flex-row sm:items-start sm:gap-2">
                                <Input
                                    type="text"
                                    value={token}
                                    readOnly
                                    className="mb-2 font-mono text-sm truncate sm:truncate-none"
                                    aria-label="auth-token"
                                />
                                <div className="flex items-center gap-2">
                                    <Button onClick={handleCopy} size="sm">
                                        Copy
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-3 h-6">
                                <p
                                    aria-live="polite"
                                    className={`text-sm ${
                                        copied
                                            ? "text-green-600"
                                            : "text-muted-foreground"
                                    }`}
                                >
                                    {copied
                                        ? "Token copied to clipboard!"
                                        : "Keep this token private. It authenticates requests to your API."}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-destructive">
                            Failed to retrieve token.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetAuthTokenPage;
