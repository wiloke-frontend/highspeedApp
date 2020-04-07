export const postsWithParamsSelector = (state: AppState) => state.postsWithParams;
export const pageSelector = (state: AppState) => postsWithParamsSelector(state).data?.pagination?.next?.params?.page;
export const maxNumPagesSelector = (state: AppState) => postsWithParamsSelector(state).data.pagination?.maxNumPages;
