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
exports.ClaimsService = void 0;
const common_1 = require("@nestjs/common");
const claims_downstream_client_1 = require("../integrations/clients/claims-downstream.client");
let ClaimsService = class ClaimsService {
    constructor(downstream) {
        this.downstream = downstream;
    }
    async listClaims(query, requestId) {
        const data = await this.downstream.listClaims({ page: query.page ?? 1, limit: query.limit ?? 20, status: query.status }, requestId);
        // Map downstream shape -> FE-friendly contract (anti-corruption layer)
        return {
            items: data.items.map((c) => ({
                id: c.claimId,
                status: c.status,
                createdAt: c.createdAt,
                amount: c.amount,
            })),
            page: data.page,
            limit: data.limit,
            total: data.total,
        };
    }
    async getClaimById(id, requestId) {
        const data = await this.downstream.getClaimById(id, requestId);
        if (!data) {
            throw new common_1.NotFoundException(`Claim ${id} not found`);
        }
        return {
            id: data.claimId,
            status: data.status,
            createdAt: data.createdAt,
            amount: data.amount,
            claimant: data.claimant,
        };
    }
};
exports.ClaimsService = ClaimsService;
exports.ClaimsService = ClaimsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [claims_downstream_client_1.ClaimsDownstreamClient])
], ClaimsService);
