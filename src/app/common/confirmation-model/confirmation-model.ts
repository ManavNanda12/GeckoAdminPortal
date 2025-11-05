import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-model',
  standalone: false,
  templateUrl: './confirmation-model.html',
  styleUrl: './confirmation-model.scss'
})
export class ConfirmationModel {

  // Common Properties
  title!:string;
  message!:string;

  constructor(public dialogRef: MatDialogRef<ConfirmationModel>){
    this.title = inject(MAT_DIALOG_DATA).title;
    this.message = inject(MAT_DIALOG_DATA).message;
  }

  closeDialog(result:boolean):void{
    this.dialogRef.close(result);
  }

}
