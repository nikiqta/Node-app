import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import axiosRetry from "axios-retry";
import type { AxiosRequestConfig } from "axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class HttpClient {
  constructor(private readonly http: HttpService) {
    // configure retry once (idempotent safe defaults)
    axiosRetry(this.http.axiosRef, {
      retries: 2,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) => {
        // retry on network errors + 5xx
        const status = error.response?.status;
        return (
          axiosRetry.isNetworkOrIdempotentRequestError(error) ||
          (status != null && status >= 500)
        );
      },
    });
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    requestId?: string,
  ): Promise<T> {
    const headers = {
      ...(config?.headers ?? {}),
      ...(requestId ? { "x-request-id": requestId } : {}),
    };

    const obs$ = this.http.get<T>(url, { ...config, headers });
    const res = await firstValueFrom(obs$);
    return res.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    requestId?: string,
  ): Promise<T> {
    const headers = {
      ...(config?.headers ?? {}),
      ...(requestId ? { "x-request-id": requestId } : {}),
    };

    const obs$ = this.http.post<T>(url, data, { ...config, headers });
    const res = await firstValueFrom(obs$);
    return res.data;
  }
}
