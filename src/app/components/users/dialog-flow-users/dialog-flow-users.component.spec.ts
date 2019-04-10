import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFlowUsersComponent } from './dialog-flow-users.component';

describe('DialogFlowUsersComponent', () => {
  let component: DialogFlowUsersComponent;
  let fixture: ComponentFixture<DialogFlowUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFlowUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFlowUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
