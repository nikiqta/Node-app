import { Injectable, NotFoundException } from "@nestjs/common";
import { GetClaimsQueryDto } from "./dto/get-claims.query";
import { ClaimsDownstreamClient } from "../integrations/clients/claims-downstream.client";

@Injectable()
export class ClaimsService {
  constructor(private readonly downstream: ClaimsDownstreamClient) {}

  async listClaims(query: GetClaimsQueryDto, requestId?: string) {
    const data = await this.downstream.listClaims(
      { page: query.page ?? 1, limit: query.limit ?? 20, status: query.status },
      requestId,
    );

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

  async getClaimById(id: string, requestId?: string) {
    const data = await this.downstream.getClaimById(id, requestId);

    if (!data) {
      throw new NotFoundException(`Claim ${id} not found`);
    }

    return {
      id: data.claimId,
      status: data.status,
      createdAt: data.createdAt,
      amount: data.amount,
      claimant: data.claimant,
    };
  }
}
