import { Config, Inject, Provide } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { MidwayConfig } from '@midwayjs/core';
import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../model/user.model';

@Provide()
export class UserService {
  @Inject()
  jwtService: JwtService;

  @Inject()
  userModel: UserModel;

  @Config('jwt')
  jwt: MidwayConfig['jwt'];

  async getUser(username: string, password: string) {
    return this.userModel.getUserByUsernameAndPassword(username, password);
  }

  async generateToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async insertMockData() {
    return this.userModel.insertMockData();
  }
}
