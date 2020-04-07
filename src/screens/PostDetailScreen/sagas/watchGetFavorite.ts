import fetchAPI from 'utils/functions/fetchAPI';
import { getFavorite } from '../actions/actionPostDetail';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { GetFavorite } from 'api/Favorite';
import { takeLatest, put, call } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';

function* handleGetFavorite({ payload }: ReturnType<typeof getFavorite.request>) {
  try {
    const res: AxiosResponse<GetFavorite> = yield call(fetchAPI.request, {
      url: payload.endpoint,
      params: {
        postID: payload.postID,
      },
    } as AxiosRequestConfig);
    yield put(
      getFavorite.success({
        isAdded: res.data.data.isMyFavorite,
        postEndpoint: payload.postEndpoint,
      }),
    );
  } catch (err) {
    console.log(err.response);
    yield put(
      getFavorite.failure({
        message: 'Error',
        postEndpoint: payload.postEndpoint,
      }),
    );
  }
}

export function* watchGetFavorite() {
  yield takeLatest(getActionType(getFavorite.request), handleGetFavorite);
}
