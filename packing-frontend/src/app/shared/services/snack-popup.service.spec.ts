import { TestBed } from '@angular/core/testing';

import { SnackPopupService } from './snack-popup.service';

describe('SnackPopupService', () => {
  let service: SnackPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
