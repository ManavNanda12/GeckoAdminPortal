import { createReducer, on } from '@ngrx/store';
import { ProductResponse } from '../../common/models/CommonInterfaces';
import * as ProductAction from '../actions/product.actions';

export interface productState{
    productID:number;
    message:string;
    success:boolean;
    products:ProductResponse[];
    loading:boolean;
    error:any;
}

export const initialState:productState = {
    productID:0,
    message:'',
    success:false,
    products:[],
    loading:false,
    error:null
}

export const productReducer = createReducer(

    initialState,
    on(ProductAction.loadProducts,(state,{searchTerm,sortColumn,sortDirection,pageNumber,pageSize})=>{
        return{
            ...state,
            loading:true
        }
    }),

    on(ProductAction.loadProductsSuccess,(state,{products})=>{
        return{
            ...state,
            loading:false,
            products:products
        }
    }),

    on(ProductAction.loadProductsFailure,(state,{error})=>{
        return{
            ...state,
            loading:false,
            error:error
        }
    }),

    on(ProductAction.SaveProduct,(state,{product})=>{
        return{
            ...state,
            loading:true
        }
    }),

    on(ProductAction.SaveProductSuccess, (state, { productID,message,success }) => ({
        ...state,
        loading: false,
        success:true,
        productID: productID,
        message:message
      })),
    
      on(ProductAction.SaveProductFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
      }))
)