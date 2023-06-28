import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFloorDialogComponent } from './add-floor-dialog.component';

describe('AddFloorDialogComponent', () => {
  let component: AddFloorDialogComponent;
  let fixture: ComponentFixture<AddFloorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFloorDialogComponent]
    });
    fixture = TestBed.createComponent(AddFloorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
