export type DownstreamConfig = {
  claimsBaseUrl: string;
  timeoutMs: number;
};

export const downstreamConfig = (): DownstreamConfig => ({
  claimsBaseUrl: process.env.DOWNSTREAM_CLAIMS_URL ?? "http://localhost:4001",
  timeoutMs: process.env.DOWNSTREAM_TIMEOUT_MS
    ? Number(process.env.DOWNSTREAM_TIMEOUT_MS)
    : 8000,
});
