import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentHashtagWordcloudOverallComponent } from './sentiment-hashtag-wordcloud-overall.component';

describe('SentimentHashtagWordcloudOverallComponent', () => {
  let component: SentimentHashtagWordcloudOverallComponent;
  let fixture: ComponentFixture<SentimentHashtagWordcloudOverallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimentHashtagWordcloudOverallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentHashtagWordcloudOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
