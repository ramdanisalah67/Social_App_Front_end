import { TestBed } from '@angular/core/testing';

import { HandleTimeService } from './handle-time.service';

describe('HandleTimeService', () => {
  let service: HandleTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
