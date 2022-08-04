import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, IMidwayKoaApplication } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {

  let app: IMidwayKoaApplication;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('should POST /api/user/login succeed', async () => {
    const result = await createHttpRequest(app)
      .post('/api/user/login')
      .timeout(1000)
      .send({
        username: 'jack',
        password: 'redballoon'
      });

    expect(result.body).toMatchObject({
      code: expect.any(Number),
      result: expect.any(String),
      message: expect.any(String),
      data: {
        token: expect.any(String)
      }
    });
    expect(result.body.message).toBe('登录成功');
  });

  it('should POST /api/user/login failed', async () => {
    const result = await createHttpRequest(app)
      .post('/api/user/login')
      .send({
        username: 'foo',
        password: 'bar'
      });

    expect(result.body.message).toBe('账号或密码不正确');
  });
});
