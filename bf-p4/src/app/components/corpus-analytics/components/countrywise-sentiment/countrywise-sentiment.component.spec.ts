import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrywiseSentimentComponent } from './countrywise-sentiment.component';

describe('CountrywiseSentimentComponent', () => {
  let component: CountrywiseSentimentComponent;
  let fixture: ComponentFixture<CountrywiseSentimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrywiseSentimentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrywiseSentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
