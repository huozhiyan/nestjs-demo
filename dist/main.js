"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const winston_1 = require("winston");
const winston = require("winston");
const nest_winston_1 = require("nest-winston");
require("winston-daily-rotate-file");
async function bootstrap() {
    const instance = (0, winston_1.createLogger)({
        transports: [
            new winston.transports.Console({
                level: "info",
                format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
            }),
            new winston.transports.DailyRotateFile({
                level: "warn",
                dirname: "logs",
                filename: "application-%DATE%.log",
                datePattern: "YYYY-MM-DD-HH",
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "14d",
                format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
            }),
            new winston.transports.DailyRotateFile({
                level: "info",
                dirname: "logs",
                filename: "info-%DATE%.log",
                datePattern: "YYYY-MM-DD-HH",
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "14d",
                format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
            }),
        ],
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger({
            instance,
        }),
    });
    app.setGlobalPrefix("api");
    const port = 3000;
    await app.listen(port);
    instance.info(`应用已启动，监听端口：${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map