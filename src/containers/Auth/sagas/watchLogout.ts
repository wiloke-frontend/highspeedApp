import { call, take } from 'redux-saga/effects';
import fetchAPI from 'utils/functions/fetchAPI';
import { AxiosRequestConfig } from 'axios';
import { getActionType } from 'utils/functions/reduxActions';
import { logout } from '../actions/actionAuth';

function* watchLogout() {
  while (true) {
    const logoutAction: ReturnType<typeof logout> = yield take(getActionType(logout));
    if (logoutAction.type === '@logout') {
      yield call(fetchAPI.request, {
        method: 'get',
        url: 'signout',
      } as AxiosRequestConfig);
    }
  }
}

export default watchLogout;
