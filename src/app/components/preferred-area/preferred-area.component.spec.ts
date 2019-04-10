import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredAreaComponent } from './preferred-area.component';

describe('PreferredAreaComponent', () => {
  let component: PreferredAreaComponent;
  let fixture: ComponentFixture<PreferredAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferredAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
