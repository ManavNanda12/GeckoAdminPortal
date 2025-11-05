import { createReducer, on } from '@ngrx/store';
import { CategoryResponse } from '../../common/models/CommonInterfaces';
import * as CategoryAction from '../actions/category.action';
import { productState } from './product.reducer';
import { Actions } from '@ngrx/effects';

export interface categoryState{
    categoryID:number;
    message:string;
    success:boolean;
    category:CategoryResponse[];
    loading:boolean;
    error:any;
}

export const initialState:categoryState = {
    categoryID:0,
    message:'',
    success:false,
    category:[],
    loading:false,
    error:null
}

export const categoryReducer = createReducer(

    initialState,
    on(CategoryAction.loadCategory,(state)=>{
        return{
            ...state,
            loading:true
        }
    }),

    on(CategoryAction.LoadCategorySuccess,(state,{category})=>{
        return{
            ...state,
            loading:false,
            category:category
        }
    }),

    on(CategoryAction.LoadCategoryFailure,(state)=>{
        return{
            ...state,
            loading:false,
            error:state.error
        }
    }),

    on(CategoryAction.SaveCategory,(state)=>{
        return{
            ...state,
            loading:true
        }
    }),

    on(CategoryAction.SaveCategorySuccess,(state,{categoryID,message,success})=>{
        return{
            ...state,
            loading:false,
            success:success,
            categoryID:categoryID,
            message:message
        }
    }),

    on(CategoryAction.SaveCategoryFailure,(state,{error})=>{
        return{
            ...state,
            loading:false,
            error:error
        }
    })
)
