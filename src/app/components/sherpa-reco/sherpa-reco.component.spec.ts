import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SherpaRecoComponent } from './sherpa-reco.component';

describe('SherpaRecoComponent', () => {
  let component: SherpaRecoComponent;
  let fixture: ComponentFixture<SherpaRecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SherpaRecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SherpaRecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
