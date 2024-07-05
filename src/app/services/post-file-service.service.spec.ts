import { TestBed } from '@angular/core/testing';

import { PostFileServiceService } from './post-file-service.service';

describe('PostFileServiceService', () => {
  let service: PostFileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostFileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
