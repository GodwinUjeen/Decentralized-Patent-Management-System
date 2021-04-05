import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensTransferedComponent } from './tokens-transfered.component';

describe('TokensTransferedComponent', () => {
  let component: TokensTransferedComponent;
  let fixture: ComponentFixture<TokensTransferedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokensTransferedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokensTransferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
