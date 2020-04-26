import { writeFile } from 'fs';

// Load env vars from .env file
if (process && process.env && !process.env.NODE_ENV) {
  try {
    require('dotenv').config({ path: '.env.local' });
  } catch(ex){
    console.log('.env.local file not found');
    console.log(ex);
  }
}

let CONFIG: object = {
  LOG_ENABLE: false,
  LOG_LEVEL: 'debug',
  PROD: false,
  API_ENDPOINT: '',
};

// Configure Angular `environment.ts` file path
let targetPath: string = '';
let ENV = process.env.NODE_ENV || 'development';
switch (ENV) {
  case 'development':
    targetPath = './src/environments/environment.dev.ts';
    CONFIG['LOG_ENABLE'] = true;
    CONFIG['API_ENDPOINT'] = 'https://ntt-be-dev-app.herokuapp.com/';
    break;
  case 'test':
    targetPath = './src/environments/environment.testing.ts';
    CONFIG['LOG_ENABLE'] = true;
    CONFIG['API_ENDPOINT'] = 'https://ntt-be-testing-app.herokuapp.com/';
    break;
  case 'staging':
    targetPath = './src/environments/environment.stage.ts';
    CONFIG['LOG_ENABLE'] = true;
    CONFIG['API_ENDPOINT'] = 'https://ntt-be-stage-app.herokuapp.com/';
    break;
  case 'production':
    targetPath = './src/environments/environment.prod.ts';
    CONFIG['LOG_ENABLE'] = false;
    CONFIG['PROD'] = true;
    CONFIG['API_ENDPOINT'] = '';
    break;
  default:
    targetPath = './src/environments/environment.ts';
    CONFIG['API_ENDPOINT'] = 'https://ntt-be-dev-app.herokuapp.com/';
}

// `environment.ts` file structure
const envConfigFile = `import {environment as defaultEnvironment} from "./environment.default";

  export const environment = {
    ...defaultEnvironment,
    API_ENDPOINT: '${process.env.API_ENDPOINT || CONFIG['API_ENDPOINT']}',
    NODE_ENV: '${process.env.NODE_ENV || ENV}',
    PROD: ${process.env.PRODUCTION || CONFIG['PROD']},
    LOG: ${process.env.LOG || CONFIG['LOG_ENABLE']},
    LOG_LEVEL: '${process.env.LOG_LEVEL || CONFIG['LOG_LEVEL']}',
    ROLLBAR_ACCESS_TOKEN: '${process.env.ROLLBAR_ACCESS_TOKEN || CONFIG['ROLLBAR_ACCESS_TOKEN']}',
    ROLLBAR_ENABLE: ${process.env.ROLLBAR_ENABLE || CONFIG['ROLLBAR_ENABLE']}
  };
`;
console.log('The file ' + targetPath + ' will be written with the following content: \n');

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment file generated correctly at ${targetPath} \n`);
  }
});
