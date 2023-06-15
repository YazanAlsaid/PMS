import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppScannerComponent } from './app-scanner.component';

describe('AppScannerComponent', () => {
  let component: AppScannerComponent;
  let fixture: ComponentFixture<AppScannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppScannerComponent]
    });
    fixture = TestBed.createComponent(AppScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
