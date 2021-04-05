import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensSharedComponent } from './tokens-shared.component';

describe('TokensSharedComponent', () => {
  let component: TokensSharedComponent;
  let fixture: ComponentFixture<TokensSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokensSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokensSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
