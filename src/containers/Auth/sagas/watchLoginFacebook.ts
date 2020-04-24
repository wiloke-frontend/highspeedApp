import { call, takeLatest, put, select } from 'redux-saga/effects';
import { loginFacebook, Authentication } from '../actions/actionAuth';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';

function* handleLoginFacebook({ payload }: ReturnType<typeof loginFacebook.request>) {
  try {
    const res: AxiosResponse<Authentication> = yield call(fetchAPI.request, {
      method: 'POST',
      url: payload.endpoint,
      data: {
        accessToken: payload.body.accessToken,
      },
    });
    yield put(loginFacebook.success(res.data));
    const auth: Authentication = yield select((state: AppState) => state.auth);
    payload?.cb?.(auth);
  } catch (err) {
    console.log(err.response);
    yield put(loginFacebook.failure(err.message));
    const auth: Authentication = yield select((state: AppState) => state.auth);
    payload?.cb?.(auth);
  }
}

function* watchLoginFacebook() {
  yield takeLatest(getActionType(loginFacebook.request), handleLoginFacebook);
}

export default watchLoginFacebook;
