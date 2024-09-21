import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticIaComponent } from './diagnostic-ia.component';

describe('DiagnosticIaComponent', () => {
  let component: DiagnosticIaComponent;
  let fixture: ComponentFixture<DiagnosticIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticIaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiagnosticIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
