import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisinfoKeywordsUsedComponent } from './misinfo-keywords-used.component';

describe('MisinfoKeywordsUsedComponent', () => {
  let component: MisinfoKeywordsUsedComponent;
  let fixture: ComponentFixture<MisinfoKeywordsUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisinfoKeywordsUsedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisinfoKeywordsUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
