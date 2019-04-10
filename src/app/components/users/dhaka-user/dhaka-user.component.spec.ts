import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhakaUserComponent } from './dhaka-user.component';

describe('DhakaUserComponent', () => {
  let component: DhakaUserComponent;
  let fixture: ComponentFixture<DhakaUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhakaUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhakaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
