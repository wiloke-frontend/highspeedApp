import { createSelector } from 'reselect';

export const categoriesSelector = (state: AppState) => state.categories;
export const categoriesSelectedSelector = (state: AppState) => state.categoriesSelected;
export const categoriesSelectedIdsSelector = createSelector(categoriesSelectedSelector, categoriesSelected =>
  categoriesSelected.data.map(item => item.id),
);
