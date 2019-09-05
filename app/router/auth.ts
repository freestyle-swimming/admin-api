import { Application } from 'egg';
export default (app: Application) => {
  const { controller, router } = app;
  const prefixKey = 'auth';
  const prefix = router.namespace(`/${prefixKey}`);
  // 登录获取token
  prefix.post('/token', controller.auth.token);
  // 获取验证码
  prefix.get('/verify-code', controller.common.verifyCode);
};
