import { Application } from 'egg';
export default (app: Application) => {
  const { controller, router } = app;
  const prefixKey = 'common';
  const prefix = router.namespace(`/${prefixKey}`);
  // 登录获取token
  prefix.get('/verify-code', controller.common.verifyCode);
};
