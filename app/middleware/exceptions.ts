import { Context } from 'egg';

export default function exceptionsMiddleware () {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (error) {
      let statusCode = error.status || 500;
      let statusMessage = error.message || 'error';
      if (error.name === 'MongoError') {
        statusCode = 509;
        statusMessage = '服务器繁忙请稍后再试';
      }
      if (error.message === 'Validation Failed') {
        const errors = error.errors;
        const msgArray: string[] = [];
        for (const item of errors) {
          msgArray.push(`${item.field}字段${item.message}`);
        }
        statusMessage = msgArray.join(',');
      }
      // 响应返回
      ctx.body = {
        code: statusCode,
        data: null,
        message: statusMessage,
      };
    }
  };
}
