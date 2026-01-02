import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Common } from '../../../services/common';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-coupon-detail-dialog',
  standalone: false,
  templateUrl: './coupon-detail-dialog.html',
  styleUrl: './coupon-detail-dialog.scss'
})
export class CouponDetailDialog {

     // Common Properties
  couponId!: any;
  couponDetails:any =[];

  constructor(
    public dialogRef: MatDialogRef<CouponDetailDialog>,
    private readonly commonService:Common,
    private readonly api:ApiUrlHelper,
    private readonly spinner:NgxSpinnerService
  ) {
    this.couponId = inject(MAT_DIALOG_DATA).couponId;
    this.getCouponDetails();
  }

  getCouponDetails(){
    this.spinner.show();
    let api = this.api.Coupon.CouponDetails.replace('{CouponId}',this.couponId);
    this.commonService.getData(api).pipe().subscribe({
      next:(response)=>{
        if(response.success){
          this.couponDetails = response.data;
        }
      },
      error:(err)=>{
        console.log(err);
      },
       complete:() =>{
        this.spinner.hide();
      }
    })
  }

  closeDialog(){
    this.dialogRef.close(true);
  }


}
