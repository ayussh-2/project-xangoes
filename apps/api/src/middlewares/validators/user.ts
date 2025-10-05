import { z } from "zod";

export const registerUserSchema = z.object({
    email: z.string().email("Invalid email format"),
    name: z.string().min(1, "Name is required"),
    photo: z.string().url("Invalid URL format").optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHERS"]),
    dob: z.preprocess(
        (arg) => {
            if (typeof arg == "string" || arg instanceof Date)
                return new Date(arg);
        },
        z.date().refine((date) => !isNaN(date.getTime()), {
            message: "Invalid date format",
        })
    ),
    state: z
        .string()
        .min(1, "State is required")
        .transform((val) => val.toLowerCase()),
    city: z
        .string()
        .min(1, "City is required")
        .transform((val) => val.toLowerCase()),
    college: z.string().min(1, "College is required"),
    idCard: z.string().url("Invalid URL format"),
    mobile: z
        .string()
        .min(10, "Mobile number must be exactly 10 digits")
        .max(10, "Mobile number must be exactly 10 digits")
        .regex(/^\d{10}$/, "Invalid mobile number"),
    rollNumber: z.string().optional(),
    firebaseId: z.string().min(1, "Firebase ID is required"),
});

export const getUserByUserIDSchema = z.object({
    userId: z
        .string()
        .refine(
            (val) =>
                /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                    val
                ),
            { message: "Invalid User ID format" }
        ),
});

export const updateUserSchema = z.object({
    email: z.string().email("Invalid email format").optional(),
    name: z.string().min(1, "Name is required").optional(),
    photo: z.string().url("Invalid URL format").optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHERS"]).optional(),
    dob: z
        .preprocess(
            (arg) => {
                if (typeof arg == "string" || arg instanceof Date)
                    return new Date(arg);
            },
            z.date().refine((date) => !isNaN(date.getTime()), {
                message: "Invalid date format",
            })
        )
        .optional(),
    state: z
        .string()
        .min(1, "State is required")
        .transform((val) => val.toLowerCase())
        .optional(),
    city: z
        .string()
        .min(1, "City is required")
        .transform((val) => val.toLowerCase())
        .optional(),
    college: z.string().min(1, "College is required").optional(),
    idCard: z.string().url("Invalid URL format").optional(),
    mobile: z
        .string()
        .optional()
        .refine((val) => val === undefined || val.length === 10, {
            message: "Mobile number must be exactly 10 digits",
        }),
    rollNumber: z.string().optional(),
});
