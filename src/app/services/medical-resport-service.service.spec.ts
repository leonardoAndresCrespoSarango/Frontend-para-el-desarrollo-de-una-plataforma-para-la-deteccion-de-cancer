import { TestBed } from '@angular/core/testing';

import { MedicalResportServiceService } from './medical-resport-service.service';

describe('MedicalResportServiceService', () => {
  let service: MedicalResportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalResportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
