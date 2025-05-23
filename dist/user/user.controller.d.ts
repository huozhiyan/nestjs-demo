import { LoggerService } from "@nestjs/common";
import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    private readonly logger;
    constructor(userService: UserService, logger: LoggerService);
    getUsers(): any;
    getOneUser(): any;
    addUser(): any;
    updateUser(): any;
    removeUser(): any;
    getUserProfile(): any;
    getUserLogs(): any;
    getLogsByGroup(): Promise<any>;
}
