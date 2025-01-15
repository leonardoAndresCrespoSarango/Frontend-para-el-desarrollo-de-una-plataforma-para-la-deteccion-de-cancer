import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuerzoComponent } from './refuerzo.component';

describe('RefuerzoComponent', () => {
  let component: RefuerzoComponent;
  let fixture: ComponentFixture<RefuerzoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefuerzoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefuerzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
