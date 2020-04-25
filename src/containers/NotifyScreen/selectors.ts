export const notificationsSelector = (state: AppState) => state.notifications;
export const pageSelector = (state: AppState) => notificationsSelector(state).data?.pagination?.next?.params?.page;
export const maxNumPagesSelector = (state: AppState) => notificationsSelector(state).data.pagination?.maxNumPages;
