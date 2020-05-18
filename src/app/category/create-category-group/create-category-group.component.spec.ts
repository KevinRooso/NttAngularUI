import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryGroupComponent } from './create-category-group.component';

describe('CreateCategoryGroupComponent', () => {
  let component: CreateCategoryGroupComponent;
  let fixture: ComponentFixture<CreateCategoryGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCategoryGroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
