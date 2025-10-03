import "./config/firebase";

import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { errorHandler, notFoundHandler } from "./middlewares";
import { rateLimit } from "./middlewares/rateLimit";
import { routes } from "./routes";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use(cors({ origin: "*" }));
// app.use("*", authenticate);

// Rate limiting middleware
app.use("*", rateLimit);

// Routes
app.route("/", routes);

// 404 handler for unmatched routes
app.notFound(notFoundHandler);

// Global error handler
app.onError(errorHandler);

export default app;
