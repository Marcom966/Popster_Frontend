import { TestBed } from '@angular/core/testing';

import { GoogleauthServiceService } from './googleauth-service.service';

describe('GoogleauthServiceService', () => {
  let service: GoogleauthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleauthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
