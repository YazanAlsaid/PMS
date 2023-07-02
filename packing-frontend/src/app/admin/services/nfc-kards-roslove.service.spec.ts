import { TestBed } from '@angular/core/testing';

import { NfcKardsRosloveService } from './nfc-kards-roslove.service';

describe('NfcKardsRosloveService', () => {
  let service: NfcKardsRosloveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NfcKardsRosloveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
