import { NestFactory } from "@nestjs/core"; // 导入 NestFactory，用于创建 Nest 应用实例
import { AppModule } from "./app.module"; // 导入应用的根模块
import { Logger } from "@nestjs/common"; // 导入 Logger，用于日志记录

/**
 * 应用程序的入口文件
 * - 使用 NestFactory 创建应用实例
 * - 配置全局设置并启动应用
 */
async function bootstrap() {
  const logger = new Logger(); // 创建 Logger 实例，用于记录日志

  // 创建应用实例，并可选配置日志级别
  const app = await NestFactory.create(AppModule, {
    // 日志级别配置（可选）
    // logger: ["error", "warn"], // 仅记录错误和警告日志
  });

  // 设置全局路由前缀
  app.setGlobalPrefix("api"); // 所有路由将以 "api" 为前缀，例如 /api/user

  const port = 3000; // 定义应用监听的端口号

  // 启动应用并监听指定端口
  await app.listen(port);

  // 使用 Logger 记录应用启动信息
  logger.log(`App运行在：${port}`); // 普通日志
  logger.warn(`App运行在：${port}`); // 警告日志
  logger.error(`App运行在：${port}`); // 错误日志
}

// 启动应用
bootstrap();
