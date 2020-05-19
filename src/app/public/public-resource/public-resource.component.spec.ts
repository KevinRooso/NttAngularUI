import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicResourceComponent } from './public-resource.component';

describe('PublicResourceComponent', () => {
  let component: PublicResourceComponent;
  let fixture: ComponentFixture<PublicResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicResourceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
