import { Module } from "@nestjs/common";
import { HttpClientModule } from "../../common/http/http.module";
import { ClaimsDownstreamClient } from "./clients/claims-downstream.client";

@Module({
  imports: [HttpClientModule],
  providers: [ClaimsDownstreamClient],
  exports: [ClaimsDownstreamClient],
})
export class IntegrationsModule {}
