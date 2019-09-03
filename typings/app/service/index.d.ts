// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJwt from '../../../app/service/jwt';
import ExportPermission from '../../../app/service/permission';
import ExportRole from '../../../app/service/role';
import ExportUser from '../../../app/service/user';
import ExportVerify from '../../../app/service/verify';

declare module 'egg' {
  interface IService {
    jwt: ExportJwt;
    permission: ExportPermission;
    role: ExportRole;
    user: ExportUser;
    verify: ExportVerify;
  }
}
