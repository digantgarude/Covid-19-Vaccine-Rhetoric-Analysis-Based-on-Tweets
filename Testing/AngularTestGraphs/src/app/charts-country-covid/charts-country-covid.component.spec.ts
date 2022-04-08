import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsCountryCovidComponent } from './charts-country-covid.component';

describe('ChartsCountryCovidComponent', () => {
  let component: ChartsCountryCovidComponent;
  let fixture: ComponentFixture<ChartsCountryCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsCountryCovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsCountryCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
