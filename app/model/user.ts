/**
 * Created by lobin on 2017/7/24.
 */
import { Application } from 'egg';
import * as moment from 'moment';
import * as pageFindPlugin from 'mongoose-paginate';
import { userStatusEnu } from '../constant/index';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
  const schema = new mongoose.Schema({
    ctime: {
      type: Date,
      default: Date.now,
      required: true,
      get: (val: string) => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      max: 11,
      min: 11,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [{ type: ObjectId, default: 'manager' }],
    status: {
      type: String,
      enum: userStatusEnu,
      default: 0, // 默认为0,1为暂停使用,3为删除
    },
    remarks: {
      type: String,
    },
  }, {
      id: false,
      toJSON: {
        getters: true,
        virtuals: true,
      },
      timestamps: {
        updatedAt: true,
      },
    });
  schema.plugin(pageFindPlugin, {});
  schema.index({
    mobile: 1,
    ctime: -1,
    name: 1,
    role: 1,
    site: 1,
    status: 1,
  });
  return mongoose.model('user', schema, 'admin_user');
};
