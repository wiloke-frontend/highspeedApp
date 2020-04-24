import { getPostDetail, getFavorite, postFavorite, postView } from 'containers/PostDetailScreen/actions/actionPostDetail';
import { PostDetail } from 'api/PostDetail';
import { createReducer, handleAction, ActionTypes, handleActions } from 'utils/functions/reduxActions';

type PostDetailAction = ActionTypes<typeof getPostDetail | typeof getFavorite | typeof postFavorite | typeof postView>;

interface PostDetailState {
  [endpoint: string]: ReducerState<Partial<PostDetail['data']>> & {
    isFavoriteLoading?: boolean;
  };
}

const initialState: PostDetailState = {};

export const postDetails = createReducer<PostDetailState, PostDetailAction>(initialState, [
  handleAction('@getPostDetailRequest', (state, action) => ({
    ...state,
    [action.payload]: {
      ...state[action.payload],
      status: 'loading',
    },
  })),
  handleAction('@getPostDetailSuccess', (state, action) => ({
    ...state,
    [action.payload.endpoint]: {
      status: 'success',
      data: action.payload.data.data,
      message: '',
    },
  })),
  handleAction('@getPostDetailFailure', (state, action) => ({
    ...state,
    [action.payload.endpoint]: {
      status: 'failure',
      data: {},
      message: action.payload.message,
    },
  })),
  handleAction('@postFavoriteRequest', (state, action) => ({
    ...state,
    [action.payload.postEndpoint]: {
      ...state[action.payload.postEndpoint],
      isFavoriteLoading: true,
    },
  })),
  handleActions(['@postFavoriteSuccess', '@getFavoriteSuccess'], (state, action) => ({
    ...state,
    [action.payload.postEndpoint]: {
      ...state[action.payload.postEndpoint],
      isFavoriteLoading: false,
      data: {
        ...state[action.payload.postEndpoint].data,
        isMyFavorite: action.payload.isAdded,
        favoriteCount:
          action.type === '@postFavoriteSuccess'
            ? action.payload.isAdded
              ? (state[action.payload.postEndpoint].data.favoriteCount ?? 0) + 1
              : (state[action.payload.postEndpoint].data.favoriteCount ?? 0) - 1
            : state[action.payload.postEndpoint].data.favoriteCount,
      },
    },
  })),
  handleAction('@postFavoriteFailure', (state, action) => ({
    ...state,
    [action.payload.postEndpoint]: {
      ...state[action.payload.postEndpoint],
      isFavoriteLoading: false,
    },
  })),
  handleAction('@postViewSuccess', (state, action) => ({
    ...state,
    [action.payload.postEndpoint]: {
      ...state[action.payload.postEndpoint],
      data: {
        ...state[action.payload.postEndpoint].data,
        viewCount: (state[action.payload.postEndpoint].data.viewCount ?? 0) + 1,
      },
    },
  })),
]);
