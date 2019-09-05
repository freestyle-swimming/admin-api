import { Application } from 'egg';
export default (app: Application) => {
  const { controller, router } = app;
  const prefixKey = 'user';
  const prefix = router.namespace(`/${prefixKey}`);
  // 获取用户基础数据
  prefix.get('/base-info', controller.user.baseInfo);
};
