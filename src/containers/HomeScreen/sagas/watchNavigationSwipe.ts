import { takeLatest, call, put } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import { getNavigationPosts } from 'containers/HomeScreen/actions/actionHome';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { HomeSection } from 'api/HomeSection';

function* handleNavigationSwipe({ payload }: ReturnType<typeof getNavigationPosts.request>) {
  try {
    const res: AxiosResponse<HomeSection> = yield call(fetchAPI.request, { url: payload.endpoint, params: payload.params });
    yield put(getNavigationPosts.success({ endpoint: payload.endpoint, uid: payload.uid, data: res.data.data }));
  } catch {
    yield put(getNavigationPosts.failure({ endpoint: payload.endpoint, uid: payload.uid, message: 'Error' }));
  }
}

export default function* watchNavigationSwipe() {
  yield takeLatest(getActionType(getNavigationPosts.request), handleNavigationSwipe);
}
