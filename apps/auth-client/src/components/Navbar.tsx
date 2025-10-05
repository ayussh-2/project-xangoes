import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="w-full border-b fixed top-0 left-0 bg-background z-50">
            <div className="container mx-auto px-6 py-3 flex items-center justify-between">
                <Link to="/" className="text-lg font-semibold">
                    Xangoes
                </Link>

                <div className="flex items-center gap-2">
                    {!isAuthenticated ? (
                        <>
                            <Button asChild variant="ghost" size="sm">
                                <Link to="/login">Login</Link>
                            </Button>

                            <Button asChild variant="ghost" size="sm">
                                <Link to="/register">Register</Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <span className="text-sm text-muted-foreground hidden sm:inline">
                                {user?.displayName ?? user?.email}
                            </span>

                            <Button asChild variant="ghost" size="sm">
                                <Link to="/profile">Profile</Link>
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => void logout()}
                            >
                                Logout
                            </Button>
                        </>
                    )}

                    <Button asChild variant="ghost" size="sm">
                        <Link to="/payment">Payment</Link>
                    </Button>

                    <Button asChild variant="ghost" size="sm">
                        <Link to="/get-auth-token">Get Auth Token</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
};
