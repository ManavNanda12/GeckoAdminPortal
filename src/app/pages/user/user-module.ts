import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEditUserModel } from './add-edit-user-model/add-edit-user-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path:'',
    component:User
  }
];


@NgModule({
  declarations: [
    User,
    AddEditUserModel
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class UserModule { }
