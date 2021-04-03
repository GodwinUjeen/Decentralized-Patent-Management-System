import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverComponent } from './dialog-over.component';

describe('DialogOverComponent', () => {
  let component: DialogOverComponent;
  let fixture: ComponentFixture<DialogOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
