import { call, select, takeLatest, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';
import { forgetPassword, PasswordSuccess } from '../actions/actionPassword';

function* handleForgetPassword({ payload }: ReturnType<typeof forgetPassword.request>) {
  try {
    const res: AxiosResponse<PasswordSuccess> = yield call(fetchAPI.request, {
      method: 'post',
      url: payload.endpoint,
      data: { ...payload.body },
    });
    yield put(forgetPassword.success(res.data.msg));
    const forgetState = yield select((state: AppState) => state.forgetPass);
    payload.cb?.(forgetState.status, forgetState.message);
  } catch (err) {
    console.log(err.response);
    yield put(forgetPassword.failure('This username / email does not exist'));
    const forgetState = yield select((state: AppState) => state.forgetPass);
    payload.cb?.(forgetState.status, forgetState.message);
  }
}

function* watchForgetPassword() {
  yield takeLatest(getActionType(forgetPassword.request), handleForgetPassword);
}

export default watchForgetPassword;
