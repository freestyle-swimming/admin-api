/**
 * Created by lobin on 2017/7/24.
 */
import { Application } from 'egg';
import * as pageFindPlugin from 'mongoose-paginate';
import * as moment from 'moment';
import { methodsEnu } from '../constant/index';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
  const schema = new mongoose.Schema({
    // 用户信息
    user: {
      name: String,
      id: ObjectId,
    },
    // 方法
    method: {
      type: String,
      enum: methodsEnu,
    },
    // url
    url: {
      type: String,
      required: true,
    },
    // ip
    ip: {
      type: String,
      required: true,
    },
    // 操作字符串
    optstr: String,
    // 创建时间
    ctime: {
      type: Date,
      default: Date.now,
      required: true,
      get: (val: string) => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
  }, {
      timestamps: true,
    });
  schema.plugin(pageFindPlugin, {});
  schema.index({
  });
  return mongoose.model('Operationlogs', schema, 'operation_logs');
};
