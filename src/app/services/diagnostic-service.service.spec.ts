import { TestBed } from '@angular/core/testing';

import { DiagnosticServiceService } from './diagnostic-service.service';

describe('DiagnosticServiceService', () => {
  let service: DiagnosticServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
