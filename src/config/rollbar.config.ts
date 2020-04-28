import { InjectionToken } from '@angular/core';
import Rollbar from 'rollbar';
import { environment } from './../environments/environment';

const rollbarConfig: object = {
  accessToken: environment.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: environment.ROLLBAR_ENABLE,
  environment: environment.NODE_ENV,
};

export function RollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
