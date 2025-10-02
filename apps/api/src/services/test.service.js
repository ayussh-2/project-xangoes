"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testService = void 0;
/**
 * @description Test service to handle test/demo operations
 */
var TestService = /** @class */ (function () {
    function TestService() {
    }
    /**
     * @description Create a new user (demo implementation)
     * @param userData - User data from request body
     * @returns Created user object
     */
    TestService.prototype.createUser = function (userData) {
        return {
            user: __assign(__assign({ id: crypto.randomUUID() }, userData), { createdAt: new Date().toISOString() }),
        };
    };
    /**
     * @description Get paginated users (demo implementation)
     * @param page - Page number
     * @param limit - Items per page
     * @param search - Search term
     * @returns Users list with pagination
     */
    TestService.prototype.getUsers = function (page, limit, search) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (search === void 0) { search = ""; }
        return {
            users: [
                {
                    id: "123e4567-e89b-12d3-a456-426614174000",
                    name: "John Doe",
                    email: "john@example.com",
                    age: 25,
                },
            ],
            pagination: {
                page: page,
                limit: limit,
                total: 1,
                search: search,
            },
        };
    };
    /**
     * @description Get user by ID (demo implementation)
     * @param id - User ID
     * @returns User object
     */
    TestService.prototype.getUserById = function (id) {
        return {
            user: {
                id: id,
                name: "John Doe",
                email: "john@example.com",
                age: 25,
            },
        };
    };
    /**
     * @description Update user (demo implementation)
     * @param id - User ID
     * @param updateData - Data to update
     * @returns Updated user object
     */
    TestService.prototype.updateUser = function (id, updateData) {
        return {
            user: __assign(__assign({ id: id }, updateData), { updatedAt: new Date().toISOString() }),
        };
    };
    /**
     * @description Get test endpoint information
     * @returns Test endpoint documentation
     */
    TestService.prototype.getTestInfo = function () {
        return {
            message: "This is a test endpoint to showcase schema validation middleware",
            endpoints: {
                "POST /test/users": "Creates a user with body validation",
                "GET /test/users": "Gets users with query parameter validation",
                "GET /test/users/:id": "Gets user by ID with params validation",
                "PUT /test/users/:id": "Updates user with both params and body validation",
            },
            schemas: {
                createUser: "name (string, required), email (email, required), age (number, min 18, optional)",
                updateUser: "name (string, optional), email (email, optional)",
                getUserQuery: "page (number, min 1, optional), limit (number, 1-100, optional), search (string, optional)",
                userParams: "id (UUID format, required)",
            },
        };
    };
    return TestService;
}());
exports.testService = new TestService();
