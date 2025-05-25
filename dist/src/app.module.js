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
const logs_module_1 = require("./logs/logs.module");
const ormconfig_1 = require("../ormconfig");
const envFilePath = `.env.${process.env.NODE_ENV || "development"}`;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Global)(),
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
                    DB_HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain()),
                    DB_TYPE: Joi.string().valid("mysql", "postgres"),
                    DB_DATABASE: Joi.string().required(),
                    DB_USERNAME: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    DB_SYNC: Joi.boolean().default(false),
                    LOG_ON: Joi.boolean(),
                    LOG_LEVEL: Joi.string(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.connectionParams),
            user_module_1.UserModule,
            logs_module_1.LogsModule,
        ],
        controllers: [],
        providers: [common_1.Logger],
        exports: [common_1.Logger],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map