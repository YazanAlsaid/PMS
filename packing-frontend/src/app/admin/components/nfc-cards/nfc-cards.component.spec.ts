import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfcCardsComponent } from './nfc-cards.component';

describe('NfcCardsComponent', () => {
  let component: NfcCardsComponent;
  let fixture: ComponentFixture<NfcCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NfcCardsComponent]
    });
    fixture = TestBed.createComponent(NfcCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
