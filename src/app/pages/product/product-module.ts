import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing-module';
import { ProductList } from './product-list/product-list';
import { MatCardModule } from '@angular/material/card';
import { ProductDetail } from './product-detail/product-detail';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddUpdateProduct } from './add-update-product/add-update-product';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AddUpdateProductImage } from './add-update-product-image/add-update-product-image';

@NgModule({
  declarations: [
    ProductList,
    ProductDetail,
    AddUpdateProduct,
    AddUpdateProductImage
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule ,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ]
})
export class ProductModule { }
