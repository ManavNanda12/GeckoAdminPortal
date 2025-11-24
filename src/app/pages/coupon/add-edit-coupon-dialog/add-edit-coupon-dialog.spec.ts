import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCouponDialog } from './add-edit-coupon-dialog';

describe('AddEditCouponDialog', () => {
  let component: AddEditCouponDialog;
  let fixture: ComponentFixture<AddEditCouponDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditCouponDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCouponDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
