import { UserService } from "./user.service";
import { ConfigService } from "@nestjs/config";
export declare class UserController {
    private userService;
    private configService;
    constructor(userService: UserService, configService: ConfigService);
    getUsers(): any;
    addUser(): any;
}
