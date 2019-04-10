import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SherpaTipsComponent } from './sherpa-tips.component';

describe('SherpaTipsComponent', () => {
  let component: SherpaTipsComponent;
  let fixture: ComponentFixture<SherpaTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SherpaTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SherpaTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
