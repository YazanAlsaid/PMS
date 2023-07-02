import { TestBed } from '@angular/core/testing';

import { RolesRosolveService } from './roles-rosolve.service';

describe('RolesRosolveService', () => {
  let service: RolesRosolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesRosolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
