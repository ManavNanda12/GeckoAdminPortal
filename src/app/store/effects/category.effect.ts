import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, defer, finalize, map, mergeMap, of, tap } from 'rxjs';
import { Common } from '../../services/common';
import * as CategoryAction from '../actions/category.action';
import { ApiUrlHelper } from '../../common/ApiUrlHelper';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class CategoryEffects {

  constructor(
    private actions$: Actions,
    private common: Common,
    private toastr: ToastrService,
    private api:ApiUrlHelper,
    private spinner:NgxSpinnerService
  ) {}

    loadCategory$ = createEffect(() =>
      defer(() => 
        this.actions$.pipe(
          ofType(CategoryAction.loadCategory),
          tap(()=>this.spinner.show()),
          mergeMap(action => 
            this.common.getData(this.api.Category.CategoryList).pipe(
              map(res => CategoryAction.LoadCategorySuccess({
                category: res.data
              })),
              catchError(err => {
                this.toastr.error(err.error.message);
                return of(CategoryAction.LoadCategoryFailure({ error: err.error.message }));
              }),
              finalize(() => this.spinner.hide())
            )
          )
        )
      )
    );
  


    
    saveCategory$ = createEffect(()=>
      defer(()=>
          this.actions$.pipe(
              ofType(CategoryAction.SaveCategory),
              tap(()=>this.spinner.show()),
              mergeMap(action=>
                  this.common.postData(this.api.Category.SaveCategory,{
                      categoryID: action.category.categoryId,
                      categoryName: action.category.categoryName
                    }).pipe(
                      map(res=>CategoryAction.SaveCategorySuccess({categoryID:res.data,message:res.message,success:res.success})),
                      catchError(err=>{
                          this.toastr.error(err.error.message);
                          return of(CategoryAction.SaveCategoryFailure({error:err.error.message}))
                      }),
                      finalize(() => this.spinner.hide())
                  )
              )
          )
      )
    )



}