import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { Common } from '../../../services/common';

@Component({
  selector: 'app-contact-us-reply-dialog',
  standalone: false,
  templateUrl: './contact-us-reply-dialog.html',
  styleUrl: './contact-us-reply-dialog.scss'
})
export class ContactUsReplyDialog {

  // Common Properties
  customerData:any;
  replyForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ContactUsReplyDialog>,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly commonService:Common,
    private readonly api:ApiUrlHelper,
    private readonly toastr:ToastrService
  ) {
    this.customerData = inject(MAT_DIALOG_DATA).customerData;
  }

  ngOnInit(): void {
    this.replyForm = this.formBuilder.group({
      adminMessage: ['', Validators.required]
    });
  }

  submitReply() {
    this.submitted = true;
    if (this.replyForm.valid) {
      this.submitted = false;
      this.spinner.show();
      let requestedModel = {
        ContactUsId: this.customerData?.contactUsId,
        AdminMessage: this.replyForm.value.adminMessage,
        CustomerName: this.customerData?.customerName,
        CustomerEmail: this.customerData?.customerEmail,
        ContactSubject: this.customerData?.contactSubject,
        CustomerMessage: this.customerData?.customerMessage
      }
      let api = this.api.ContactUs.SaveContactUs;
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

  closeDialog(result:any){
    this.dialogRef.close(result);
  }


}
