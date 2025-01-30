import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramaComponent } from './histograma.component';

describe('HistogramaComponent', () => {
  let component: HistogramaComponent;
  let fixture: ComponentFixture<HistogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistogramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
