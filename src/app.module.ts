import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { RequestIdMiddleware } from "./common/logging/request-id.middleware";
import { LoggingInterceptor } from "./common/logging/logging.interceptor";
import { ClaimsModule } from "./modules/claims/claims.module";

@Module({
  imports: [
    // keep HttpModule global usage minimal; we wrap it in our own HttpClientModule too
    HttpModule,
    ClaimsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes("*");
  }
}
