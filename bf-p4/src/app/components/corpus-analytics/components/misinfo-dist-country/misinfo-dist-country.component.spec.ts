import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisinfoDistCountryComponent } from './misinfo-dist-country.component';

describe('MisinfoDistCountryComponent', () => {
  let component: MisinfoDistCountryComponent;
  let fixture: ComponentFixture<MisinfoDistCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisinfoDistCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisinfoDistCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
