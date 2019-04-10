import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyNearImperialComponent } from './property-near-imperial.component';

describe('PropertyNearImperialComponent', () => {
  let component: PropertyNearImperialComponent;
  let fixture: ComponentFixture<PropertyNearImperialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyNearImperialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyNearImperialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
