import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ErrorMiddleware } from './middleware/error.middleware';
import * as orm from '@midwayjs/typeorm';
import * as jwt from '@midwayjs/jwt';
import { IMidwayContainer } from '@midwayjs/core';
import { UserService } from './service/user.service';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    orm,
    jwt,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady(container: IMidwayContainer) {
    // add middleware
    this.app.useMiddleware([ErrorMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);

    const userService = await container.getAsync(UserService);
    await userService.insertMockData();
  }
}
