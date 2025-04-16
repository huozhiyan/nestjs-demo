import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  getUsers(): any {
    return {
      code: 0,
      data: [],
      msg: "请求用户列表成功",
    };
  }
  addUser(): any {
    return {
      code: 0,
      data: {},
      msg: "添加用户成功",
    };
  }
}
