import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalizationsChartComponent } from './hospitalizations-chart.component';

describe('HospitalizationsChartComponent', () => {
  let component: HospitalizationsChartComponent;
  let fixture: ComponentFixture<HospitalizationsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalizationsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalizationsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
