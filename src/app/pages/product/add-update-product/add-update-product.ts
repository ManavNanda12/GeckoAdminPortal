import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { Common } from '../../../services/common';
import { CategoryResponse, ProductResponse } from '../../../common/models/CommonInterfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app-module';
import * as ProductAction from '../../../store/actions/product.actions';
@Component({
  selector: 'app-add-update-product',
  standalone: false,
  templateUrl: './add-update-product.html',
  styleUrl: './add-update-product.scss'
})
export class AddUpdateProduct implements OnInit {

  // Common Properties
  productId:number = 0;
  productForm!:FormGroup;
  submitted:boolean = false;
  productDetail!:ProductResponse;
  categories!:CategoryResponse[];

  constructor(
    private common:Common,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private api:ApiUrlHelper,
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<AddUpdateProduct>,
    private store: Store<AppState>
  ) { 
    if(inject(MAT_DIALOG_DATA)?.product){
      this.productId = inject(MAT_DIALOG_DATA).product.productID;
      this.productDetail = inject(MAT_DIALOG_DATA).product;
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getCategories();
    if(this.productId > 0){
      this.patchFormValue();
    }
  }

  initializeForm(){
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      categoryId: ['', Validators.required],
      price: ['', Validators.required],
      sku:['',Validators.required]   
    });
  }

  patchFormValue(){
    this.productForm.patchValue({
      productName: this.productDetail.productName,
      productDescription: this.productDetail.productDescription,
      categoryId: this.productDetail.categoryID,
      price: this.productDetail.price,
      sku: this.productDetail.sku
    });
  }

  closeDialog(result: boolean) {
    this.dialogRef.close(result);
  }

  submitProductForm(){
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.store.dispatch(ProductAction.SaveProduct({
      product: {
        productID: this.productId,
        productName: this.productForm.value.productName,
        productDescription: this.productForm.value.productDescription,
        categoryID: this.productForm.value.categoryId,
        price: this.productForm.value.price,
        sku: this.productForm.value.sku,
        productImage: null,
        totalRecords: 0
      }
    }));
    this.store.select(state => state.products.message).subscribe(message => {
      if (message) {
        this.toastr.success(message);
        this.dialogRef.close(true);
        this.spinner.hide();
      }
    });
  }

  getCategories(){
   let api = this.api.Category.CategoryList;
   this.spinner.show();
   this.common.getData(api).pipe(
    tap((response) => {
      if (response.success) {
        this.categories = response.data;
      }
    }),
    finalize(() => this.spinner.hide())
   ).subscribe();  
  }

  

}
