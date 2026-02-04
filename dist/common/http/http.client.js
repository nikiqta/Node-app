"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const axios_retry_1 = require("axios-retry");
const rxjs_1 = require("rxjs");
let HttpClient = class HttpClient {
    constructor(http) {
        this.http = http;
        // configure retry once (idempotent safe defaults)
        (0, axios_retry_1.default)(this.http.axiosRef, {
            retries: 2,
            retryDelay: axios_retry_1.default.exponentialDelay,
            retryCondition: (error) => {
                // retry on network errors + 5xx
                const status = error.response?.status;
                return (axios_retry_1.default.isNetworkOrIdempotentRequestError(error) ||
                    (status != null && status >= 500));
            },
        });
    }
    async get(url, config, requestId) {
        const headers = {
            ...(config?.headers ?? {}),
            ...(requestId ? { "x-request-id": requestId } : {}),
        };
        const obs$ = this.http.get(url, { ...config, headers });
        const res = await (0, rxjs_1.firstValueFrom)(obs$);
        return res.data;
    }
    async post(url, data, config, requestId) {
        const headers = {
            ...(config?.headers ?? {}),
            ...(requestId ? { "x-request-id": requestId } : {}),
        };
        const obs$ = this.http.post(url, data, { ...config, headers });
        const res = await (0, rxjs_1.firstValueFrom)(obs$);
        return res.data;
    }
};
exports.HttpClient = HttpClient;
exports.HttpClient = HttpClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], HttpClient);
