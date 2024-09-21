import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiagnosticDialogComponent } from './add-diagnostic-dialog.component';

describe('AddDiagnosticDialogComponent', () => {
  let component: AddDiagnosticDialogComponent;
  let fixture: ComponentFixture<AddDiagnosticDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDiagnosticDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDiagnosticDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
