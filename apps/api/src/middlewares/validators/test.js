"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userParamsSchema = exports.getUserQuerySchema = exports.updateUserSchema = exports.createUserSchema = void 0;
var zod_1 = require("zod");
// Validation schemas for demonstration
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email format"),
    age: zod_1.z.number().min(18, "Must be at least 18 years old").optional(),
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    email: zod_1.z.string().email("Invalid email format").optional(),
});
exports.getUserQuerySchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .transform(function (val) { return parseInt(val, 10); })
        .pipe(zod_1.z.number().min(1))
        .optional(),
    limit: zod_1.z
        .string()
        .transform(function (val) { return parseInt(val, 10); })
        .pipe(zod_1.z.number().min(1).max(100))
        .optional(),
    search: zod_1.z.string().optional(),
});
exports.userParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid user ID format"),
});
