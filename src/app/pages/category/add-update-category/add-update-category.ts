import { Component, inject } from '@angular/core';
import { CategoryResponse } from '../../../common/models/CommonInterfaces';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { Common } from '../../../services/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-category',
  standalone: false,
  templateUrl: './add-update-category.html',
  styleUrl: './add-update-category.scss',
})
export class AddUpdateCategory {
  //Common Properties
  selectedCategoryData!: CategoryResponse;
  parentCategoryList!: CategoryResponse[] | null;
  submitted: boolean = false;
  categoryForm!: FormGroup;
  isChildWhenAddCategory: boolean = false;
  imagePreview: string | null = null;
  imageFile: File | null = null;

  constructor(
    private readonly commonService: Common,
    private readonly api: ApiUrlHelper,
    public dialogRef: MatDialogRef<AddUpdateCategory>,
    private readonly formBuilder: FormBuilder,
    private readonly toastr: ToastrService
  ) {
    this.initializeForm();
    this.selectedCategoryData = inject(MAT_DIALOG_DATA).data.CategoryData;
    let isParentCategory = inject(MAT_DIALOG_DATA).data.isParentCategory;
    let allCategories = inject(MAT_DIALOG_DATA).data.allCategories;
    let isAddCategory = inject(MAT_DIALOG_DATA).data.isAddCategory;
    if(!isAddCategory){
      if (!isParentCategory) {
        this.parentCategoryList = allCategories.filter((x: CategoryResponse) => {
          return x.parentCategoryID === null;
        });
      }
      if (this.selectedCategoryData?.categoryId > 0) {
        this.categoryForm.patchValue({
          categoryName: this.selectedCategoryData.categoryName,
          parentCategoryID: this.selectedCategoryData.parentCategoryID,
          imageUrl: this.selectedCategoryData.imageUrl,
        });
        this.imagePreview = this.selectedCategoryData.imageUrl;
      }
    }
    else{
          this.parentCategoryList = allCategories.filter((x: CategoryResponse) => {
            return x.parentCategoryID === null;
          });
    }
  }

  initializeForm() {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      parentCategoryID: [null],
      imageUrl: ['', Validators.required],
      isChildCategory: [false],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.categoryForm.patchValue({ imageUrl: e.target.result });
        this.imageFile = file;
      };
      reader.readAsDataURL(file);
    }
  }
  
  removeImage(): void {
    this.imagePreview = null;
    this.categoryForm.patchValue({ imageUrl: '' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }

  submitCategoryForm() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    let formBody = new FormData();
    let categoryId:any = this.selectedCategoryData?.categoryId ?? 0;
    formBody.append("CategoryId", categoryId);
    formBody.append("CategoryName", this.categoryForm.value.categoryName ?? "");
    formBody.append("ParentCategoryId", this.categoryForm.value.parentCategoryID ?? 0);
    if (this.imageFile) {
      formBody.append("ImageFile", this.imageFile);
    }
    let api = this.api.Category.SaveCategory;
    this.commonService.postFormData(api,formBody).pipe().subscribe({
      next:(response)=>{
        if(response.success){
          this.dialogRef.close(true);
          this.toastr.success(response?.message);
        }
      },
      error:(error)=>{
        this.toastr.error(error?.error?.message);
      },
      complete:()=>{
        this.dialogRef.close(true);
      }
    })
  }
}
