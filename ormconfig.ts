import { DataSource, DataSourceOptions } from "typeorm";
import { Logs } from "./src/logs/logs.entity";
import { Roles } from "./src/roles/roles.entity";
import { Profile } from "./src/user/profile.entity";
import { User } from "./src/user/user.entity";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

/**
 * TypeORM 连接参数配置
 * - 配置数据库连接信息、实体、同步选项等
 */
export const connectionParams = {
  type: "mysql", // 数据库类型
  host: "127.0.0.1", // 数据库主机地址
  port: 3090, // 数据库端口
  username: "root", // 数据库用户名
  password: "example", // 数据库密码
  database: "test", // 数据库名称
  entities: [User, Profile, Roles, Logs], // 实体类数组，自动映射到数据库表
  synchronize: true, // 是否自动同步数据库结构（开发环境建议开启，生产环境建议关闭）
  // logging: ["error", "warn"], // 日志级别（可选，记录错误和警告）
  // logging: process.env.NODE_ENV === "development", // 仅开发环境开启日志
  logging: false, // 是否开启 SQL 日志
} as TypeOrmModuleOptions;

/**
 * 导出 DataSource 实例
 * - 用于 TypeORM CLI 和运行时的数据源管理
 * - 包含迁移和订阅者配置
 */
export default new DataSource({
  ...connectionParams, // 继承上面的数据库连接参数
  migrations: ["src/migrations/**"], // 迁移文件路径
  subscribers: [], // 订阅者（可选）
} as DataSourceOptions);
