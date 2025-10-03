import { Context } from "hono";

import { sendSuccess } from "@/middlewares";
import { userService } from "@/services/user.service";

const { registerUser } = userService;

export const userController = {
    registerUser: async (c: Context) => {
        const userData = await c.req.json();
        const result = await registerUser(userData);
        return sendSuccess(c, result);
    },
};
