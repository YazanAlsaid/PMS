import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuildingDialogComponent } from './add-building-dialog.component';

describe('AddBuildingDialogComponent', () => {
  let component: AddBuildingDialogComponent;
  let fixture: ComponentFixture<AddBuildingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBuildingDialogComponent]
    });
    fixture = TestBed.createComponent(AddBuildingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
