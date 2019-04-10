import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SherpaBusyProfessionalsComponent } from './sherpa-busy-professionals.component';

describe('SherpaBusyProfessionalsComponent', () => {
  let component: SherpaBusyProfessionalsComponent;
  let fixture: ComponentFixture<SherpaBusyProfessionalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SherpaBusyProfessionalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SherpaBusyProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
