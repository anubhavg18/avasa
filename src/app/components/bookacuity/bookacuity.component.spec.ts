import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookacuityComponent } from './bookacuity.component';

describe('BookacuityComponent', () => {
  let component: BookacuityComponent;
  let fixture: ComponentFixture<BookacuityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookacuityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookacuityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
