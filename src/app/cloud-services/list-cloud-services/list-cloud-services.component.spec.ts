import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCloudServicesComponent } from './list-cloud-services.component';

describe('ListCloudServicesComponent', () => {
  let component: ListCloudServicesComponent;
  let fixture: ComponentFixture<ListCloudServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCloudServicesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCloudServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
