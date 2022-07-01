import { TestBed } from '@angular/core/testing';

import { TransferPatentService } from './transfer-patent.service';

describe('TransferPatentService', () => {
  let service: TransferPatentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferPatentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
