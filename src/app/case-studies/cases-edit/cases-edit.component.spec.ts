import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesEditComponent } from './cases-edit.component';

describe('CasesEditComponent', () => {
  let component: CasesEditComponent;
  let fixture: ComponentFixture<CasesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
