import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerUiComponent } from './banner-ui.component';

describe('BannerUiComponent', () => {
  let component: BannerUiComponent;
  let fixture: ComponentFixture<BannerUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
