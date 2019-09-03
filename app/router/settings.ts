import { Application } from 'egg';
export default (app: Application) => {
  const { controller, router } = app;
  const prefixKey = 'settings';
  const prefix = router.namespace(`/${prefixKey}`);
  // 权限restful
  prefix.resources('permissions', '/permissions', controller.permission);
  // role restful
  prefix.resources('roles', '/roles', controller.role);
};
