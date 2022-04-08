import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidCountryDeathsComponent } from './covid-country-deaths.component';

describe('CovidCountryDeathsComponent', () => {
  let component: CovidCountryDeathsComponent;
  let fixture: ComponentFixture<CovidCountryDeathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidCountryDeathsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidCountryDeathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
