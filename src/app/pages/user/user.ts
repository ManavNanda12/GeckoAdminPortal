import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Common } from '../../services/common';
import { ApiUrlHelper } from '../../common/ApiUrlHelper';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModel } from '../../common/confirmation-model/confirmation-model';
import { AddEditUserModel } from './add-edit-user-model/add-edit-user-model';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.html',
  styleUrl: './user.scss'
})

export class User implements OnInit {

  // Common Properties
  userList:any=[];
  displayedColumns: string[] = ['Name', 'Email', 'CreatedOn', 'Actions'];
  dataSource = [];

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly toastr: ToastrService,
    private readonly commonService: Common,
    private readonly api: ApiUrlHelper,
    private readonly dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.spinner.show();
    let api = this.api.User.GetAllUsers;
    this.commonService.getData(api).subscribe({
      next:(response:any) =>{
        if(response?.success){
          this.userList = response?.data;
          this.dataSource = this.userList;
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

  deleteUser(userName:string,userId:number){
    let api = this.api.User.DeleteUser.replace('{Id}',userId.toString());
    this.dialog.open(ConfirmationModel,{
      data:{
        message:`Are you sure you want to delete ${userName}`,
        title:'Delete User'
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
            },
            error:(error:any)=>{
              this.toastr.error(error?.error?.message);
            },
            complete:()=>{
              this.getAllUsers();
              this.spinner.hide();
            }
          })
        }
      }
    })
  }

  addEditUser(userId:number){
   let dialogRef =  this.dialog.open(AddEditUserModel,{
      data:{
        userId
      },
      autoFocus:false,
      width:'400px',
      disableClose:true
    });
    dialogRef.afterClosed().subscribe({
      next:(response)=>{
        if(response){
          this.getAllUsers();
        }
      }
    })
  }

}
