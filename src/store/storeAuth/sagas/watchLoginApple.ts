import { call, select, takeLatest, put } from 'redux-saga/effects';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';
import { loginApple, Authentication } from '../actions/actionAuth';

function* handleLoginApple({ payload }: ReturnType<typeof loginApple.request>) {
  try {
    const res: AxiosResponse<Authentication> = yield call(fetchAPI.request, {
      method: 'POST',
      url: payload.endpoint,
      data: {
        authorizationCode: payload.body.code,
        email: payload.body.email,
        identityToken: payload.body.token,
      },
    } as AxiosRequestConfig);
    yield put(loginApple.success(res.data));
    const auth: Authentication = yield select((state: AppState) => state.auth);
    payload?.cb?.(auth);
  } catch (err) {
    console.log(err.response);
    yield put(loginApple.failure('Something went to error'));
    const auth: Authentication = yield select((state: AppState) => state.auth);
    payload?.cb?.(auth);
  }
}

function* watchLoginApple() {
  yield takeLatest(getActionType(loginApple.request), handleLoginApple);
}

export default watchLoginApple;
