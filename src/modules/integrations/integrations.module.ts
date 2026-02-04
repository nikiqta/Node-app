import { Module } from "@nestjs/common";
import { HttpClientModule } from "../../common/http/http.module";

import { DownstreamHttpClient } from "./http/downstream-http.client";
import { ClaimsClient } from "./claims/claims.client";

@Module({
  imports: [HttpClientModule],
  providers: [DownstreamHttpClient, ClaimsClient],
  exports: [ClaimsClient],
})
export class IntegrationsModule {}
