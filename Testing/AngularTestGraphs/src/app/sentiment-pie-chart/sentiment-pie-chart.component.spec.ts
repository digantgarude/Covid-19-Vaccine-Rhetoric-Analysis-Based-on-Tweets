import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentPieChartComponent } from './sentiment-pie-chart.component';

describe('SentimentPieChartComponent', () => {
  let component: SentimentPieChartComponent;
  let fixture: ComponentFixture<SentimentPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimentPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
