import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): any;
    getOneUser(): any;
    addUser(): any;
    updateUser(): any;
    removeUser(): any;
    getUserProfile(): any;
    getUserLogs(): any;
    getLogsByGroup(): Promise<any>;
}
