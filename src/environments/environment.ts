import {environment as defaultEnvironment} from "./environment.default";

  export const environment = {
    ...defaultEnvironment,
    API_ENDPOINT: 'https://ntt-be-dev-app.herokuapp.com/',
    nodeEnv: 'local',
    production: 'false',
    log: 'true'
  };
