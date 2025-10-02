import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { RegistrationForm } from "@/components/RegistrationForm";
import { useAuth } from "@/hooks/useAuth";
import { type RegistrationFormData } from "@/lib/validation";

export const RegistrationPage = () => {
    const { isAuthenticated, user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    const handleRegistrationSubmit = async (
        data: RegistrationFormData & { photo: string }
    ) => {
        try {
            console.log("Registration data:", {
                ...data,
                firebaseId: user?.uid,
            });

            await new Promise((resolve) => setTimeout(resolve, 2000));

            alert("Registration successful! Proceeding to payment.");
            navigate("/payment");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="container mx-auto py-8">
                <RegistrationForm onSubmit={handleRegistrationSubmit} />
            </div>
        </div>
    );
};
