import { Application, Context } from 'egg';
import * as pathToRegexp from 'path-to-regexp';

export default (_options: any, app: Application) => {
  return async function auth(ctx: Context, next: () => Promise<any>) {
    const checkWhiteList = (url: string) => {
      const whitelist = app.config.whitelist;
      let result = false;
      for (const key in whitelist) {
        const item = whitelist[key];
        if (!result) {
          const re = pathToRegexp(item);
          result = !!re.exec(url);
        }
      }
      return result;
    };
    // 白名单直接放行
    if (checkWhiteList(ctx.url)) {
      await next();
      return;
    }
    const authorization = ctx.header.authorization;
    const token = authorization && authorization.split(' ')[1] || ctx.query.token;
    if (!token) {
      ctx.body = {
        code: 403,
        message: '请先登录',
      };
      return;
    }

    const tokenInfo = await app.redis.get(`tokens:${token}`);
    if (!tokenInfo) {
      ctx.body = {
        code: 403,
        message: '登录过期',
      };
      return;
    }
    const tokenInfoObj = JSON.parse(tokenInfo);
    const userInfo = await ctx.service.user.findAvailable(tokenInfoObj.userId);
    if (userInfo) {
      // 挂载用户信息到ctx上面
      ctx.state.userId = tokenInfoObj.userId;
      ctx.state.user = userInfo;
      await next();
    } else {
      ctx.body = {
        code: 401,
        message: '用户不存在', // TODO: 应该是服务端要更新
      };
    }
  };
};
