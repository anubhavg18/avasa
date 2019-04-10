import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SherpaBusyCorporatesComponent } from './sherpa-busy-corporates.component';

describe('SherpaBusyCorporatesComponent', () => {
  let component: SherpaBusyCorporatesComponent;
  let fixture: ComponentFixture<SherpaBusyCorporatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SherpaBusyCorporatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SherpaBusyCorporatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
