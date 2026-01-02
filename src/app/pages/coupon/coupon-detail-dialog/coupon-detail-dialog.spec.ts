import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDetailDialog } from './coupon-detail-dialog';

describe('CouponDetailDialog', () => {
  let component: CouponDetailDialog;
  let fixture: ComponentFixture<CouponDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouponDetailDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponDetailDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
