"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const api_error_filter_1 = require("./common/errors/api-error.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableVersioning({
        type: common_1.VersioningType.URI, // /v1/...
        defaultVersion: "1",
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalFilters(new api_error_filter_1.ApiErrorFilter());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle("Insurance BFF API")
        .setDescription("Integration layer between FE and downstream insurance services")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const doc = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup("/docs", app, doc);
    await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
}
bootstrap();
