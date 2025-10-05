import React from "react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import useAPI from "@/hooks/useAPI";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage: React.FC = () => {
    const { userData, isAuthenticated, loading: authLoading } = useAuth();
    const { data, error, loading, request } = useAPI<any>();

    // useEffect(() => {
    //     if (!authLoading && isAuthenticated && !userData) {
    //         request({ url: "/user/me", method: "GET" });
    //     }
    // }, [authLoading, isAuthenticated, userData, request]);

    const profile = userData ?? data?.data ?? data;

    if (authLoading || loading) {
        return (
            <div className="container mx-auto pt-24 px-6">
                <div className="text-center">Loading profile...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto pt-24 px-6">
                <div className="text-center text-red-600">Error: {error}</div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="container mx-auto pt-24 px-6">
                <div className="text-center">
                    No profile found.{" "}
                    <Link to="/register" className="underline">
                        Register
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto pt-24 px-6">
            <div className="max-w-3xl mx-auto bg-card p-6 rounded-lg shadow">
                <div className="flex items-center gap-6">
                    <img
                        src={profile.photo ?? profile.photoURL}
                        alt={profile.name ?? profile.email}
                        className="w-24 h-24 rounded-full object-cover"
                    />

                    <div>
                        <h1 className="text-2xl font-semibold">
                            {profile.name ?? profile.email}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {profile.email}
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Mobile
                        </h3>
                        <div className="mt-1">{profile.mobile ?? "-"}</div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                            College
                        </h3>
                        <div className="mt-1">{profile.college ?? "-"}</div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Roll Number
                        </h3>
                        <div className="mt-1">{profile.rollNumber ?? "-"}</div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Gender
                        </h3>
                        <div className="mt-1">{profile.gender ?? "-"}</div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                            City
                        </h3>
                        <div className="mt-1">{profile.city ?? "-"}</div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                            State
                        </h3>
                        <div className="mt-1">{profile.state ?? "-"}</div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Date of Birth
                        </h3>
                        <div className="mt-1">
                            {profile.dob
                                ? new Date(profile.dob).toLocaleDateString()
                                : "-"}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Created At
                        </h3>
                        <div className="mt-1">
                            {profile.createdAt
                                ? new Date(profile.createdAt).toLocaleString()
                                : "-"}
                        </div>
                    </div>
                </div>

                {profile.idCard && (
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            ID Card
                        </h3>
                        <img
                            src={profile.idCard}
                            alt="ID Card"
                            className="mt-2 max-h-64 object-contain"
                        />
                    </div>
                )}

                <div className="mt-6 flex items-center gap-3">
                    {profile.hasPaid === false ? (
                        // User hasn't paid: show link to payment (we also redirect automatically)
                        <Link to="/payment">
                            <Button variant="default" size="sm">
                                Pay Now
                            </Button>
                        </Link>
                    ) : profile.hasPaid === true ? (
                        // User paid: show disabled verification pending button
                        <Button variant="outline" size="sm" disabled>
                            Paid — Verification pending
                        </Button>
                    ) : (
                        // Unknown state: provide action to go to payment
                        <Link to="/payment">
                            <Button variant="default" size="sm">
                                Payment
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
