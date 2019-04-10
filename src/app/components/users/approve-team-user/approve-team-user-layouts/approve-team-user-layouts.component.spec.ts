import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTeamUserLayoutsComponent } from './approve-team-user-layouts.component';

describe('ApproveTeamUserLayoutsComponent', () => {
  let component: ApproveTeamUserLayoutsComponent;
  let fixture: ComponentFixture<ApproveTeamUserLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveTeamUserLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTeamUserLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
