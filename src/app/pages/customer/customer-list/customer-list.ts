import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Common } from '../../../services/common';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCustomerDialog } from '../add-edit-customer-dialog/add-edit-customer-dialog';

@Component({
  selector: 'app-customer-list',
  standalone: false,
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss'
})
export class CustomerList implements OnInit {

   // Common Properties
  customerList:any=[];
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email','MobileNumber', 'Actions'];
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
    let api = this.api.Customer.CustomerList;
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
          this.customerList = response?.data;
          this.dataSource = this.customerList;
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

  addEditCustomer(customerData:any){
   const dialogRef =  this.dialog.open(AddEditCustomerDialog, {
      data: { customerData },
      width:'500px',
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result){
        this.getAllCustomers();
      }
    });
  }

}
