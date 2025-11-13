import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing-module';
import { ContactUsList } from './contact-us-list/contact-us-list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ContactUsReplyDialog } from './contact-us-reply-dialog/contact-us-reply-dialog';


@NgModule({
  declarations: [
    ContactUsList,
    ContactUsReplyDialog
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
  ]
})
export class ContactUsModule { }
