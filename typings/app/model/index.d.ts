// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOperationLog from '../../../app/model/operationLog';
import ExportPermission from '../../../app/model/permission';
import ExportRole from '../../../app/model/role';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    OperationLog: ReturnType<typeof ExportOperationLog>;
    Permission: ReturnType<typeof ExportPermission>;
    Role: ReturnType<typeof ExportRole>;
    User: ReturnType<typeof ExportUser>;
  }
}
