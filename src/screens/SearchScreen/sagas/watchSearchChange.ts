import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import { searchChange } from 'screens/SearchScreen/actions/actionSearch';
import fetchAPI from 'utils/functions/fetchAPI';
import { AxiosResponse } from 'axios';
import { PLUCK } from 'utils/constants/constants';
import { Search } from 'api/Search';

type SearchChangeRequest = ReturnType<typeof searchChange.request>;

function* handleSeachChange({ payload }: SearchChangeRequest) {
  try {
    yield delay(200);
    const res: AxiosResponse<Search> = yield call(fetchAPI.request, {
      url: payload.endpoint,
      params: {
        q: payload.query,
        postType: 'post',
        pluck: PLUCK,
      },
    });
    yield put(searchChange.success(res.data.data));
  } catch {
    yield put(searchChange.failure('Loi cmnr'));
  }
}

export default function* watchSearchChange() {
  yield takeLatest(getActionType(searchChange.request), handleSeachChange);
}
