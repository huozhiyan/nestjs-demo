import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
// import Configuration from "./configuration";
// 导入 dotenv 库，用于解析 .env 文件
import * as dotenv from "dotenv";
import * as Joi from "joi"; // 用于验证环境变量的库

/**
 * 动态生成环境变量文件路径：
 * - 如果系统环境变量 `NODE_ENV` 存在（如 production、development、test），则加载对应的 `.env.[NODE_ENV]` 文件
 * - 默认使用 `.env.development` 文件
 */
const envFilePath = `.env.${process.env.NODE_ENV || "development"}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 将配置模块声明为全局模块，所有其他模块均可直接注入 ConfigService
      envFilePath, // 指定环境变量文件路径（根据 NODE_ENV 动态加载）
      /**
       * 自定义配置加载器：
       * - 显式加载默认的 `.env` 文件，作为兜底配置
       * - 如果 `envFilePath` 和 `.env` 文件中存在相同的变量，`envFilePath` 的变量会覆盖 `.env` 中的值
       */
      load: [() => dotenv.config({ path: ".env" })],
      /**
       * 使用 Joi 验证环境变量：
       * - 定义环境变量的结构和默认值
       * - 确保环境变量的值符合预期（如类型、范围等）
       */
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production", "test") // 限制 NODE_ENV 的合法值
          .default("development"), // 默认值为 "development"
        DB_PORT: Joi.number().default(3306), // 数据库端口，默认值为 3306
        DB_URL: Joi.string().domain(), // 数据库 URL，必须是合法的域名
        DB_HOST: Joi.string().ip(), // 数据库主机地址，必须是合法的 IP 地址
      }),
      // load: [Configuration], // 可选：加载自定义配置文件
    }),
    UserModule, // 导入用户模块
  ],
  controllers: [], // 控制器（当前为空）
  providers: [], // 服务提供者（当前为空）
})
export class AppModule {}
