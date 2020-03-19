import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParticipantsComponent } from './create-participants.component';

describe('CreateParticipantsComponent', () => {
  let component: CreateParticipantsComponent;
  let fixture: ComponentFixture<CreateParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
