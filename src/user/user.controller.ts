import { Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { ConfigService } from "@nestjs/config";
import { ConfigEnum } from "src/enum/config.const";

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService
  ) {}
  @Get()
  getUsers(): any {
    // const db = this.configService.get(ConfigEnum.DB);
    // const host = this.configService.get(ConfigEnum.DB_HOST);
    // console.log("db", db);
    // console.log("host", host);

    // const url = this.configService.get("DB_URL");
    // console.log("url", url);

    const data = this.configService.get("db");
    console.log("data", data);

    return this.userService.getUsers();
  }
  @Post()
  addUser(): any {
    return this.userService.addUser();
  }
}
