import {environment as defaultEnvironment} from "./environment.default";

  export const environment = {
    ...defaultEnvironment,
    API_ENDPOINT: 'https://ntt-be-dev-app.herokuapp.com/',
    NODE_ENV: 'local',
    PROD: 'false',
    LOG: 'true',
    LOG_LEVEL: 'debug',
    ROLLBAR_ACCESS_TOKEN: '6edfc016b1664223a2264b9d080206a1',
    ROLLBAR_ENABLE: 'true'
  };
