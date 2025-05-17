import { Logs } from "src/logs/logs.entity";
import { Roles } from "src/roles/roles.entity";
import { Profile } from "src/user/profile.entity";
import { User } from "src/user/user.entity";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default {
  type: "mysql", // 数据库类型
  host: "127.0.0.1", // 数据库主机地址
  port: 3090, // 数据库端口
  username: "root", // 数据库用户名
  password: "example", // 数据库密码
  database: "test", // 数据库名称
  entities: [User, Profile, Roles, Logs], // 实体类数组
  synchronize: true, // 是否自动同步数据库结构
  // logging: ["error", "warn"], // 日志级别
  // logging: process.env.NODE_ENV === "development", // 日志
  logging: false,
} as TypeOrmModuleOptions;
