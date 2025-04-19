"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
const Joi = require("joi");
const typeorm_1 = require("@nestjs/typeorm");
const config_const_1 = require("./enum/config.const");
const envFilePath = `.env.${process.env.NODE_ENV || "development"}`;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath,
                load: [() => dotenv.config({ path: ".env" })],
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string()
                        .valid("development", "production", "test")
                        .default("development"),
                    DB_PORT: Joi.number().default(3306),
                    DB_HOST: Joi.string().ip(),
                    DB_TYPE: Joi.string().valid("mysql", "postgres"),
                    DB_DATABASE: Joi.string().required(),
                    DB_USERNAME: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    DB_SYNC: Joi.boolean().default(false),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: configService.get(config_const_1.ConfigEnum.DB_TYPE),
                    host: configService.get(config_const_1.ConfigEnum.DB_HOST),
                    port: configService.get(config_const_1.ConfigEnum.DB_PORT),
                    username: configService.get(config_const_1.ConfigEnum.DB_USERNAME),
                    password: configService.get(config_const_1.ConfigEnum.DB_PASSWORD),
                    database: configService.get(config_const_1.ConfigEnum.DB_DATABASE),
                    entities: [],
                    synchronize: configService.get(config_const_1.ConfigEnum.DB_SYNC),
                    logging: ["error", "warn"],
                }),
            }),
            user_module_1.UserModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map