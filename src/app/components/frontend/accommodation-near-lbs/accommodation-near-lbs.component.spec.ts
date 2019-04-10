import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationNearLbsComponent } from './accommodation-near-lbs.component';

describe('AccommodationNearLbsComponent', () => {
  let component: AccommodationNearLbsComponent;
  let fixture: ComponentFixture<AccommodationNearLbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationNearLbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationNearLbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
