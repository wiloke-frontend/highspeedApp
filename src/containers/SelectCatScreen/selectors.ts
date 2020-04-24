export const postsWithCatSelectedSelector = (state: AppState) => state.postsWithCatSelected;
export const pageSelector = (state: AppState) => postsWithCatSelectedSelector(state).data?.pagination?.next?.params?.page;
export const maxNumPagesSelector = (state: AppState) => postsWithCatSelectedSelector(state).data.pagination?.maxNumPages;
