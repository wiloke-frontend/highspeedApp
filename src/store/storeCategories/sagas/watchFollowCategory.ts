import { followCategory } from '../actions/actionFollowCategory';
import fetchAPI from 'utils/functions/fetchAPI';
import { takeLatest, put, call } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import { AxiosRequestConfig } from 'axios';

function* handleFollowCategory({ payload }: ReturnType<typeof followCategory.request>) {
  try {
    yield call(fetchAPI.request, {
      method: 'POST',
      url: payload.endpoint,
      data: {
        categories: payload.categories,
      },
    } as AxiosRequestConfig);
    yield put(followCategory.success(undefined));
  } catch (err) {
    console.log(err);
    yield put(followCategory.failure(undefined));
  }
}

export default function* watchFollowCategory() {
  yield takeLatest(getActionType(followCategory.request), handleFollowCategory);
}
