import { TestBed } from '@angular/core/testing';

import { PatentHoldingService } from './patent-holding.service';

describe('PatentHoldingService', () => {
  let service: PatentHoldingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatentHoldingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
