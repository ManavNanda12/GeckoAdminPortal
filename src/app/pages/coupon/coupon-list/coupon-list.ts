import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { Common } from '../../../services/common';
import { AddEditCouponDialog } from '../add-edit-coupon-dialog/add-edit-coupon-dialog';
import { CouponDetailDialog } from '../coupon-detail-dialog/coupon-detail-dialog';

@Component({
  selector: 'app-coupon-list',
  standalone: false,
  templateUrl: './coupon-list.html',
  styleUrl: './coupon-list.scss'
})
export class CouponList {

  // Common Properties
  couponList:any=[];
  displayedColumns: string[] = ['CouponName', 'CouponCode','DiscountType','DiscountValue','StartDate','EndDate','MaxUsageCount','UsageCount','MaxUsagePerUser','IsActive', 'Actions'];
  dataSource = [];
  searchTerm:string = '';
  sortColumn:string = '';
  sortDirection:string = '';
  pageNumber:number = 1;
  pageSize:number = 10;
  totalRecords:number = 0;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly toastr: ToastrService,
    private readonly commonService: Common,
    private readonly api: ApiUrlHelper,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }

  onSearch(searchTerm:string){
    this.searchTerm = searchTerm;
    this.getAllCustomers();
  }

  onPageChange(event:any){
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllCustomers();
  }

  getAllCustomers(){
    this.spinner.show();
    let api = this.api.Coupon.CouponList;
    let requestedModel = {
      searchTerm: this.searchTerm,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }
    this.commonService.postData(api,requestedModel).subscribe({
      next:(response:any) =>{
        if(response?.success){
          this.couponList = response?.data;
          this.dataSource = this.couponList;
          this.totalRecords = response?.data[0]?.totalRecords;
          this.toastr.success(response?.message);
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

  addEditCoupon(couponId:number){
    let dialogref = this.dialog.open(AddEditCouponDialog, {
      data: { couponId: couponId },
      width:'00px',
      maxWidth:'700px',
    });
    dialogref.afterClosed().subscribe((result:any) => {
      if(result){
        this.getAllCustomers();
      }
    });
  }

   couponDetail(couponId:number){
    let dialogref = this.dialog.open(CouponDetailDialog, {
      data: { couponId: couponId },
      width:'800px',
      maxWidth:'800px'
    });
    dialogref.afterClosed().subscribe((result:any) => {
      if(result){
        this.getAllCustomers();
      }
    });
  }


}
