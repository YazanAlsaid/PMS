import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParksComponent } from './parks.component';

describe('ParksComponent', () => {
  let component: ParksComponent;
  let fixture: ComponentFixture<ParksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParksComponent]
    });
    fixture = TestBed.createComponent(ParksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
