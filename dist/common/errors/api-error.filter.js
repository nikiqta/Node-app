"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorFilter = void 0;
const common_1 = require("@nestjs/common");
let ApiErrorFilter = class ApiErrorFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        const requestId = req.requestId;
        // Nest HttpExceptions (validation, etc.)
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const response = exception.getResponse();
            const body = {
                error: {
                    code: status === 400 ? "VALIDATION_ERROR" : "INTERNAL_ERROR",
                    message: response?.message ?? exception.message,
                    requestId,
                    details: response,
                },
            };
            return res.status(status).json(body);
        }
        // Axios errors from downstream
        if (isAxiosError(exception)) {
            const mapped = mapAxiosToApiError(exception);
            return res.status(mapped.status).json({
                error: {
                    code: mapped.code,
                    message: mapped.message,
                    requestId,
                    details: mapped.details,
                },
            });
        }
        // Fallback
        return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: {
                code: "INTERNAL_ERROR",
                message: "Unexpected error",
                requestId,
            },
        });
    }
};
exports.ApiErrorFilter = ApiErrorFilter;
exports.ApiErrorFilter = ApiErrorFilter = __decorate([
    (0, common_1.Catch)()
], ApiErrorFilter);
function isAxiosError(e) {
    return !!e && typeof e === "object" && e.isAxiosError === true;
}
function mapAxiosToApiError(err) {
    // timeout
    if (err.code === "ECONNABORTED") {
        return {
            status: common_1.HttpStatus.GATEWAY_TIMEOUT,
            code: "DOWNSTREAM_TIMEOUT",
            message: "Downstream service timed out",
            details: { code: err.code },
        };
    }
    // No response => network error / service down
    if (!err.response) {
        return {
            status: common_1.HttpStatus.BAD_GATEWAY,
            code: "DOWNSTREAM_UNAVAILABLE",
            message: "Downstream service unavailable",
            details: { code: err.code, message: err.message },
        };
    }
    // Response exists but status indicates an issue
    return {
        status: common_1.HttpStatus.BAD_GATEWAY,
        code: "DOWNSTREAM_BAD_RESPONSE",
        message: "Downstream service returned an error response",
        details: {
            downstreamStatus: err.response.status,
            downstreamData: err.response.data,
        },
    };
}
