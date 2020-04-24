import { call, put, select, takeLatest } from 'redux-saga/effects';
import { editReply, EditReplySuccess } from 'containers/CommentScreen/actions/actionReplyComents';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getChildComment } from 'containers/CommentScreen/actions/actionComments';
import { getActionType } from 'utils/functions/reduxActions';

function* handleEditReply({ payload }: ReturnType<typeof editReply.request>) {
  try {
    const res: AxiosResponse<EditReplySuccess> = yield call(fetchAPI.request, {
      method: 'POST',
      url: payload.endpoint,
      data: { ...payload.body },
    });
    yield put(editReply.success({ data: { comment: res.data.data.comment, id: payload.id } }));
    const newReply = yield select((state: AppState) => state.replyComments);
    const childComments = newReply.data.filter((_: unknown, index: number) => index < 3);
    const childCommentTotal = newReply.data.length;
    yield put(getChildComment({ childComments, childCommentTotal, parentID: payload.parentID }));
    payload?.cb?.({ status: newReply.statusEdit, message: newReply.messageEdit });
  } catch (err) {
    console.log(err);
    yield put(editReply.failure('Your comment have not been updated'));
    const newReply = yield select((state: AppState) => state.replyComments);
    payload?.cb?.({ status: newReply.statusEdit, message: newReply.messageEdit });
  }
}

function* watchEditReply() {
  yield takeLatest(getActionType(editReply.request), handleEditReply);
}

export default watchEditReply;
