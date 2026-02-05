export type DownstreamConfig = {
  claimsBaseUrl: string;
  username: string;
  password: string;
  timeoutMs: number;
};

export const downstreamConfig = (): DownstreamConfig => ({
  claimsBaseUrl: 'http://localhost:9999/api', // process.env.DOWNSTREAM_CLAIMS_URL ?? 'http://localhost:9999/api',
  username: process.env.DOWNSTREAM_USERNAME ?? 'Admin',
  password: process.env.DOWNSTREAM_PASSWORD ?? '123',
  timeoutMs: process.env.DOWNSTREAM_TIMEOUT_MS
    ? Number(process.env.DOWNSTREAM_TIMEOUT_MS)
    : 8000,
});
