import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import Configuration from "./configuration";
// 导入 dotenv 库，用于解析 .env 文件
// import * as dotenv from "dotenv";

/**
 * 动态生成环境变量文件路径：
 * - 如果系统环境变量 `NODE_ENV` 存在（如 production、development、test），则加载对应的 `.env.[NODE_ENV]` 文件
 * - 默认使用 `.env.development` 文件
 */
// const envFilePath = `.env.${process.env.NODE_ENV || "development"}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 将配置模块声明为全局模块，所有其他模块均可直接注入 ConfigService
      // envFilePath, // 指定环境变量文件路径（根据 NODE_ENV 动态加载）
      // 自定义配置加载器：显式加载默认的 .env 文件（作为兜底配置）
      // 注：如果同时存在 envFilePath 和此配置，envFilePath 的变量会覆盖 .env 的重复键
      // load: [() => dotenv.config({ path: ".env" })],
      load: [Configuration],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
