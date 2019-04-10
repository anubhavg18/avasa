import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesidebarComponent } from './profilesidebar.component';

describe('ProfilesidebarComponent', () => {
  let component: ProfilesidebarComponent;
  let fixture: ComponentFixture<ProfilesidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
