import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { Common } from '../../../services/common';
import { ContactUsReplyDialog } from '../contact-us-reply-dialog/contact-us-reply-dialog';
import { ConfirmationModel } from '../../../common/confirmation-model/confirmation-model';

@Component({
  selector: 'app-contact-us-list',
  standalone: false,
  templateUrl: './contact-us-list.html',
  styleUrl: './contact-us-list.scss'
})
export class ContactUsList {

  // Common Properties
  contactUsList:any=[];
  displayedColumns: string[] = ['CustomerName', 'CustomerEmail','ContactSubject','CustomerMessage','AdminMessage', 'Actions'];
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
    let api = this.api.ContactUs.ContactUsList;
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
          this.contactUsList = response?.data;
          this.dataSource = this.contactUsList;
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

  replyToCustomer(customerData:any){
   let dialogRef =  this.dialog.open(ContactUsReplyDialog, {
      data: { customerData: customerData },
      width: '600px',
      height: 'auto',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result:any)=>{
      if(result){
        this.getAllCustomers();
      }
    })
  }

   deleteContactUsRequest(customerName:string,contactUsId:number){
        let api = this.api.ContactUs.DeleteContactUsRequest.replace('{Id}',contactUsId.toString());
        this.dialog.open(ConfirmationModel,{
          data:{
            message:`Are you sure you want to delete ${customerName}`,
            title:'Delete Contact Us Request'
          },
          autoFocus:false,
          width:'400px',
          disableClose:true
        }).afterClosed().subscribe({
          next:(response)=>{
            if(response){
              this.spinner.show();
              this.commonService.deleteData(api).subscribe({
                next:(response:any)=>{
                  if(response.success){
                    this.toastr.success(response?.message);
                  }
                  else{
                    this.toastr.error(response?.message);
                  }
                },
                error:(error:any)=>{
                  this.toastr.error(error?.error?.message);
                },
                complete:()=>{
                  this.getAllCustomers();
                  this.spinner.hide();
                }
              })
            }
          }
        })
      }

}
