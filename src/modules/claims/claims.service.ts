import { Injectable } from "@nestjs/common";
import { ClaimsClient } from "../integrations/claims/claims.client";
import {
  toClaimDetails,
  toClaimSummary,
} from "../integrations/claims/claims.mapper";
import { GetClaimsQueryDto } from "./dto/get-claims.query";

@Injectable()
export class ClaimsService {
  constructor(private readonly claimsClient: ClaimsClient) {}

  async listClaims(query: GetClaimsQueryDto, requestId?: string) {
    const ds = await this.claimsClient.list(
      { page: query.page ?? 1, limit: query.limit ?? 20, status: query.status },
      requestId,
    );

    return {
      items: ds.items.map(toClaimSummary),
      page: ds.page,
      limit: ds.limit,
      total: ds.total,
    };
  }

  async getClaimById(id: string, requestId?: string) {
    const ds = await this.claimsClient.getById(id, requestId);
    return toClaimDetails(ds);
  }
}
