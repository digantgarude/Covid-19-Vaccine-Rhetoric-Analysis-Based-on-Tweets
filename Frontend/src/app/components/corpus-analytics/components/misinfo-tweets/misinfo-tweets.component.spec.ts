import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisinfoTweetsComponent } from './misinfo-tweets.component';

describe('MisinfoTweetsComponent', () => {
  let component: MisinfoTweetsComponent;
  let fixture: ComponentFixture<MisinfoTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisinfoTweetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisinfoTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
