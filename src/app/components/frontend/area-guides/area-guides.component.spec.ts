import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaGuidesComponent } from './area-guides.component';

describe('AreaGuidesComponent', () => {
  let component: AreaGuidesComponent;
  let fixture: ComponentFixture<AreaGuidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaGuidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
