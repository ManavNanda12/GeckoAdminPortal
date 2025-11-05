import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Common } from '../../../services/common';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss'
})
export class OrderList {

  // Common Properties
    orderList:any=[];
    displayedColumns: string[] = ['CustomerName','OrderNumber', 'OrderStatus', 'BillingAddress','DiscountAmount', 'TaxAmount','Total',
      'Actions'
    ];
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
      private readonly api: ApiUrlHelper
    ) {}
  
    ngOnInit(): void {
      this.getAllOrders();
    }
  
    onSearch(searchTerm:string){
      this.searchTerm = searchTerm;
      this.getAllOrders();
    }
  
      onPageChange(event:any){
      this.pageNumber = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.getAllOrders();
    }
  
    getAllOrders(){
      this.spinner.show();
      let api = this.api.Order.OrderList;
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
            this.orderList = response?.data;
            this.dataSource = this.orderList;
            this.totalRecords = response?.data[0]?.totalRecords;
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
