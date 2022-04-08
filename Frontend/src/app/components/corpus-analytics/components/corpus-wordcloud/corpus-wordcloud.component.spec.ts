import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpusWordcloudComponent } from './corpus-wordcloud.component';

describe('CorpusWordcloudComponent', () => {
  let component: CorpusWordcloudComponent;
  let fixture: ComponentFixture<CorpusWordcloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpusWordcloudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpusWordcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
