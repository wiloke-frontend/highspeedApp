export const authSelector = (state: AppState) => state.auth;
export const isLoggedInSelector = (state: AppState) => state.auth.isLoggedIn;
export const userIdSelector = (state: AppState) => state.auth.data?.id;
export const userAvatarSelector = (state: AppState) => state.auth.data?.avatar ?? '';
export const userNameSelector = (state: AppState) => state.auth.data?.displayName;