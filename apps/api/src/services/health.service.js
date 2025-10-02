"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthService = void 0;
/**
 * @description Health service to check the health of the server
 */
var HealthService = /** @class */ (function () {
    function HealthService() {
    }
    /**
     * @description Get the health status of the server
     * @returns {object} - The health status
     */
    HealthService.prototype.getHealth = function () {
        return {
            status: "ok",
            message: "Server is healthy and running!",
        };
    };
    HealthService.prototype.about = function () {
        return {
            name: "Xangoes API",
            version: "1.0.0",
            maintainer: "DSC NITR",
        };
    };
    return HealthService;
}());
exports.healthService = new HealthService();
