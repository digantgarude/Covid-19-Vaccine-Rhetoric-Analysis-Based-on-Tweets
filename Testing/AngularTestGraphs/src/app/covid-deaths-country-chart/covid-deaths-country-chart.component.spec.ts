import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidDeathsCountryChartComponent } from './covid-deaths-country-chart.component';

describe('CovidDeathsCountryChartComponent', () => {
  let component: CovidDeathsCountryChartComponent;
  let fixture: ComponentFixture<CovidDeathsCountryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidDeathsCountryChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidDeathsCountryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
