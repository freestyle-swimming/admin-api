export const userStatus = [
  {
    key: 0,
    value: '正常',
  },
  {
    key: 1,
    value: '禁用',
  },
  {
    key: 2,
    value: '删除',
  },
];

// 路由方法
export const methods = [
  {
    key: 'get',
    name: '获取',
  },
  {
    key: 'post',
    name: '创建',
  },
  {
    key: 'put',
    name: '修改',
  },
  {
    key: 'delete',
    name: '删除',
  },
];
// 权限及角色状态
export const roleAndPermissionStatus = [
  {
    key: 0,
    name: '正常',
  },
  {
    key: 1,
    name: '禁用',
  },
  {
    key: 2,
    name: '删除',
  },
];
export const userStatusEnu = userStatus.map(item => item.key);
export const methodsEnu = methods.map(item => item.key);
export const roleAndPermissionStatusEnu = roleAndPermissionStatus.map(item => item.key);
