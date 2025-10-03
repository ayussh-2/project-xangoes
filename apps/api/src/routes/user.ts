import { Hono } from "hono";

import { userController } from "@/controllers";
import { asyncHandler, validateRequest } from "@/middlewares";
import { registerUserSchema } from "@/middlewares/validators/user";

const userRouter = new Hono();
const { registerUser } = userController;

userRouter.post(
    "/register",
    validateRequest(registerUserSchema, "body"),
    asyncHandler(registerUser)
);

export { userRouter };
