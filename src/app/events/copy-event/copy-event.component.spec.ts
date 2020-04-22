import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyEventComponent } from './copy-event.component';

describe('CopyEventComponent', () => {
  let component: CopyEventComponent;
  let fixture: ComponentFixture<CopyEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CopyEventComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
