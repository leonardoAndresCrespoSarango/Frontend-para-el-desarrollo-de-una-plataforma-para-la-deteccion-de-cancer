import { TestBed } from '@angular/core/testing';

import { DetectionService } from './detection.service';

describe('DetectionService', () => {
  let service: DetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
