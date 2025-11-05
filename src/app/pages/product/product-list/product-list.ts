import { Component, OnInit } from '@angular/core';
import { gymImages, ProductResponse } from '../../../common/models/CommonInterfaces';
import { Common } from '../../../services/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateProduct } from '../add-update-product/add-update-product';
import { ProductDetail } from '../product-detail/product-detail';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app-module';
import { selectAllProducts, selectLoading } from '../../../store/selectors/product.selector';
import * as ProductAction from '../../../store/actions/product.actions';
import { map, Observable } from 'rxjs';
import { AddUpdateProductImage } from '../add-update-product-image/add-update-product-image';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {

  // Common Properties
  productList$!:Observable<ProductResponse[]>;
  loading$!:Observable<boolean>;
  searchTerm:string = "";
  sortColumn:string = "";
  sortDirection:string = "";
  pageNumber:number = 1;
  pageSize:number = 10;
  totalRecords:number = 0;

  constructor(
    private common:Common,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private api:ApiUrlHelper,
    private dialog:MatDialog,
    private store: Store<AppState>
  ) { }
  
  ngOnInit(): void {
    this.productList$ = this.store.select(selectAllProducts);
    this.productList$.pipe(map(data => data[0]?.totalRecords)).subscribe(data => this.totalRecords = data);
    this.loading$ = this.store.select(selectLoading);
    this.getAllProducts();
  }

  handleImageError(event:any){
    const img = event.target as HTMLImageElement;
    img.src = gymImages[Math.floor(Math.random() * gymImages.length)];
  }

  onSearch(searchTerm:string){
    this.searchTerm = searchTerm;
    this.getAllProducts();
  }

  onPageChange(event:any){
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllProducts();
  }

  getAllProducts(){
    this.store.dispatch(ProductAction.loadProducts({
      searchTerm: this.searchTerm,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }));
  }

  addeditProduct(product:ProductResponse | null){
    const dialogRef = this.dialog.open(AddUpdateProduct, {
      data: { 
        product: product 
      },
      autoFocus:false,
      width:'600px',
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllProducts();
      }
    });
  }

  getProductDetail(product:ProductResponse){
    this.dialog.open(ProductDetail,{
      data:{
        productDetail:product
      },
      autoFocus:false,
      width:'600px',
      disableClose:true
    })  
  }

  getProductImage(product:ProductResponse){
    const dialogRef =  this.dialog.open(AddUpdateProductImage,{
      data:{
        product:product
      },
      autoFocus:false,
      maxWidth:'100vw',
      width:'900px',
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllProducts();
      }
    });
  }

}
