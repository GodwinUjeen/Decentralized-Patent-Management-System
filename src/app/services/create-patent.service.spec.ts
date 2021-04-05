import { TestBed } from '@angular/core/testing';

import { CreatePatentService } from './create-patent.service';

describe('CreatePatentService', () => {
  let service: CreatePatentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePatentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
