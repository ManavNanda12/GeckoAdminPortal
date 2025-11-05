import { createFeatureSelector, createSelector } from '@ngrx/store';
import { categoryState } from '../reducers/category.reducer';

export const selectCategoryState = createFeatureSelector<categoryState>('category');

export const selectAllCategory = createSelector(
  selectCategoryState,
  (state) => state.category
);

export const selectLoading = createSelector(
  selectCategoryState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectCategoryState,
  (state) => state.error
);