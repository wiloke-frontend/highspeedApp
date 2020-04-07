import { takeLatest, put, call } from 'redux-saga/effects';
import { getTrending } from 'screens/SearchScreen/actions/actionSearch';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { Posts } from 'api/Posts';
import { getActionType } from 'utils/functions/reduxActions';

// type SearchScreenMountedAction = ReturnType<typeof searchScreenMounted>;
type GetTrendingRequestAction = ReturnType<typeof getTrending.request>;

function* handleTrendingRequest({ payload }: GetTrendingRequestAction) {
  try {
    const res: AxiosResponse<Posts> = yield call(fetchAPI.request, { url: payload });
    yield put(getTrending.success(res.data.data));
  } catch {
    yield put(getTrending.failure('Loi cmnr'));
  }
}

export default function* watchTrendingPosts() {
  yield takeLatest(getActionType(getTrending.request), handleTrendingRequest);
}
