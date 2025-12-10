import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing-module';
import { OrderList } from './order-list/order-list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { OrderDetail } from './order-detail/order-detail';


@NgModule({
  declarations: [
    OrderList,
    OrderDetail
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class OrdersModule { }
