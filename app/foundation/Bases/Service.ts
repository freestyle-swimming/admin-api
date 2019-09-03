import { Context, Service } from 'egg';
import * as _ from 'lodash';
export default class BaseService extends Service {
  constructor(ctx: Context, public name: string) {
    super(ctx);
  }
  /**
   * 获取model
   *
   * @readonly
   * @memberof BaseService
   */
  get model() {
    const modelName = _.capitalize(this.name);
    return this.ctx.model[modelName];
  }
  /**
   * 通用查询接口
   *
   * @param {object} query
   * @param {string[]} select
   * @returns Promise
   * @memberof BaseService
   */
  async find(query: object, select?: string[], limit?: 10, populate?: any) {
    if (limit) return this.model.find(query, select).populate(populate).limit(limit);
    return this.model.find(query, select);
  }
  /**
   * 分页查询
   *
   * @param {object} query
   * @param {object} options
   * @returns Promise
   * @memberof BaseService
   */
  async paginate(query: object, options: object) {
    return (this.model as any).paginate(query, options);
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
   * 根据id查找
   *
   * @param {string} id
   * @returns Promise
   * @memberof BaseService
   */
  findById(id: string, select?: string[]) {
    this.checkObjectId(id);
    return this.model.findById(id, select);
  }
  /**
   * 通用从缓存获取详情
   *
   * @param {string} id
   * @returns Object
   * @memberof BaseService
   */
  async findByIdFromCatch(id: string) {
    const redisKey = `${this.name}:${id}`;
    const res = await this.app.redis.get(redisKey);
    if (res) {
      return JSON.parse(res);
    } else {
      const detail = await this.model.findById(id);
      // tslint:disable-next-line:curly
      if (detail) this.app.redis.setex(redisKey, this.config.redisCatchEx.common, JSON.stringify(detail));
      return detail;
    }
  }
  async cleanCatchById(id: string) {
    const redisKey = `${this.name}:${id}`;
    await this.app.redis.del(redisKey);
  }
  /**
   * 根据条件查找一个
   *
   * @param {object} obj
   * @returns Promise
   * @memberof BaseService
   */
  findOne(obj: object, select?: string[]) {
    return this.model.findOne(obj, select);
  }
  /**
   * 根据条件更新字段并返回
   *
   * @param {string} id
   * @param {object} data
   * @param {object} options
   * @returns Promise
   * @memberof BaseService
   */
  async findOneAndMoidfy(obj: object, data: object, options?: any) {
    return this.model.findOneAndUpdate(obj, data, options);
  }
  /**
   * 根据id更新字段
   *
   * @param {string} id
   * @param {object} data
   * @param {object} options
   * @returns Promise
   * @memberof BaseService
   */
  async updateById(id: string, data: object, options?: any) {
    return this.model.findByIdAndUpdate(id, data, options);
  }
  /**
   * 根据条件更新
   *
   * @param {object} select
   * @param {object} data
   * @param {object} options
   * @returns Promise
   * @memberof BaseService
   */
  async updateMany(select: object, data: object, options: object) {
    return this.model.update(select, { $set: data }, options);
  }
  /**
   * 根据id删除
   *
   * @param {string} id
   * @returns Promise
   * @memberof BaseService
   */
  async deleteById(id: string) {
    return this.model.findByIdAndRemove(id);
  }
  /**
   * 查找并删除
   *
   * @param {object} obj
   * @returns Promise
   * @memberof BaseService
   */
  async findAndRemove(obj: object) {
    return this.model.remove(obj);
  }
  /**
   * 创建
   *
   * @param {object} data
   * @returns Promise
   * @memberof BaseService
   */
  async create(data: any) {
    return this.model.create(data);
  }
  /**
   * count
   *
   * @param {object} data
   * @returns Promise
   * @memberof BaseService
   */
  async count(data: object) {
    return this.model.countDocuments(data);
  }
  async aggregate(data: any) {
    return this.model.aggregate(data);
  }
}
