import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Common } from '../../../services/common';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { ToastrService } from 'ngx-toastr';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-edit-user-model',
  standalone: false,
  templateUrl: './add-edit-user-model.html',
  styleUrl: './add-edit-user-model.scss',
})
export class AddEditUserModel {
  // Common Properties
  userId!: number;
  userForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddEditUserModel>,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly commonService:Common,
    private readonly api:ApiUrlHelper,
    private readonly toastr:ToastrService
  ) {
    this.userId = inject(MAT_DIALOG_DATA).userId;
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
    });
    if(this.userId > 0){
      this.getUserById();
    }
  }

  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }

  submitUserForm() {
    this.submitted = true;
    if (this.userForm.valid) {
      this.submitted = false;
      this.spinner.show();
      let requestedModel = {
        UserId: this.userId | 0,
        UserName:this.userForm.value.userName,
        UserEmail:this.userForm.value.userEmail
      }
      let api = this.api.User.SaveUser;
      this.commonService.postData(api,requestedModel).subscribe({
        next:(response:any)=>{
          if(response?.success){
            this.dialogRef.close(true);
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
          this.spinner.hide();
        }
      })
    }
  }

  getUserById() {
    this.spinner.show();
    let api = this.api.User.GetUserById.replace('{Id}',this.userId.toString());
    this.commonService.getData(api).subscribe({
      next:(response:any) =>{
        if(response?.success){
          this.userForm.patchValue({
            userName:response?.data?.userName,
            userEmail:response?.data?.userEmail
          });
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
