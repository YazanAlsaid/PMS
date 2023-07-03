import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNfcDialogComponent } from './add-nfc-dialog.component';

describe('AddNfcDialogComponent', () => {
  let component: AddNfcDialogComponent;
  let fixture: ComponentFixture<AddNfcDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNfcDialogComponent]
    });
    fixture = TestBed.createComponent(AddNfcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
