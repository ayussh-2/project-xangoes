import { Hono } from "hono";

import { sendSuccess } from "@/middlewares";
import { healthService } from "@/services/health.service";

import { healthRouter } from "./health";
import { testRouter } from "./test";
import { userRouter } from "./user";

export const routes = new Hono();

routes.route("/api/health", healthRouter);
routes.route("/api/test", testRouter);
routes.route("/api/user", userRouter);
routes.get("/", (c) => {
    return sendSuccess(c, healthService.about());
});
