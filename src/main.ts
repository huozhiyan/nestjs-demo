import { NestFactory } from "@nestjs/core"; // 导入 NestFactory，用于创建 Nest 应用实例
import { AppModule } from "./app.module"; // 导入应用的根模块
import { createLogger } from "winston";
import * as winston from "winston";
import { utilities, WinstonModule } from "nest-winston"; // 导入 nest-winston，用于 Nest 集成 Winston 日志库}
// import { Logger } from "@nestjs/common"; // 导入 Logger，用于日志记录
import "winston-daily-rotate-file"; // 导入 Winston 日志轮转文件传输器

/**
 * 应用程序的入口文件
 * - 使用 NestFactory 创建应用实例
 * - 配置全局设置并启动应用
 */
async function bootstrap() {
  // const logger = new Logger(); // 创建 Logger 实例，用于记录日志

  // 创建 Winston 日志实例
  const instance = createLogger({
    transports: [
      // 配置控制台日志输出
      new winston.transports.Console({
        level: "info", // 日志级别为 info
        format: winston.format.combine(
          winston.format.timestamp(), // 添加时间戳
          utilities.format.nestLike() // 格式化日志为 Nest 风格
        ),
      }),
      // 配置日志文件轮转（警告级别）
      new winston.transports.DailyRotateFile({
        level: "warn", // 日志级别为 warn
        dirname: "logs", // 日志文件存储目录
        filename: "application-%DATE%.log", // 日志文件名，包含日期占位符
        datePattern: "YYYY-MM-DD-HH", // 日期格式
        zippedArchive: true, // 启用压缩存档
        maxSize: "20m", // 每个日志文件的最大大小为 20MB
        maxFiles: "14d", // 保留日志文件的天数为 14 天
        format: winston.format.combine(
          winston.format.timestamp(), // 添加时间戳
          winston.format.simple() // 简单格式化日志
        ),
      }),
      // 配置日志文件轮转（信息级别）
      new winston.transports.DailyRotateFile({
        level: "info", // 日志级别为 info
        dirname: "logs", // 日志文件存储目录
        filename: "info-%DATE%.log", // 日志文件名，包含日期占位符
        datePattern: "YYYY-MM-DD-HH", // 日期格式
        zippedArchive: true, // 启用压缩存档
        maxSize: "20m", // 每个日志文件的最大大小为 20MB
        maxFiles: "14d", // 保留日志文件的天数为 14 天
        format: winston.format.combine(
          winston.format.timestamp(), // 添加时间戳
          winston.format.simple() // 简单格式化日志
        ),
      }),
    ],
  });

  // 创建应用实例，并可选配置日志级别
  const app = await NestFactory.create(AppModule, {
    // 日志级别配置（可选）
    // logger: ["error", "warn"], // 仅记录错误和警告日志
    logger: WinstonModule.createLogger({
      instance,
    }),
  });

  // 设置全局路由前缀
  app.setGlobalPrefix("api"); // 所有路由将以 "api" 为前缀，例如 /api/user

  const port = 3000; // 定义应用监听的端口号

  // 启动应用并监听指定端口
  await app.listen(port);

  // 使用 Logger 记录应用启动信息
  // logger.log(`App运行在：${port}`); // 普通日志
  // logger.warn(`App运行在：${port}`); // 警告日志
  // logger.error(`App运行在：${port}`); // 错误日志

  // 使用 Winston 记录应用启动信息
  instance.info(`应用已启动，监听端口：${port}`);
}

// 启动应用
bootstrap();
