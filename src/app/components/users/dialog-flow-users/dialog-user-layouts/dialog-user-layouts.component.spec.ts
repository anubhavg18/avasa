import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserLayoutsComponent } from './dialog-user-layouts.component';

describe('DialogUserLayoutsComponent', () => {
  let component: DialogUserLayoutsComponent;
  let fixture: ComponentFixture<DialogUserLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUserLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
