"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let LoggingInterceptor = class LoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger("HTTP");
    }
    intercept(context, next) {
        const http = context.switchToHttp();
        const req = http.getRequest();
        const res = http.getResponse();
        const start = Date.now();
        // Best effort extraction (express)
        const method = req.method;
        const url = req.originalUrl ?? req.url;
        const requestId = req.requestId;
        return next.handle().pipe((0, rxjs_1.tap)({
            next: () => {
                const ms = Date.now() - start;
                const status = res.statusCode;
                this.logger.log(`${method} ${url} ${status} ${ms}ms${requestId ? ` requestId=${requestId}` : ""}`);
            },
            error: (err) => {
                const ms = Date.now() - start;
                const status = (err && (err.status || err.statusCode)) ?? 500;
                this.logger.warn(`${method} ${url} ${status} ${ms}ms${requestId ? ` requestId=${requestId}` : ""}`);
            },
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
