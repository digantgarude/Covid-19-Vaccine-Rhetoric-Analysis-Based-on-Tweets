import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisinfoDistCountryPieComponent } from './misinfo-dist-country-pie.component';

describe('MisinfoDistCountryPieComponent', () => {
  let component: MisinfoDistCountryPieComponent;
  let fixture: ComponentFixture<MisinfoDistCountryPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisinfoDistCountryPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisinfoDistCountryPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
