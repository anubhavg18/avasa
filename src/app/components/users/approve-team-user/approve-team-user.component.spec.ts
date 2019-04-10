import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTeamUserComponent } from './approve-team-user.component';

describe('ApproveTeamUserComponent', () => {
  let component: ApproveTeamUserComponent;
  let fixture: ComponentFixture<ApproveTeamUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveTeamUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTeamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
