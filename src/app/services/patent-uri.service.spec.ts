import { TestBed } from '@angular/core/testing';

import { PatentUriService } from './patent-uri.service';

describe('PatentUriService', () => {
  let service: PatentUriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatentUriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
