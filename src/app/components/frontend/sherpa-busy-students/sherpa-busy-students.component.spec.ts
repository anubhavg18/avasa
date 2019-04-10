import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SherpaBusyStudentsComponent } from './sherpa-busy-students.component';

describe('SherpaBusyStudentsComponent', () => {
  let component: SherpaBusyStudentsComponent;
  let fixture: ComponentFixture<SherpaBusyStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SherpaBusyStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SherpaBusyStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
