import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProptechStartupComponent } from './proptech-startup.component';

describe('ProptechStartupComponent', () => {
  let component: ProptechStartupComponent;
  let fixture: ComponentFixture<ProptechStartupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProptechStartupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProptechStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
