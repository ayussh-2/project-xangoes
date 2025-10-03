import { eq, or } from "drizzle-orm";

import { db } from "@/db/schema";
import { User } from "@/types";

import { users } from "../db/schema/user";
import { throwApiError } from "../middlewares/asyncHandler";

/**
 * @description USER service to manage user-related operations
 */
class UserService {
    /**
     * @description Register a new user
     * @param {object} userData - The user data
     * @returns {object} - The registered user
     */
    public async registerUser(
        userData: Omit<
            User,
            | "id"
            | "createdAt"
            | "updatedAt"
            | "hasPaid"
            | "festID"
            | "receipt"
            | "transactionID"
            | "hall"
        >
    ): Promise<object> {
        const existingUser = await db
            .select()
            .from(users)
            .where(
                or(
                    eq(users.email, userData.email),
                    eq(users.mobile, userData.mobile),
                    eq(users.firebaseId, userData.firebaseId)
                )
            )
            .limit(1)
            .execute();

        if (existingUser.length > 0) {
            throwApiError(
                "User with given email, mobile, or Firebase ID already exists.",
                409
            );
        }

        const newUser = await db
            .insert(users)
            .values({ ...userData })
            .returning();
        return {
            status: "ok",
            message: "User registered successfully!",
            data: newUser,
        };
    }
}

export const userService = new UserService();
