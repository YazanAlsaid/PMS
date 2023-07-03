import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleDialoggComponent } from './add-role-dialogg.component';

describe('AddRoleDialoggComponent', () => {
  let component: AddRoleDialoggComponent;
  let fixture: ComponentFixture<AddRoleDialoggComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoleDialoggComponent]
    });
    fixture = TestBed.createComponent(AddRoleDialoggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
