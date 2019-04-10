import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhakaUserLayoutsComponent } from './dhaka-user-layouts.component';

describe('DhakaUserLayoutsComponent', () => {
  let component: DhakaUserLayoutsComponent;
  let fixture: ComponentFixture<DhakaUserLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhakaUserLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhakaUserLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
