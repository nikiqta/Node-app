import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ClaimsService } from "./claims.service";
import { GetClaimsQueryDto } from "./dto/get-claims.query";

@ApiTags("claims")
@ApiBearerAuth()
@Controller({ path: "claims", version: "1" })
export class ClaimsController {
  constructor(private readonly claims: ClaimsService) {}

  @Get()
  @ApiOkResponse({ description: "List claims" })
  async list(@Query() query: GetClaimsQueryDto, @Req() req: any) {
    return this.claims.listClaims(query, req.requestId);
  }

  @Get(":id")
  @ApiOkResponse({ description: "Get claim by id" })
  async getById(@Param("id") id: string, @Req() req: any) {
    return this.claims.getClaimById(id, req.requestId);
  }
}
