import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
// import Configuration from "./configuration";
// 导入 dotenv 库，用于解析 .env 文件
import * as dotenv from "dotenv";
import * as Joi from "joi"; // 用于验证环境变量的库
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigEnum } from "./enum/config.const"; // 导入配置枚举
import { User } from "./user/user.entity";
import { Profile } from "./user/profile.entity";
import { Roles } from "./roles/roles.entity";
import { Logs } from "./logs/logs.entity";
import { LoggerModule } from "nestjs-pino";
import { join } from "path";

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
        DB_HOST: Joi.string().ip(), // 数据库主机地址，必须是合法的 IP 地址
        DB_TYPE: Joi.string().valid("mysql", "postgres"), // 数据库类型，不能为空
        DB_DATABASE: Joi.string().required(), // 数据库名称，不能为空
        DB_USERNAME: Joi.string().required(), // 数据库用户名，不能为空
        DB_PASSWORD: Joi.string().required(), // 数据库密码，不能为空
        DB_SYNC: Joi.boolean().default(false), // 是否自动同步数据库结构，默认值为 false
      }),
      // load: [Configuration], // 可选：加载自定义配置文件
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 导入 ConfigModule 以获取配置
      inject: [ConfigService], // 注入 ConfigService
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get(ConfigEnum.DB_TYPE), // 数据库类型
          host: configService.get(ConfigEnum.DB_HOST), // 数据库主机地址
          port: configService.get(ConfigEnum.DB_PORT), // 数据库端口
          username: configService.get(ConfigEnum.DB_USERNAME), // 数据库用户名
          password: configService.get(ConfigEnum.DB_PASSWORD), // 数据库密码
          database: configService.get(ConfigEnum.DB_DATABASE), // 数据库名称
          entities: [User, Profile, Roles, Logs], // 实体类数组
          synchronize: configService.get(ConfigEnum.DB_SYNC), // 是否自动同步数据库结构
          // logging: ["error", "warn"], // 日志级别
          // logging: process.env.NODE_ENV === "development", // 日志
          logging: false,
        }) as TypeOrmModuleOptions,
    }),
    // 配置日志模块
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            process.env.NODE_ENV === "development"
              ? {
                  level: "info", // 日志级别为 info
                  target: "pino-pretty", // 使用 pino-pretty 格式化日志
                  options: {
                    colorize: true, // 启用日志颜色
                  },
                }
              : {
                  level: "info", // 日志级别为 info
                  target: "pino-roll", // 使用 pino-roll 将日志写入文件
                  options: {
                    file: join("log", "log.txt"), // 日志文件路径
                    frequency: "daily", // 日志文件按天滚动
                    size: "10M", // 每个日志文件的最大大小为 10MB
                    mkdir: true, // 如果目录不存在，则自动创建
                  },
                },
          ],
        },
      },
    }),
    UserModule, // 导入用户模块
  ],
  controllers: [], // 控制器（当前为空）
  providers: [], // 服务提供者（当前为空）
})
export class AppModule {}
