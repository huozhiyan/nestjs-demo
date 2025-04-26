import { UserService } from "./user.service";
import { Logger } from "nestjs-pino";
export declare class UserController {
    private userService;
    private logger;
    constructor(userService: UserService, logger: Logger);
    getUsers(): any;
    getOneUser(): any;
    addUser(): any;
    updateUser(): any;
    removeUser(): any;
    getUserProfile(): any;
    getUserLogs(): any;
    getLogsByGroup(): Promise<any>;
}
