import fetchAPI from 'utils/functions/fetchAPI';
import { postFavorite } from '../actions/actionPostDetail';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { PostFavorite } from 'api/Favorite';
import { takeLeading, put, call } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';

function* handlePostFavorite({ payload }: ReturnType<typeof postFavorite.request>) {
  try {
    const res: AxiosResponse<PostFavorite> = yield call(fetchAPI.request, {
      method: 'POST',
      url: payload.endpoint,
      params: {
        postID: payload.postID,
      },
    } as AxiosRequestConfig);
    yield put(
      postFavorite.success({
        isAdded: res.data.isAdded,
        postEndpoint: payload.postEndpoint,
      }),
    );
    payload.callback?.(res.data.isAdded);
  } catch (err) {
    console.log(err.response);
    yield put(
      postFavorite.failure({
        message: 'Error',
        postEndpoint: payload.postEndpoint,
      }),
    );
  }
}

export function* watchPostFavorite() {
  yield takeLeading(getActionType(postFavorite.request), handlePostFavorite);
}
