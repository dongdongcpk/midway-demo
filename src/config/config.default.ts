import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1659508621687_1507',
  koa: {
    port: 7001,
  },

  // db
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [UserEntity],
        synchronize: true,
        logging: false
      }
    }
  },

  // jwt
  jwt: {
    secret: 'for test',
    expiresIn: '7d',
  },

} as MidwayConfig;