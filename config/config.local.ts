import { EggAppConfig, PowerPartial } from 'egg';
import { localDbUrl } from './secretConfig';
export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.mongoose = {
    url: localDbUrl,
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };
  return config;
};
