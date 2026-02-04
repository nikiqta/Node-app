export type DsClaim = {
  id: string;
  status: "OPEN" | "CLOSED" | "REJECTED";
  createdAt: string;
  amount: number;
  claimantName: string;
};

export type DsClaimsList = {
  items: DsClaim[];
  page: number;
  limit: number;
  total: number;
};
