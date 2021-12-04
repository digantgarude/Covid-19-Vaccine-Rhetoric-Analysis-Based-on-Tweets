import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationsChartComponent } from './vaccinations-chart.component';

describe('VaccinationsChartComponent', () => {
  let component: VaccinationsChartComponent;
  let fixture: ComponentFixture<VaccinationsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
