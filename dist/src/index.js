"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../ormconfig");
const user_entity_1 = require("./user/user.entity");
ormconfig_1.default.initialize()
    .then(async () => {
    const res = await ormconfig_1.default.manager.find(user_entity_1.User);
    console.log("Here you can setup and run express / fastify / any other framework.", res);
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map