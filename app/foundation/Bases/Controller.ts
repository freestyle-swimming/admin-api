import { Controller, Context } from 'egg';
import * as _ from 'lodash';
export default class BaseController extends Controller {
  constructor(ctx: Context) {
    super(ctx);
  }
  /**
   * 成功返回函数
   */
  public success(data: any) {
    this.ctx.body = {
      code: 0,
      message: '成功',
      data,
    };
  }
  /**
   * 验证参数里是否是ObjectId
   */
  public checkObjectId(objectId: string) {
    this.ctx.validate({
      id: 'objectId',
    }, {
        id: objectId,
      });
  }
  /**
   * 失败返回函数
   */
  public fail(code: number, message: string) {
    this.ctx.body = {
      code: code || 500,
      message: message || '请求错误,请稍后再试',
      data: null,
    };
  }
  // 获取赛选后的参数
  public getFiltedQuerys(select: string[]) {
    const query = this.query;
    return _.pick(query, select);
  }
  /**
   * 获取查询条件，并过滤空值
   *
   * @readonly
   * @memberof BaseController
   */
  public get query() {
    const obj: any = this.ctx.query;
    const param: any = {};
    // tslint:disable-next-line:curly
    if (obj === null || obj === undefined || obj === '') return param;
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
        param[key] = obj[key];
      }
    }
    return param;
  }
  /**
   * 获取request body
   *
   * @readonly
   * @memberof BaseController
   */
  public get post() {
    const obj: any = this.ctx.request.body;
    const param: any = {};
    // tslint:disable-next-line:curly
    if (obj === null || obj === undefined || obj === '') return param;
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
        param[key] = obj[key];
      }
    }
    return param;
  }
   /*
  * 生成分页参数
  * @params pageSize:number = 10
  * @params dateRangeKey:string
  * @return {page,limit,dateRangeKey}
  */
  public genPagingParams(pageSize: number = 10) {
    const query = this.ctx.query;
    const page = Number(query.page) || 1;
    let dateRange: any;
    const limit = Number(query.pageSize) || pageSize;
    if (query.start && query.end) {
      dateRange = {
        $gt: `${query.start} 00:00:00`,
        $lt: `${query.end} 23:59:59`,
      };
    }
    return { page, limit, dateRange };
  }
  // 获取paramsByKey
  public getFiltedParam(key: string) {
    const val = this.ctx.params[key];
    if (!val) throw new Error(`${key} is required!`);
    return val;
  }
  public submitSuccess(msg?: string) {
    this.success(msg || '提交成功');
  }
  /**
   * 通用详情
   */
  async show() {
    const id = this.ctx.params.id;
    const res = await this.service.findById(id);
    return this.success(res);
  }
}
