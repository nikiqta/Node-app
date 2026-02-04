import { Injectable } from "@nestjs/common";
import { DownstreamHttpClient } from "../http/downstream-http.client";
import { downstreamConfig } from "../common/downstream.config";
import type { DsClaim, DsClaimsList } from "./claims.dto";

@Injectable()
export class ClaimsClient {
  private readonly cfg = downstreamConfig();

  constructor(private readonly http: DownstreamHttpClient) {}

  list(
    params: { page: number; limit: number; status?: string },
    requestId?: string,
  ) {
    const url = `${this.cfg.claimsBaseUrl}/claims`;
    return this.http.get<DsClaimsList>(url, { params }, requestId);
  }

  getById(id: string, requestId?: string) {
    const url = `${this.cfg.claimsBaseUrl}/claims/${encodeURIComponent(id)}`;
    return this.http.get<DsClaim>(url, undefined, requestId);
  }
}
