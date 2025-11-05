import { createAction, props } from '@ngrx/store';
import { ProductResponse } from '../../common/models/CommonInterfaces';


export const loadProducts = createAction(
    '[Products] Load Products',
    props<{searchTerm:string,sortColumn:string,sortDirection:string,pageNumber:number,pageSize:number}>()
)

export const loadProductsSuccess = createAction(
    '[Products] Load Products Success',
    props<{products:ProductResponse[]}>()
)

export const loadProductsFailure = createAction(
    '[Products] Load Products Failure',
    props<{error:any}>()
)

export const SaveProduct = createAction(
    '[Products] Save Product',
    props<{product:ProductResponse}>()
)

export const SaveProductSuccess = createAction(
    '[Products] Save Product Success',
    props<{productID:number,message:string,success:boolean}>()
)

export const SaveProductFailure = createAction(
    '[Products] Save Product Failure',
    props<{error:any}>()
)