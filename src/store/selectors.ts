import { createSelector } from 'reselect';

export const categoriesSelector = (state: AppState) => state.categories;
export const categoriesSelectedSelector = (state: AppState) => state.categoriesSelected;
export const categoriesSelectedIdsSelector = createSelector(categoriesSelectedSelector, categoriesSelected =>
  categoriesSelected.data.map(item => item.id),
);
export const authSelector = (state: AppState) => state.auth;
export const isLoggedInSelector = (state: AppState) => state.auth.isLoggedIn;
export const userIdSelector = (state: AppState) => state.auth.data?.id;
export const userAvatarSelector = (state: AppState) => state.auth.data?.avatar ?? '';
export const userNameSelector = (state: AppState) => state.auth.data?.displayName;
export const i18nSelector = (state: AppState) => state.i18n;
export const tabNavigatorSelector = (state: AppState) => state.tabNavigator;
export const nightModeSelector = (state: AppState) => state.nightMode;
