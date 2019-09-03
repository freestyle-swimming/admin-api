import Service from '../../baseClass/Service';

export default class extends Service {
  constructor(ctx, name) {
    super(ctx, name);
    this.name = 'role';
  }
  public async find(q, populate) {
    return this.model.find(q).populate(populate);
  }
  async getPermissionsByRoles(roles) {
    const permissionArr:any[] = [];
    const res = await this.model.find({ _id: { $in: roles } }).populate({
      path:'permissions',
    });
    for (const permission of res) {
      const permissions = permission.permissions;
      for (const permissionItem of permissions) {
        if (permissionItem.status === 0 && !permissionArr.includes(permissionItem)) {
          permissionArr.push({
            grant: permissionItem.grant,
            path: permissionItem.path,
            method: permissionItem.method,
          });
        }
      }
    }
    return permissionArr;
  }
}