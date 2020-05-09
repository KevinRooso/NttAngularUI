import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoineeDataComponent } from './joinee-data.component';

describe('JoineeDataComponent', () => {
  let component: JoineeDataComponent;
  let fixture: ComponentFixture<JoineeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JoineeDataComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoineeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
