import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGroupComponent } from './category-group.component';

describe('CategoryGroupComponent', () => {
  let component: CategoryGroupComponent;
  let fixture: ComponentFixture<CategoryGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryGroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
