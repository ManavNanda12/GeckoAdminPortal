import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Common } from '../../../services/common';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-coupon-dialog',
  standalone: false,
  templateUrl: './add-edit-coupon-dialog.html',
  styleUrl: './add-edit-coupon-dialog.scss'
})
export class AddEditCouponDialog {

   // Common Properties
  couponData!: any;
  couponForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddEditCouponDialog>,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly commonService:Common,
    private readonly api:ApiUrlHelper,
    private readonly toastr:ToastrService
  ) {
    this.couponData = inject(MAT_DIALOG_DATA).couponData;
  }

  ngOnInit(): void {
    this.couponForm = this.formBuilder.group({
      couponName: ['', Validators.required],
      couponCode: ['', Validators.required],
      description: ['', Validators.required],
      discountType: ['', Validators.required],
      discountValue: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxUsageCount: ['', Validators.required],
      maxUsagePerUser: ['', Validators.required],
    });
    if(this.couponData?.couponId > 0){
      this.couponForm.patchValue({
        couponName:this.couponData?.couponName,
        couponCode:this.couponData?.couponCode,
        description:this.couponData?.description,
        discountType:this.couponData?.discountType,
        discountValue:this.couponData?.discountValue,
        startDate:this.couponData?.startDate,
        endDate:this.couponData?.endDate,
        maxUsageCount:this.couponData?.maxUsageCount,
        maxUsagePerUser:this.couponData?.maxUsagePerUser
      });
    }
  }

  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }

  submitCouponForm(){
    this.submitted = true;
    if(this.couponForm.invalid){
      return;
    }
    let requestedModel = {
      couponId:this.couponData?.couponId ?? 0,
      couponName:this.couponForm.get('couponName')?.value,
      couponCode:this.couponForm.get('couponCode')?.value,
      description:this.couponForm.get('description')?.value,
      discountType:this.couponForm.get('discountType')?.value,
      discountValue:this.couponForm.get('discountValue')?.value,
      startDate:this.couponForm.get('startDate')?.value,
      endDate:this.couponForm.get('endDate')?.value,
      maxUsageCount:this.couponForm.get('maxUsageCount')?.value,
      maxUsagePerUser:this.couponForm.get('maxUsagePerUser')?.value
    }
    this.spinner.show();
    let api = this.api.Coupon.SaveCoupon;
    this.commonService.postData(api,requestedModel).subscribe({
      next:(response:any) =>{
        if(response?.success){
          this.toastr.success(response?.message);
          this.dialogRef.close(true);
        }
      },
      error:(error:any) =>{
        this.toastr.error(error?.error?.message);
      },
      complete:() =>{
        this.spinner.hide();
      }
    })
   
  }

}
