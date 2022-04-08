import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidCountryCasesComponent } from './covid-country-cases.component';

describe('CovidCountryCasesComponent', () => {
  let component: CovidCountryCasesComponent;
  let fixture: ComponentFixture<CovidCountryCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidCountryCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidCountryCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
