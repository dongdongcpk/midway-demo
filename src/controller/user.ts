import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { Validate } from '@midwayjs/validate';
import { UserLoginDTO } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('/api')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/user/login')
  @Validate()
  async login(@Body() body: UserLoginDTO) {
    const user = await this.userService.getUser(body.username, body.password);
    if (!user) {
      throw new Error('账号或密码不正确');
    }
    const token = await this.userService.generateToken({ ...body });
    return {
      code: 200,
      result: 'success',
      message: '登录成功',
      data: {
        token,
      }
    };
  }
}
