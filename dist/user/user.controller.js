"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, logger) {
        this.userService = userService;
        this.logger = logger;
        this.logger.log("UserController initialized");
    }
    getUsers() {
        const user = { isAdmin: false };
        if (!user.isAdmin) {
            throw new common_1.HttpException("User is not admin", common_1.HttpStatus.FORBIDDEN);
        }
        this.logger.log("Fetching all users");
        this.logger.warn("Fetching all users");
        this.logger.error("Fetching all users");
        return this.userService.findAll();
    }
    getOneUser() {
        const username = "test";
        return this.userService.find(username);
    }
    addUser() {
        const user = { username: "test", password: "123456" };
        return this.userService.create(user);
    }
    updateUser() {
        const id = 1;
        const user = { username: "zahuopu", password: "654321" };
        return this.userService.update(id, user);
    }
    removeUser() {
        const id = 1;
        return this.userService.remove(id);
    }
    getUserProfile() {
        return this.userService.findProfile(2);
    }
    getUserLogs() {
        return this.userService.findUserLogs(2);
    }
    async getLogsByGroup() {
        const res = await this.userService.findLogsByGroup(2);
        return res.map((o) => ({
            result: o.result,
            count: o.count,
        }));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)("getAll"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)("getOne"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "getOneUser", null);
__decorate([
    (0, common_1.Post)("add"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)("update"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)("remove"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Get)("profile"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Get)("logs"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUserLogs", null);
__decorate([
    (0, common_1.Get)("logsByGroup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getLogsByGroup", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        common_1.Logger])
], UserController);
//# sourceMappingURL=user.controller.js.map