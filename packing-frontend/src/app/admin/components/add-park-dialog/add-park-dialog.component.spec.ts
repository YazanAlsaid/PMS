import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParkDialogComponent } from './add-park-dialog.component';

describe('AddParkDialogComponent', () => {
  let component: AddParkDialogComponent;
  let fixture: ComponentFixture<AddParkDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddParkDialogComponent]
    });
    fixture = TestBed.createComponent(AddParkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
