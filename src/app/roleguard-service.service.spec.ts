import { TestBed } from '@angular/core/testing';

import { RoleguardServiceService } from './roleguard-service.service';

describe('RoleguardServiceService', () => {
  let service: RoleguardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleguardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
