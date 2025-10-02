import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";

const manualPaymentSchema = z.object({
    transactionId: z.string().min(1, "Transaction ID is required"),
    transactionDetails: z
        .string()
        .min(10, "Transaction details must be at least 10 characters"),
    paymentScreenshot: z
        .union([z.instanceof(FileList), z.null()])
        .refine(
            (files) => files && files.length > 0,
            "Payment screenshot is required"
        )
        .refine(
            (files) => files && files[0]?.size <= 5 * 1024 * 1024,
            "File size must be less than 5MB"
        )
        .refine(
            (files) =>
                files &&
                ["image/jpeg", "image/png", "image/jpg"].includes(
                    files[0]?.type
                ),
            "Only JPEG, PNG, or JPG files are allowed"
        ),
});

type ManualPaymentFormData = z.infer<typeof manualPaymentSchema>;

export const PaymentPage = () => {
    const { isAuthenticated, user, loading } = useAuth();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<"gateway" | "manual">(
        "gateway"
    );
    const [isProcessing, setIsProcessing] = useState(false);

    const form = useForm<ManualPaymentFormData>({
        resolver: zodResolver(manualPaymentSchema),
        defaultValues: {
            transactionId: "",
            transactionDetails: "",
            paymentScreenshot: null,
        },
    });

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate("/login");
        }
    }, [isAuthenticated, loading, navigate]);

    const handleGatewayPayment = async () => {
        setIsProcessing(true);
        try {
            alert("Redirecting to payment gateway...");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            alert("Payment successful!");
            navigate("/");
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const onManualPaymentSubmit = async (data: ManualPaymentFormData) => {
        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append("transactionId", data.transactionId);
            formData.append("transactionDetails", data.transactionDetails);
            formData.append("paymentScreenshot", data.paymentScreenshot![0]);
            formData.append("userId", user?.uid || "");

            console.log("Manual payment data:", {
                transactionId: data.transactionId,
                transactionDetails: data.transactionDetails,
                screenshot: data.paymentScreenshot![0],
                userId: user?.uid,
            });

            await new Promise((resolve) => setTimeout(resolve, 2000));

            alert("Payment submitted for verification!");
            navigate("/");
        } catch (error) {
            console.error("Manual payment submission failed:", error);
            alert("Submission failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="container mx-auto py-8 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Complete Payment</CardTitle>
                        <CardDescription>
                            Choose your preferred payment method to complete the
                            registration.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex gap-4">
                            <Button
                                variant={
                                    paymentMethod === "gateway"
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => setPaymentMethod("gateway")}
                                className="flex-1 !text-white"
                            >
                                Payment Gateway
                            </Button>
                            <Button
                                variant={
                                    paymentMethod === "manual"
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() => setPaymentMethod("manual")}
                                className="flex-1 !text-white"
                            >
                                Manual Payment
                            </Button>
                        </div>

                        {paymentMethod === "gateway" && (
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg bg-muted/50">
                                    <h3 className="font-semibold mb-2">
                                        Payment Gateway
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Secure payment through our integrated
                                        gateway. You'll be redirected to
                                        complete the payment.
                                    </p>
                                    <div className="text-center">
                                        <p className="text-lg font-bold mb-4">
                                            Amount: $50.00
                                        </p>
                                        <Button
                                            onClick={handleGatewayPayment}
                                            disabled={isProcessing}
                                            className="w-full"
                                        >
                                            {isProcessing
                                                ? "Processing..."
                                                : "Pay Now"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {paymentMethod === "manual" && (
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(
                                        onManualPaymentSubmit
                                    )}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="transactionId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Transaction ID
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter transaction ID"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="transactionDetails"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Transaction Details
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter transaction details (bank, date, amount, etc.)"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="paymentScreenshot"
                                        render={({
                                            field: {
                                                onChange,
                                                value,
                                                ...field
                                            },
                                        }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Payment Screenshot
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) =>
                                                            onChange(
                                                                e.target
                                                                    .files ||
                                                                    null
                                                            )
                                                        }
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full"
                                    >
                                        {isProcessing
                                            ? "Submitting..."
                                            : "Submit Payment"}
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
