import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productState } from '../reducers/product.reducer';

export const selectProductsState = createFeatureSelector<productState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectProductsState,
  (state) => state.error
);