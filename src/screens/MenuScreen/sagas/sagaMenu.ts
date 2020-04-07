import fetchAPI from 'utils/functions/fetchAPI';
import { getMenu } from '../actions/actionMenu';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Menu } from 'api/Menu';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';

function* handleGetMenu({ payload }: ReturnType<typeof getMenu.request>) {
  try {
    const res: AxiosResponse<Menu> = yield call(fetchAPI.request, {
      url: payload.endpoint,
    } as AxiosRequestConfig);
    yield put(getMenu.success(res.data.data));
  } catch {
    yield put(getMenu.failure('Error'));
  }
}

export function* watchMenu() {
  yield takeLatest(getActionType(getMenu.request), handleGetMenu);
}
