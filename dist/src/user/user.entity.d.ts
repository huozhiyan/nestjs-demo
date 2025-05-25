import { Logs } from "src/logs/logs.entity";
import { Roles } from "src/roles/roles.entity";
import { Profile } from "./profile.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    logs: Logs[];
    roles: Roles[];
    profile: Profile;
}
