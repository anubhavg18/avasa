import { TestBed } from '@angular/core/testing';

import { DhakaUserService } from './dhaka-user.service';

describe('DhakaUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DhakaUserService = TestBed.get(DhakaUserService);
    expect(service).toBeTruthy();
  });
});
