import { call, takeLatest, put } from 'redux-saga/effects';
import { changePassword, ChangePasswordSuccess } from '../actions/actionAuth';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';

function* _handleChangePassword({ payload }: ReturnType<typeof changePassword.request>) {
  try {
    const res: AxiosResponse<ChangePasswordSuccess> = yield call(fetchAPI.request, {
      method: 'post',
      url: payload.endpoint,
      data: {
        old_password: payload.body.oldPassword,
        new_password: payload.body.newPassword,
        confirm_new_password: payload.body.confirmPassword,
      },
    });
    yield put(changePassword.success(res.data));
    payload?.cb?.(res.data.status, res.data.msg);
  } catch (err) {
    console.log(err.response);
    yield put(changePassword.failure('Change password failure'));
    payload?.cb?.('failure', err.response.data.error);
  }
}

function* watchChangePassword() {
  yield takeLatest(getActionType(changePassword.request), _handleChangePassword);
}

export default watchChangePassword;
