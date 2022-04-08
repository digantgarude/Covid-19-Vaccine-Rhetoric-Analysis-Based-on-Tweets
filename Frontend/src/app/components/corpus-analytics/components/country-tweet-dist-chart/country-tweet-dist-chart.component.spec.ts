import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryTweetDistChartComponent } from './country-tweet-dist-chart.component';

describe('CountryTweetDistChartComponent', () => {
  let component: CountryTweetDistChartComponent;
  let fixture: ComponentFixture<CountryTweetDistChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryTweetDistChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryTweetDistChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
