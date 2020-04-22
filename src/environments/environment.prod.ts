import { environment as defaultEnvironment } from './environment.default';

export const environment = {
  ...defaultEnvironment,
  production: true,
  log: false,
  API_ENDPOINT: '',
};
