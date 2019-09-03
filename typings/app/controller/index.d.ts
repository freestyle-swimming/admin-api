// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/controller/auth';
import ExportCommon from '../../../app/controller/common';
import ExportPermission from '../../../app/controller/permission';
import ExportRole from '../../../app/controller/role';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    common: ExportCommon;
    permission: ExportPermission;
    role: ExportRole;
    user: ExportUser;
  }
}
