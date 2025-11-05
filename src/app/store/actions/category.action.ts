import { createAction, props } from '@ngrx/store';
import { CategoryResponse } from '../../common/models/CommonInterfaces';

export const loadCategory = createAction(
    '[Category] Load Category'
);

export const LoadCategorySuccess = createAction(
    '[Category] Load Category Success',
    props<{category:CategoryResponse[]}>()
)

export const LoadCategoryFailure = createAction(
    '[Category] Load Category Failure',
    props<{error:any}>()
)

export const SaveCategory = createAction(
    '[Category] Save Category',
    props<{category:CategoryResponse}>()
)

export const SaveCategorySuccess = createAction(
    '[Category] Save Category Success',
    props<{categoryID:number,message:string,success:boolean}>()
)

export const SaveCategoryFailure = createAction(
    '[Category] Save Category Failure',
    props<{error:any}>()
)

