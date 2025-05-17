import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as winston from "winston";
import { utilities, WinstonModule, WinstonModuleOptions } from "nest-winston"; // 导入 nest-winston，用于 Nest 集成 Winston 日志库
import { Console } from "winston/lib/winston/transports";
import * as DailyRotateFile from "winston-daily-rotate-file";
import { LogEnum } from "src/enum/config.const";

/**
 * 日志模块
 * - 集成 winston 日志库，支持控制台输出和文件轮转
 * - 日志级别、是否开启文件日志等参数可通过配置动态控制
 */
@Module({
  imports: [
    // 异步注册 Winston 日志模块，支持依赖注入 ConfigService 动态配置
    WinstonModule.forRootAsync({
      inject: [ConfigService], // 注入配置服务
      useFactory: (configSerivice: ConfigService) => {
        // 控制台日志输出配置
        const consoleTransports = new Console({
          level: "info", // 日志级别为 info
          format: winston.format.combine(
            winston.format.timestamp(), // 添加时间戳
            utilities.format.nestLike() // 格式化日志为 Nest 风格
          ),
        });

        // 按天轮转的 warn 级别日志文件配置
        const dailyTransports = new DailyRotateFile({
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
        });

        // 按天轮转的 info 级别日志文件配置，日志级别可通过配置动态获取
        const dailyInfoTransports = new DailyRotateFile({
          level: configSerivice.get(LogEnum.LOG_LEVEL), // 日志级别通过配置获取
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
        });

        // 根据配置决定是否启用文件日志
        return {
          transports: [
            consoleTransports,
            ...(configSerivice.get(LogEnum.LOG_ON)
              ? [dailyTransports, dailyInfoTransports]
              : []), // 如果开启日志文件，则添加文件日志输出
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
})
export class LogsModule {}
