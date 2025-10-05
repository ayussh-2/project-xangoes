import { Context } from "hono";

import { AuthenticatedContext, sendSuccess } from "@/middlewares";
import { userService } from "@/services/user.service";

const { registerUser } = userService;

export const userController = {
    registerUser: async (c: Context) => {
        const userData = await c.req.json();
        const result = await registerUser(userData);
        return sendSuccess(c, result, "User registered successfully");
    },

    me: async (c: Context) => {
        const firebaseId = (c as AuthenticatedContext).user.firebaseId;
        if (!firebaseId) {
            return c.json({ message: "User ID missing" }, 400);
        }
        const user = await userService.me(firebaseId);
        return sendSuccess(c, user, "Fetched user details successfully");
    },

    getUserByUserID: async (c: Context) => {
        const { userId } = c.req.param();
        const user = await userService.getUserByUserID(userId);
        return sendSuccess(c, user, "Fetched user details successfully");
    },

    updateUser: async (c: Context) => {
        const firebaseId = (c as AuthenticatedContext).user.firebaseId;
        if (!firebaseId) {
            return c.json({ message: "User ID missing" }, 400);
        }
        const userData = await c.req.json();
        const updatedUser = await userService.updateUser(firebaseId, userData);
        return sendSuccess(c, updatedUser, "User updated successfully");
    },
};
