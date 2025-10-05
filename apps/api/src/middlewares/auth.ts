import { Context, Next } from "hono";

import { auth } from "../config/firebase";

export interface AuthenticatedContext extends Context {
    user: {
        firebaseId: string;
        email?: string;
    };
}

export const authenticate = async (c: Context, next: Next) => {
    try {
        const authHeader = c.req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return c.json(
                { success: false, message: "Unauthorized: Invalid token" },
                401
            );
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        const decodedToken = await auth.verifyIdToken(token);

        (c as AuthenticatedContext).user = {
            firebaseId: decodedToken.uid,
            email: decodedToken.email,
        };

        await next();
    } catch (error) {
        console.error("Authentication error:", error);
        return c.json(
            { success: false, message: "Unauthorized: Invalid token" },
            401
        );
    }
};
