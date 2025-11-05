import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductResponse } from '../../../common/models/CommonInterfaces';
import { Common } from '../../../services/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagePreview } from '../../../common/models/CommonInterfaces';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-product-image',
  standalone: false,
  templateUrl: './add-update-product-image.html',
  styleUrl: './add-update-product-image.scss'
})
export class AddUpdateProductImage {

  imageForm!: FormGroup;
  imagePreviews: ImagePreview[] = [];
  isDragging = false;
  product!:ProductResponse;
  newImageCount:number = 0;

  constructor(private fb: FormBuilder,private api:ApiUrlHelper , 
    private dialogRef:MatDialogRef<AddUpdateProductImage>,
    private commonService:Common,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService
  ) {
    this.product = inject(MAT_DIALOG_DATA).product;
    this.imageForm = this.fb.group({});
    this.getProductImages();
  }

  onFilesSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.addFiles(files);
  }

  addFiles(files: File[]) {
  const total = this.imagePreviews.length + files.length;
  if (total > 5) {
    alert('You can upload up to 5 images only.');
    return;
  }

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const newImage: ImagePreview = {
        projectUrl: e.target.result,
        isPrimary: false,
        imageId: undefined,
        file: file
      };
      this.imagePreviews.push(newImage);
      this.newImageCount = this.imagePreviews.filter(img => !img.imageId && img.file).length;
    };
    reader.readAsDataURL(file);
  });
}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = Array.from(event.dataTransfer?.files || []);
    this.addFiles(files);
  }

 removeImage(index: number) {
  const imageToDelete = this.imagePreviews[index];
  
  Swal.fire({
    title: 'Delete this image?',
    html: `
      <div style="margin: 20px 0;">
        <img src="${imageToDelete.projectUrl}" 
             style="max-width: 100%; max-height: 250px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" 
             alt="Product Image">
      </div>
      <p style="color: #666; margin-top: 15px;">This action cannot be undone</p>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: '<i class="fa fa-trash"></i> Yes, delete it!',
    cancelButtonText: '<i class="fa fa-times"></i> Cancel',
    reverseButtons: true,
    customClass: {
      popup: 'animated fadeIn'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.spinner.show();
      
      let api = this.api.Product.DeleteProductImage;
      let requestedModel = {
        ImageId: imageToDelete.imageId,
        ProductId: this.product.productID
      };
      
      this.commonService.postData(api, requestedModel).subscribe({
        next: (response) => {
          if (response.success) {
            this.imagePreviews.splice(index, 1);
            
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: response.message,
              timer: 2000,
              showConfirmButton: false,
              customClass: {
                popup: 'animated fadeIn'
              }
            });
            
            this.getProductImages();
            this.newImageCount = this.imagePreviews.filter(img => !img.imageId && img.file).length;
          }
        },
        error: (error) => {
          console.log(error);
          this.spinner.hide();
          
          Swal.fire({
            icon: 'error',
            title: 'Failed to delete',
            text: 'Something went wrong. Please try again.'
          });
        },
        complete: () => {
          this.spinner.hide();
        }
      });
    }
  });
}

  clearAll() {
    this.imagePreviews = [];
  }

 submitImages() {
  const api = this.api.Product.SaveProductImage;
  const formData = new FormData();

  formData.append('ProductId', this.product.productID.toString());

  const newImages = this.imagePreviews.filter(img => !img.imageId && img.file);

  if (newImages.length === 0) {
    alert('No new images to upload.');
    return;
  }

  newImages.forEach((image) => {
    formData.append('ImageFile', image.file!); 
  });
  const primaryImage = this.imagePreviews.find(img => img.isPrimary);
  formData.append('IsPrimary', primaryImage?.isPrimary.toString() || 'false');

  formData.append('ImageUrl', '');

  this.commonService.postFormData(api, formData).subscribe({
    next: (response) => {
      if(response.success){
        this.toastr.success(response.message);
        this.dialogRef.close(true);
      }
    },
    error: (error) => {
      console.error('Upload failed:', error);
    }
  });
}


  getProductImages(){
    let api = this.api.Product.GetProductImage.replace("{Id}", this.product.productID.toString());
    this.commonService.getData(api).pipe().subscribe({
      next:(response)=>{
        if(response.data.length > 0){
           this.imagePreviews = response.data.map((image: any) => ({
            projectUrl: image.imageUrl,
            isPrimary: image.isPrimary ?? false,
            imageId: image.imageID
          }));
        }
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        this.spinner.hide();
      }
    })
  }

  closeDialog(result: boolean) {
    this.dialogRef.close(result);
  }

  setPrimaryImage(product:any) {
  Swal.fire({
    title: 'Make this image primary?',
    html: `
      <div style="margin: 20px 0;">
        <img src="${product.projectUrl}" 
             style="max-width: 100%; max-height: 250px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" 
             alt="Product Image">
      </div>
      <p style="color: #666; margin-top: 15px;">This action cannot be undone</p>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'rgba(17, 69, 174, 1)',
    cancelButtonColor: '#3085d6',
    confirmButtonText: '<i class="fa fa-check"></i> Yes, make it primary!',
    cancelButtonText: '<i class="fa fa-times"></i> Cancel',
    reverseButtons: true,
    customClass: {
      popup: 'animated fadeIn'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.spinner.show();
      
      let api = this.api.Product.SetPrimaryImage.replace('{Id}', product.imageId.toString());
      
      this.commonService.getData(api).subscribe({
        next: (response) => {
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Primary Image Set!',
              text: response.message,
              timer: 2000,
              showConfirmButton: false,
              customClass: {
                popup: 'animated fadeIn'
              }
            });
            
            this.getProductImages();
          }
        },
        error: (error) => {
          console.log(error);
          this.spinner.hide();
          
          Swal.fire({
            icon: 'error',
            title: 'Failed to set primary image',
            text: 'Something went wrong. Please try again.'
          });
        },
        complete: () => {
          this.spinner.hide();
        }
      });
    }
  });
  }

}
