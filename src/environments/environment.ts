import { environment as defaultEnvironment } from './environment.default';

export const environment = {
  ...defaultEnvironment,
  API_ENDPOINT: 'https://ntt-be-dev-app.herokuapp.com/',
  NODE_ENV: 'undefined',
  PROD: false,
  LOG: false,
  LOG_LEVEL: 'debug',
  ROLLBAR_ACCESS_TOKEN: '',
  ROLLBAR_ENABLE: false,
};
