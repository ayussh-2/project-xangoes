import { Hono } from "hono";

import { userController } from "@/controllers";
import { asyncHandler, authenticate, validateRequest } from "@/middlewares";
import {
    getUserByUserIDSchema,
    registerUserSchema,
    updateUserSchema,
} from "@/middlewares/validators/user";

const userRouter = new Hono();
const { registerUser, getUserByUserID, me, updateUser } = userController;

userRouter.post(
    "/register",
    validateRequest(registerUserSchema, "body"),
    asyncHandler(registerUser)
);

userRouter.get("/me", authenticate, asyncHandler(me));
userRouter.get(
    "/:userId",
    validateRequest(getUserByUserIDSchema, "params"),
    asyncHandler(getUserByUserID)
);

userRouter.patch(
    "/:userId",
    authenticate,
    validateRequest(updateUserSchema, "body"),
    asyncHandler(updateUser)
);

export { userRouter };
