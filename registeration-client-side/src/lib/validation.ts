import { z } from "zod";

export const registrationSchema = z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    gender: z.enum(["male", "female", "other"]).refine((val) => val, {
        message: "Please select a gender",
    }),
    dob: z.string().refine((date) => {
        const d = new Date(date);
        return d instanceof Date && !isNaN(d.getTime());
    }, "Invalid date of birth"),
    state: z.string().min(2, "State must be at least 2 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    college: z.string().min(2, "College name must be at least 2 characters"),
    idCard: z
        .instanceof(File, { message: "ID card is required" })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "File size must be less than 5MB",
        })
        .refine(
            (file) =>
                ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                    file.type
                ),
            { message: "Only JPEG, PNG, and WebP images are allowed" }
        ),
    mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid mobile number"),
    rollNumber: z.string().min(1, "Roll number is required"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
