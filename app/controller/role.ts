import Controller from '../foundation/Bases/Controller';
import { roleAndPermissionStatusEnu } from '../constant/index';
const validateRules = {
  name: 'string',
  alias: 'string',
  permissions: 'array',
  status: {
    type: 'number',
    enum: roleAndPermissionStatusEnu,
  },
};

export default class RoleController extends Controller {
  async create() {
    const { ctx, success } = this;
    const post = this.post;
    ctx.validate(validateRules);
    const res = await ctx.service.settings.role.create(post);
    return success(res);
  }
  async index() {
    const { ctx, success } = this;
    const { name, alias } = this.getFiltedQuerys([ 'name', 'alias' ]);
    const q: any = {};
    if (name) q.name = new RegExp(`${name}`, 'gi');
    if (alias) q.alias = new RegExp(`${alias}`, 'gi');
    const res = await ctx.service.settings.role.find({
      status: { $ne: 2 },
      ...q,
    }, { path: 'permissions' });
    return success(res);
  }
  async update() {
    const { ctx, success } = this;
    const id = ctx.params.id;
    const post = this.post;
    ctx.validate(validateRules);
    const res = await ctx.service.settings.role.updateById(id, post);
    return success(res);
  }
  async show() {
    const { ctx, success } = this;
    const id = ctx.params.id;
    const res = await ctx.service.settings.role.findById(id);
    return success(res);
  }
  async destroy() {

  }
}
