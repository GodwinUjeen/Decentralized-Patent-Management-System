import { TestBed } from '@angular/core/testing';

import { TransferedPatentService } from './transfered-patent.service';

describe('TransferedPatentService', () => {
  let service: TransferedPatentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferedPatentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
