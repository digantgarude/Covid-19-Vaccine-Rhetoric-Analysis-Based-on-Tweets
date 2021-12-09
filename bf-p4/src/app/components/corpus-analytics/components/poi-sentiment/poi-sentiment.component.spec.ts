import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiSentimentComponent } from './poi-sentiment.component';

describe('PoiSentimentComponent', () => {
  let component: PoiSentimentComponent;
  let fixture: ComponentFixture<PoiSentimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoiSentimentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiSentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
