import { EggAppConfig, PowerPartial } from 'egg';
import { proDbUrl } from './secretConfig';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.mongoose = {
    url: proDbUrl,
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };
  return config;
};
