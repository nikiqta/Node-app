import { Injectable } from "@nestjs/common";
import type { AxiosRequestConfig } from "axios";
import { HttpClient } from "../../../common/http/http.client";
import { downstreamConfig } from "../common/downstream.config";

@Injectable()
export class DownstreamHttpClient {
  private readonly cfg = downstreamConfig();

  constructor(private readonly http: HttpClient) {}

  get<T>(
    url: string,
    config?: AxiosRequestConfig,
    requestId?: string,
  ): Promise<T> {
    return this.http.get<T>(url, this.withDefaults(config), requestId);
  }

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    requestId?: string,
  ): Promise<T> {
    return this.http.post<T>(url, data, this.withDefaults(config), requestId);
  }

  private withDefaults(config?: AxiosRequestConfig): AxiosRequestConfig {
    const baseHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Example: API key auth (if needed later)
      ...(process.env.DOWNSTREAM_API_KEY
        ? { "x-api-key": process.env.DOWNSTREAM_API_KEY }
        : {}),
    };

    return {
      timeout: this.cfg.timeoutMs,
      ...config,
      headers: {
        ...baseHeaders,
        ...(config?.headers ?? {}),
      },
    };
  }
}
