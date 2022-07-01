import { TestBed } from '@angular/core/testing';

import { SharedPatentService } from './shared-patent.service';

describe('SharedPatentService', () => {
  let service: SharedPatentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedPatentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
