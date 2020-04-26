import {environment as defaultEnvironment} from "./environment.default";

  export const environment = {
    ...defaultEnvironment,
    API_ENDPOINT: '',
    NODE_ENV: 'stage',
    PROD: false,
    LOG: true,
    LOG_LEVEL: 'debug',
    ROLLBAR_ACCESS_TOKEN: '',
    ROLLBAR_ENABLE: false
  };
