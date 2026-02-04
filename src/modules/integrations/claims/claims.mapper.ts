import type { DsClaim } from "./claims.dto";

export type ClaimSummary = {
  id: string;
  status: string;
  createdAt: string;
  amount: number;
};

export type ClaimDetails = ClaimSummary & {
  claimant: { name: string };
};

export function toClaimSummary(ds: DsClaim): ClaimSummary {
  return {
    id: ds.id,
    status: ds.status,
    createdAt: ds.createdAt,
    amount: ds.amount,
  };
}

export function toClaimDetails(ds: DsClaim): ClaimDetails {
  return {
    ...toClaimSummary(ds),
    claimant: { name: ds.claimantName },
  };
}
