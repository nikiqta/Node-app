import { Injectable } from "@nestjs/common";
import { HttpClient } from "../../../common/http/http.client";

type DownstreamClaim = {
  claimId: string;
  status: string;
  createdAt: string;
  amount: number;
  claimant?: { name: string; idNumber?: string };
};

type DownstreamClaimsList = {
  items: DownstreamClaim[];
  page: number;
  limit: number;
  total: number;
};

@Injectable()
export class ClaimsDownstreamClient {
  // In real life, take this from config/env:
  private readonly baseUrl =
    process.env.DOWNSTREAM_CLAIMS_URL ?? "https://example-downstream/claims";

  constructor(private readonly http: HttpClient) {}

  async listClaims(
    params: { page: number; limit: number; status?: string },
    requestId?: string,
  ): Promise<DownstreamClaimsList> {
    // Example: GET https://.../claims?page=1&limit=20&status=OPEN
    return this.http.get<DownstreamClaimsList>(
      this.baseUrl,
      { params },
      requestId,
    );
  }

  async getClaimById(
    id: string,
    requestId?: string,
  ): Promise<DownstreamClaim | null> {
    // Example: GET https://.../claims/{id}
    return this.http.get<DownstreamClaim>(
      `${this.baseUrl}/${encodeURIComponent(id)}`,
      undefined,
      requestId,
    );
  }
}
