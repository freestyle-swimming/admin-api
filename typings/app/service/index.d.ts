// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/service/Test';
import ExportJwt from '../../../app/service/jwt';
import ExportUser from '../../../app/service/user';
import ExportVerify from '../../../app/service/verify';

declare module 'egg' {
  interface IService {
    test: ExportTest;
    jwt: ExportJwt;
    user: ExportUser;
    verify: ExportVerify;
  }
}
