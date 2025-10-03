import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { RegistrationForm } from "@/components/RegistrationForm";
import useAPI from "@/hooks/useAPI";
import { useAuth } from "@/hooks/useAuth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { type RegistrationFormData } from "@/lib/validation";

interface RegistrationResponse {
    success: boolean;
    message: string;
    userId?: string;
}

export const RegistrationPage = () => {
    const { isAuthenticated, user, loading } = useAuth();
    const {
        data,
        error,
        loading: apiLoading,
        request,
    } = useAPI<RegistrationResponse>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    const handleRegistrationSubmit = async (
        formData: RegistrationFormData & { photo: string; idCard: File }
    ) => {
        try {
            // Upload ID card to Cloudinary
            const idCardUrl = await uploadToCloudinary(formData.idCard);

            // Send registration data with Cloudinary URL
            await request({
                url: "/user/register",
                method: "POST",
                data: {
                    ...formData,
                    idCard: idCardUrl, // Send URL instead of file
                    firebaseId: user?.uid,
                },
            });

            if (data?.success) {
                alert("Registration successful! Proceeding to payment.");
                navigate("/payment");
            } else if (error) {
                alert(error);
            } else {
                alert(
                    data?.message || "Registration failed. Please try again."
                );
            }
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
                <RegistrationForm
                    onSubmit={handleRegistrationSubmit}
                    loading={apiLoading}
                />
                {error && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};
