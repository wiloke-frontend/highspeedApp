import { createSelector } from 'reselect';

export const tabNavigatorSelector = (state: AppState) => state.tabNavigator;
export const tabNavigatorHasSearchSelector = createSelector(tabNavigatorSelector, tabNavigator => {
  return tabNavigator.data.filter(item => item.screen === 'SearchNavigator').length > 0;
});
