import { environment as defaultEnvironment } from './environment.default';

export const environment = {
  ...defaultEnvironment,
  API_ENDPOINT: 'https://ntt-be-dev-app.herokuapp.com/',
  NODE_ENV: 'development',
  PROD: false,
  LOG: true,
  LOG_LEVEL: 'debug',
  ROLLBAR_ACCESS_TOKEN: '',
  ROLLBAR_ENABLE: false,
};
