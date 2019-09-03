import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1567502286477_2283';
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  // add your egg config in here
  config.middleware = [];
  config.whitelist = [
  ];
  config.permissionWhiteList = [
  ];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.redis = {
    client: {
      port: 9999,          // Redis port
      host: '123.56.11.90',   // Redis host
      password: 'wT9xupwhkc',
      db: 6,
    },
  };
  config.jwt = {
    secret: 'admin-api',
  };
  config.jwtExpire = 60 * 60 * 48;
  config.verifyCode = {
    canvas: {
      width: 100,
      height: 30,
    },
    font: '24px "微软雅黑"',
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
