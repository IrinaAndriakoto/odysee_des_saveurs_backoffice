import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishDialog } from './dish-dialog';

describe('DishDialog', () => {
  let component: DishDialog;
  let fixture: ComponentFixture<DishDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
