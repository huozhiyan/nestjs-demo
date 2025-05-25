"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logs_entity_1 = require("./src/logs/logs.entity");
const roles_entity_1 = require("./src/roles/roles.entity");
const profile_entity_1 = require("./src/user/profile.entity");
const user_entity_1 = require("./src/user/user.entity");
exports.default = {
    type: "mysql",
    host: "127.0.0.1",
    port: 3090,
    username: "root",
    password: "example",
    database: "test",
    entities: [user_entity_1.User, profile_entity_1.Profile, roles_entity_1.Roles, logs_entity_1.Logs],
    synchronize: true,
    logging: false,
};
//# sourceMappingURL=ormconfig.js.map