import { ErrorHandler, Injectable, Inject } from '@angular/core';
import Rollbar from 'rollbar';
import { RollbarService } from '../config/rollbar.config';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RollbarErrorHandlerService implements ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) {}

  handleError(err: Error): void {
    // might need to log the error but not on rollbar
    if (environment.NODE_ENV === 'local') {
      throw err;
    } else {
      // tslint:disable-next-line:no-console
      console.log(err);
    }
    if (environment.ROLLBAR_ENABLE) {
      // might need to add user info in the payload
      this.rollbar.error(err);
    }
  }
}
