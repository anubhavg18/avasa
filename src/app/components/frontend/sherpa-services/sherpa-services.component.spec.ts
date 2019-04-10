import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SherpaServicesComponent } from './sherpa-services.component';

describe('SherpaServicesComponent', () => {
  let component: SherpaServicesComponent;
  let fixture: ComponentFixture<SherpaServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SherpaServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SherpaServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
