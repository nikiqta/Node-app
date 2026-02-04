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
exports.ClaimsDownstreamClient = void 0;
const common_1 = require("@nestjs/common");
const http_client_1 = require("../../../common/http/http.client");
let ClaimsDownstreamClient = class ClaimsDownstreamClient {
    constructor(http) {
        this.http = http;
        // In real life, take this from config/env:
        this.baseUrl = process.env.DOWNSTREAM_CLAIMS_URL ?? "https://example-downstream/claims";
    }
    async listClaims(params, requestId) {
        // Example: GET https://.../claims?page=1&limit=20&status=OPEN
        return this.http.get(this.baseUrl, { params }, requestId);
    }
    async getClaimById(id, requestId) {
        // Example: GET https://.../claims/{id}
        return this.http.get(`${this.baseUrl}/${encodeURIComponent(id)}`, undefined, requestId);
    }
};
exports.ClaimsDownstreamClient = ClaimsDownstreamClient;
exports.ClaimsDownstreamClient = ClaimsDownstreamClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_client_1.HttpClient])
], ClaimsDownstreamClient);
