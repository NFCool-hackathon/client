import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenUnitComponent } from './token-unit.component';

describe('TokenUnitComponent', () => {
  let component: TokenUnitComponent;
  let fixture: ComponentFixture<TokenUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
