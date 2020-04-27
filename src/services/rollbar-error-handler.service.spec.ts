import { TestBed } from '@angular/core/testing';

import { RollbarErrorHandlerService } from './rollbar-error-handler.service';

describe('RollbarErrorHandlerService', () => {
  let service: RollbarErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollbarErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
