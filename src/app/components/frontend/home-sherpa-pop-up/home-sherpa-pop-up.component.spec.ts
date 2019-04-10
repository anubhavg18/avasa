import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSherpaPopUpComponent } from './home-sherpa-pop-up.component';

describe('HomeSherpaPopUpComponent', () => {
  let component: HomeSherpaPopUpComponent;
  let fixture: ComponentFixture<HomeSherpaPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSherpaPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSherpaPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
