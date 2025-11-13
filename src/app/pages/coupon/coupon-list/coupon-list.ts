import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { Common } from '../../../services/common';

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



}
