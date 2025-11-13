import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponRoutingModule } from './coupon-routing-module';
import { CouponList } from './coupon-list/coupon-list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    CouponList
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    NgxSpinnerModule,
    ToastrModule
  ]
})
export class CouponModule { }
