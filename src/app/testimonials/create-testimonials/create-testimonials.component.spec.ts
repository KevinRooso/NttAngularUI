import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestimonialsComponent } from './create-testimonials.component';

describe('CreateTestimonialsComponent', () => {
  let component: CreateTestimonialsComponent;
  let fixture: ComponentFixture<CreateTestimonialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTestimonialsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
