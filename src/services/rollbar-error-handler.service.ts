import {ErrorHandler, Injectable, Inject} from '@angular/core';
import Rollbar from 'rollbar';
import { RollbarService } from '../config/rollbar.config'

@Injectable({
  providedIn: 'root'
})
export class RollbarErrorHandlerService implements ErrorHandler {

  constructor(@Inject(RollbarService) private rollbar: Rollbar) {}

  handleError(err: Error ): void {
    // might need to add user info in the payload
    this.rollbar.error(err);
  }
}
