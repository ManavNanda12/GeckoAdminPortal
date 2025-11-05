import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, defer, finalize, map, mergeMap, of, tap } from 'rxjs';
import { Common } from '../../services/common';
import * as ProductAction from '../actions/product.actions';
import { ApiUrlHelper } from '../../common/ApiUrlHelper';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private common: Common,
    private toastr: ToastrService,
    private api:ApiUrlHelper,
    private spinner:NgxSpinnerService
  ) {}

  loadProducts$ = createEffect(() =>
    defer(() => 
      this.actions$.pipe(
        ofType(ProductAction.loadProducts),
        tap(()=>this.spinner.show()),
        mergeMap(action => 
          this.common.postData(this.api.Product.ProductList, {
            searchTerm: action.searchTerm,
            sortColumn: action.sortColumn,
            sortDirection: action.sortDirection,
            pageNumber: action.pageNumber,
            pageSize: action.pageSize
          }).pipe(
            map(res => ProductAction.loadProductsSuccess({
              products: res.data
            })),
            catchError(err => {
              this.toastr.error(err.error.message);
              return of(ProductAction.loadProductsFailure({ error: err.error.message }));
            }),
            finalize(() => this.spinner.hide())
          )
        )
      )
    )
  );

  saveProduct$ = createEffect(()=>
    defer(()=>
        this.actions$.pipe(
            ofType(ProductAction.SaveProduct),
            tap(()=>this.spinner.show()),
            mergeMap(action=>
                this.common.postData(this.api.Product.SaveProduct,{
                    productID: action.product.productID,
                    productName: action.product.productName,
                    productDescription: action.product.productDescription,
                    categoryID: action.product.categoryID,
                    price: action.product.price,
                    sku: action.product.sku
                  }).pipe(
                    map(res=>ProductAction.SaveProductSuccess({productID:res.data,message:res.message,success:res.success})),
                    catchError(err=>{
                        this.toastr.error(err.error.message);
                        return of(ProductAction.SaveProductFailure({error:err.error.message}))
                    }),
                    finalize(() => this.spinner.hide())
                )
            )
        )
    )
  )
}