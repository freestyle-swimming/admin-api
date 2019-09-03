import Controller from '../foundation/Bases/Controller';
import { roleAndPermissionStatusEnu, methodsEnu } from '../constant/index';
const commonValidate = {
  name: 'string',
  isleaf: 'boolean',
  status: {
    type: 'number',
    enum: roleAndPermissionStatusEnu,
  },
};
const validateRules = {
  ...commonValidate,
  grant: 'string',
  root: 'string',
  path: 'string',
  method: {
    type: 'string',
    enum: methodsEnu,
  },
};

export default class Permission extends Controller {
  public async create() {
    const { ctx, success } = this;
    const post = this.post;
    if (post.isleaf) {
      ctx.validate(validateRules);
      // grant验证重复
      const d = await ctx.service.settings.permission.findOne({ isleaf: true, grant: post.grant });
      if (d) return this.fail(9001, '权限值重复');
    } else {
      ctx.validate(commonValidate);
      // 节点验证重复
      const d = await ctx.service.settings.permission.findOne({ isleaf: false, name: post.name });
      if (d) return this.fail(9001, '重复的节点名称');
    }
    const res = await ctx.service.settings.permission.create(post);
    // 更新节点children
    if (post.root && res) {
      await ctx.service.settings.permission.updateById(post.root, {
        $addToSet: {
          children: res._id,
        },
      });
    }
    return success(res);
  }
  async index() {
    const { ctx } = this;
    const { name, alias } = this.getFiltedQuerys([ 'name', 'alias' ]);
    const q: any = {};
    if (name) q.name = new RegExp(`${name}`, 'gi');
    if (alias) q.alias = new RegExp(`${alias}`, 'gi');
    const res = await ctx.service.settings.permission.find({
      status: { $ne: 2 },
      isleaf: false,
      root: { $exists: false },
      ...q,
    }, [ 'name', 'grant' ]);
    return this.success(res);
  }
  async update() {
    const { ctx, success } = this;
    const id = ctx.params.id;
    const post = this.post;
    ctx.validate(validateRules);
    const res = await ctx.service.settings.permission.updateById(id, post);
    return success(res);
  }
  async show() {
    const { ctx, success } = this;
    const id = ctx.params.id;
    const res = await ctx.service.settings.permission.findById(id);
    return success(res);
  }
  async destroy() {

  }
}
