/**
 * Created by lobin on 2017/7/24.
 */
import { Application } from 'egg';
import * as pageFindPlugin from 'mongoose-paginate';
import { roleAndPermissionStatusEnu } from '../constant/index';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
  const schema = new mongoose.Schema({
    // 角色名称
    name: {
      type: String,
      requied: true,
    },
    // 角色别称
    alias: {
      type: String,
      requied: true,
      unique: true,
    },
    // 权限
    permissions: [{
      type: ObjectId,
      ref: 'Permission',
    }],
    // 状态
    status: {
      type: Number,
      enum: roleAndPermissionStatusEnu, // 0正常 1禁用 2删除
      requied: true,
      default: 0,
    },
  }, {
    toJSON: { getters: true },
    timestamps: true,
    });
  schema.plugin(pageFindPlugin, {});
  schema.index({
  });
  return mongoose.model('Role', schema, 'roles');
};
