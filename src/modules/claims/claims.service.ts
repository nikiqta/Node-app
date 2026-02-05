import { Injectable } from '@nestjs/common';
import { ClaimsClient } from '../integrations/claims/claims.client';
import {
  toClaimDetails,
  toClaimSummary,
} from '../integrations/claims/claims.mapper';
import { GetClaimsQueryDto } from './dto/get-claims.query';

@Injectable()
export class ClaimsService {
  constructor(private readonly claimsClient: ClaimsClient) {}

  async loginClient() {
    try {
      const response = await this.claimsClient.login();
      console.log('Claims client login response:', response);
    } catch (error) {
      console.error('Error logging in claims client:', error);
      throw error;
    }
  }

  async listClaims(query: GetClaimsQueryDto, requestId?: string) {
    try {
      const ds = await this.claimsClient.list(
        {
          page: query.page ?? 1,
          limit: query.limit ?? 20,
          status: query.status,
        },
        requestId,
      );

      return {
        items: ds.items.map(toClaimSummary),
        page: ds.page,
        limit: ds.limit,
        total: ds.total,
      };
    } catch (error) {
      console.error('Error in ClaimsService.listClaims:', error);
      throw error;
    }
  }

  async getClaimById(id: string, requestId?: string) {
    try {
      console.log(`Fetching claim by ID: ${id} with Request ID: ${requestId}`);

      const ds = await this.claimsClient.getById(id, requestId);
      return toClaimDetails(ds);
    } catch (error) {
      console.error(
        `Error in ClaimsService.getClaimById for ID: ${id}:`,
        error,
      );
      throw error;
    }
  }
}
