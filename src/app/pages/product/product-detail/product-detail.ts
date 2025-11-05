import { Component, inject } from '@angular/core';
import { ProductResponse } from '../../../common/models/CommonInterfaces';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { Common } from '../../../services/common';
import { gymImages } from '../../../common/models/CommonInterfaces';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail {

  //Common Properties
  productDetail!:ProductResponse;
  productStockDetails!:any;
  stockForm!:FormGroup;
  showEditStockForm:boolean = false;

  constructor(
    private readonly commonService: Common,
    private readonly api: ApiUrlHelper,
    public dialogRef: MatDialogRef<ProductDetail>,
    private readonly formBuilder: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly spinner: NgxSpinnerService
  ) {
    this.productDetail = inject(MAT_DIALOG_DATA).productDetail;
    this.getProductStockDetails();
  }

  initializeForm(){
    this.stockForm = this.formBuilder.group({
      quantity: ['', Validators.required]
    });
  }

  closeDialog(result: boolean) {
    this.dialogRef.close(result);
  }

  handleImageError(event:any){
    const img = event.target as HTMLImageElement;
    img.src = gymImages[Math.floor(Math.random() * gymImages.length)];
  }

  getProductStockDetails(){
    let api = this.api.ProductStock.ProductStockDetail.replace("{Id}", this.productDetail.productID.toString());
    this.spinner.show();
    this.commonService.getData(api).pipe().subscribe({
      next:(response)=>{
        this.productStockDetails = response.data;
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        this.spinner.hide();
      }
    })
  }

  editStock(){
    this.showEditStockForm = true;
    this.initializeForm();
    if(this.productStockDetails){
      this.stockForm.patchValue({quantity: this.productStockDetails.quantity});
    }
  }

  updateStock(){
    if(this.stockForm.invalid){
      return;
    }
    let api = this.api.ProductStock.SaveProductStock;
    this.spinner.show();
    let requestedModel = {
      productID: this.productDetail.productID,
      quantity: this.stockForm.value.quantity,
      stockId: this.productStockDetails?.stockId || 0
    }
    this.commonService.postData(api, requestedModel).pipe().subscribe({
      next:(response)=>{
        if(response.success){
          this.toastr.success(response.message);
        }
        else{
          this.toastr.error(response.message);
        }
        this.showEditStockForm = false;
        this.getProductStockDetails();
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        this.spinner.hide();
      }
    });
  }
}
