import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDangerComponent } from './display-danger.component';

describe('DisplayDangerComponent', () => {
  let component: DisplayDangerComponent;
  let fixture: ComponentFixture<DisplayDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
