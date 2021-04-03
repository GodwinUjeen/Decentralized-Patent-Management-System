import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePatentComponent } from './create-patent.component';

describe('CreatePatentComponent', () => {
  let component: CreatePatentComponent;
  let fixture: ComponentFixture<CreatePatentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePatentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
