import { environment as defaultEnvironment } from './environment.default';

export const environment = {
  ...defaultEnvironment,
  API_ENDPOINT: '',
  NODE_ENV: 'production',
  PROD: true,
  LOG: false,
  LOG_LEVEL: 'error',
  ROLLBAR_ACCESS_TOKEN: '',
  ROLLBAR_ENABLE: false,
};
