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

        const [newUser] = await db
            .insert(users)
            .values({ ...userData })
            .returning();

        return newUser;
    }

    /**
     * @description Get user by User ID
     * @param {string} userId - The User ID
     * @returns {object} - The user object
     */
    public async getUserByUserID(userId: string) {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1)
            .execute();
        if (user.length === 0) {
            throwApiError("User not found", 404);
        }
        return user[0];
    }

    private async findUserByFirebaseId(firebaseId: string) {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.firebaseId, firebaseId))
            .limit(1)
            .execute();
        if (user.length === 0) {
            throwApiError("User not found", 404);
        }
        return user[0];
    }

    public async me(firebaseId: string) {
        return this.findUserByFirebaseId(firebaseId);
    }

    public async updateUser(firebaseId: string, userData: Partial<User>) {
        const user = await this.findUserByFirebaseId(firebaseId);
        const updatedUser = { ...user, ...userData };
        await db
            .update(users)
            .set(updatedUser)
            .where(eq(users.id, user.id))
            .execute();
        return updatedUser;
    }
}

export const userService = new UserService();
