import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpusAnalyticsComponent } from './corpus-analytics.component';

describe('CorpusAnalyticsComponent', () => {
  let component: CorpusAnalyticsComponent;
  let fixture: ComponentFixture<CorpusAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpusAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpusAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
