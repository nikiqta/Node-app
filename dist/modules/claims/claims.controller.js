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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const claims_service_1 = require("./claims.service");
const get_claims_query_1 = require("./dto/get-claims.query");
let ClaimsController = class ClaimsController {
    constructor(claims) {
        this.claims = claims;
    }
    async list(query, req) {
        return this.claims.listClaims(query, req.requestId);
    }
    async getById(id, req) {
        return this.claims.getClaimById(id, req.requestId);
    }
};
exports.ClaimsController = ClaimsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: "List claims" }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_claims_query_1.GetClaimsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOkResponse)({ description: "Get claim by id" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "getById", null);
exports.ClaimsController = ClaimsController = __decorate([
    (0, swagger_1.ApiTags)("claims"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: "claims", version: "1" }),
    __metadata("design:paramtypes", [claims_service_1.ClaimsService])
], ClaimsController);
