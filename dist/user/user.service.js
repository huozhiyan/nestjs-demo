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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const logs_entity_1 = require("../logs/logs.entity");
let UserService = class UserService {
    constructor(userRepository, logsRepository) {
        this.userRepository = userRepository;
        this.logsRepository = logsRepository;
    }
    findAll() {
        return this.userRepository.find();
    }
    find(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async create(user) {
        const newUser = await this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }
    update(id, user) {
        return this.userRepository.update(id, user);
    }
    remove(id) {
        return this.userRepository.delete(id);
    }
    findProfile(id) {
        return this.userRepository.findOne({
            where: { id },
            relations: {
                profile: true,
            },
        });
    }
    async findUserLogs(id) {
        const user = await this.findOne(id);
        return this.logsRepository.find({
            where: { user },
            relations: {
                user: true,
            },
        });
    }
    async findLogsByGroup(id) {
        return this.logsRepository
            .createQueryBuilder("logs")
            .select("logs.result", "result")
            .addSelect('Count("logs.result")', "count")
            .leftJoinAndSelect("logs.user", "user")
            .where("user.id = :id", { id })
            .groupBy("logs.result")
            .orderBy("result", "DESC")
            .offset(2)
            .addOrderBy("count", "DESC")
            .limit(3)
            .getRawMany();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(logs_entity_1.Logs)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map