"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    app.setGlobalPrefix("api");
    const port = 3000;
    await app.listen(port);
    logger.log(`App运行在：${port}`);
    logger.warn(`App运行在：${port}`);
    logger.error(`App运行在：${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map