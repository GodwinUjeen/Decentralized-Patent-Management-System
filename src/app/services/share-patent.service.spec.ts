import { TestBed } from '@angular/core/testing';

import { SharePatentService } from './share-patent.service';

describe('SharePatentService', () => {
  let service: SharePatentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharePatentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
