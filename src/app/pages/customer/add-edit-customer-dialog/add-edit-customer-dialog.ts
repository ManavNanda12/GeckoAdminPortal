import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Common } from '../../../services/common';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-customer-dialog',
  standalone: false,
  templateUrl: './add-edit-customer-dialog.html',
  styleUrl: './add-edit-customer-dialog.scss'
})
export class AddEditCustomerDialog {

   // Common Properties
  customerData!: any;
  customerForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddEditCustomerDialog>,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly commonService:Common,
    private readonly api:ApiUrlHelper,
    private readonly toastr:ToastrService
  ) {
    this.customerData = inject(MAT_DIALOG_DATA).customerData;
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
    });
    if(this.customerData?.customerId > 0){
      this.customerForm.patchValue({
        firstName:this.customerData?.firstName,
        lastName:this.customerData?.lastName,
        email:this.customerData?.email,
        mobileNumber:this.customerData?.contactNumber
      });
    }
  }

  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }

  submitCustomerForm() {
    this.submitted = true;
    if (this.customerForm.valid) {
      this.submitted = false;
      this.spinner.show();
      let requestedModel = {
        CustomerId: this.customerData?.customerId | 0,
        FirstName:this.customerForm.value.firstName,
        LastName:this.customerForm.value.lastName,
        Email:this.customerForm.value.email,
        ContactNumber:this.customerForm.value.mobileNumber,
        CountryCode:'91'
      }
      let api = this.api.Customer.SaveCustomer;
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

}
