export interface PostFavorite {
  success: string;
  isAdded: boolean;
}

export interface GetFavorite {
  success: string;
  data: { isMyFavorite: boolean };
}
