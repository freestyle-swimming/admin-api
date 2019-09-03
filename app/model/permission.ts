/**
 * Created by lobin on 2017/7/24.
 */
import { Application } from 'egg';
import * as pageFindPlugin from 'mongoose-paginate';
import * as autopopulate from 'mongoose-autopopulate';

import { methodsEnu, roleAndPermissionStatusEnu } from '../constant/index';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
  const schema = new mongoose.Schema({
    // 权限名称
    name: {
      type: String,
      requied: true,
    },
    // root 父级权限
    root: {
      type: ObjectId,
      requied: true,
    },
    // 是否为子节点
    isleaf: {
      type: Boolean,
      requied: true,
      default: false,
    },
    // children
    children: {
      type: [{
        type: ObjectId,
        requied: false,
        ref: 'Permission',
        autopopulate: {
          select: [ 'name', 'grant' ],
        },
      }],
      requied: false,
    },
    // 权限值
    grant: {
      type: String,
      requied: true,
    },
    // 后端路由path
    path: {
      type: String,
      requied: true,
    },
    // 后端支持的方法
    method: {
      type: String,
      enum: methodsEnu,
    },
    // 状态
    status: {
      type: Number,
      enum: roleAndPermissionStatusEnu, // 0正常 1禁用 2删除
      requied: true,
      default: 0,
    },
  }, {
    timestamps: true,
  });
  schema.plugin(pageFindPlugin, {});
  schema.plugin(autopopulate, {});
  schema.index({
  });
  return mongoose.model('Permission', schema, 'permission');
};
