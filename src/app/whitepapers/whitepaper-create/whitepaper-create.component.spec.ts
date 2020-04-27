import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitepaperCreateComponent } from './whitepaper-create.component';

describe('WhitepaperCreateComponent', () => {
  let component: WhitepaperCreateComponent;
  let fixture: ComponentFixture<WhitepaperCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WhitepaperCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitepaperCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
