import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiHashtagWordcloudComponent } from './poi-hashtag-wordcloud.component';

describe('PoiHashtagWordcloudComponent', () => {
  let component: PoiHashtagWordcloudComponent;
  let fixture: ComponentFixture<PoiHashtagWordcloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoiHashtagWordcloudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiHashtagWordcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
