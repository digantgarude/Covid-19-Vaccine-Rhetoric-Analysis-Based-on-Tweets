import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiTweetCountsComponent } from './poi-tweet-counts.component';

describe('PoiTweetCountsComponent', () => {
  let component: PoiTweetCountsComponent;
  let fixture: ComponentFixture<PoiTweetCountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoiTweetCountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiTweetCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
