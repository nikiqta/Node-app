import { Module } from "@nestjs/common";
import { HttpClientModule } from "../../common/http/http.module";
import { ClaimsController } from "./claims.controller";
import { ClaimsService } from "./claims.service";
import { IntegrationsModule } from "../integrations/integrations.module";

@Module({
  imports: [HttpClientModule, IntegrationsModule],
  controllers: [ClaimsController],
  providers: [ClaimsService],
})
export class ClaimsModule {}
