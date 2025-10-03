import "./config/firebase";

import { Hono } from "hono";
import { logger } from "hono/logger";

import { authenticate, errorHandler, notFoundHandler } from "./middlewares";
import { rateLimit } from "./middlewares/rateLimit";
import { routes } from "./routes";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", authenticate);

// Rate limiting middleware
app.use("*", rateLimit);

// Routes
app.route("/", routes);

// 404 handler for unmatched routes
app.notFound(notFoundHandler);

// Global error handler
app.onError(errorHandler);

export default app;
