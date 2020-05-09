import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteesDataComponent } from './invitees-data.component';

describe('InviteesDataComponent', () => {
  let component: InviteesDataComponent;
  let fixture: ComponentFixture<InviteesDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InviteesDataComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
