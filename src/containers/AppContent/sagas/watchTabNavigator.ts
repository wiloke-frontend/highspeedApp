import fetchAPI from 'utils/functions/fetchAPI';
import { getTabNavigator } from '../actions/actionTabNavigator';
import { AxiosResponse } from 'axios';
import { TabNavigator } from 'api/TabNavigator';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';

function* handleTabNavigator({ payload }: ReturnType<typeof getTabNavigator.request>) {
  try {
    const res: AxiosResponse<TabNavigator> = yield call(fetchAPI.request, {
      url: payload.endpoint,
    });
    yield put(getTabNavigator.success(res.data.data));
  } catch (err) {
    console.log(err.response);
    yield put(getTabNavigator.failure('error'));
  }
}

export function* watchTabNavigator() {
  yield takeLatest(getActionType(getTabNavigator.request), handleTabNavigator);
}
