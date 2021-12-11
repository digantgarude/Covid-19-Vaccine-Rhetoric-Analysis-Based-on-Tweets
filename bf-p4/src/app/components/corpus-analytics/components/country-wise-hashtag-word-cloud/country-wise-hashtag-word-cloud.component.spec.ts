import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryWiseHashtagWordCloudComponent } from './country-wise-hashtag-word-cloud.component';

describe('CountryWiseHashtagWordCloudComponent', () => {
  let component: CountryWiseHashtagWordCloudComponent;
  let fixture: ComponentFixture<CountryWiseHashtagWordCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryWiseHashtagWordCloudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryWiseHashtagWordCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
