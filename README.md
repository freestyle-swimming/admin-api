# admin-api
基于eggjs，mongodb，redis使用Typescript开发；配合[https://github.com/freestyle-swimming/ant-design-vue-admin];[https://github.com/freestyle-swimming/ant-design-react-admin]实现管理系统权限管理及设置；

## 主要功能
1.登录授权(token)
2.全局错误处理
3.权限管理

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:6003/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
