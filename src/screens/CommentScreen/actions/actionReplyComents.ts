import { createAsyncAction, createDispatchAction, createAction } from 'utils/functions/reduxActions';
import { Comments, Description, Comment } from 'api/Comment';
import { Pagination } from 'api/Pagination';

export interface ReplyRequestParams {
  endpoint: string;
  parentID?: number;
  params: {
    page?: number;
    lastCommentID?: number;
  };
}

export interface ReplySuccess extends Comments {
  pagination?: Pagination<'reply'>;
}

export interface AddReplyRequest {
  endpoint: string;
  body: {
    parentID: number;
    comment: Description;
    id?: number;
  };
  params: {
    postID: number;
  };
  cb?: () => void;
}
export interface AddReplySuccess {
  data: {
    comment: Comment;
  };
  status: string;
}

export interface DeleteReplyRequest {
  endpoint: string;
  parentID: number;
  cb?: ({ status, message }: { status: string; message: string }) => void;
}

export interface DeleteReplySuccess {
  status: string;
  data: {
    comment: { id: number };
  };
  msg: string;
}

export interface EditReplyRequest {
  endpoint: string;
  id: number;
  body: {
    comment: Description;
  };
  parentID: number;
  cb?: ({ status, message }: { status: string; message: string }) => void;
}

export interface EditReplySuccess {
  data: {
    comment: Comment;
    id: number;
  };
}

export const getReplyComments = createAsyncAction(['@getReplyRequest', '@getReplySuccess', '@getReplyFailure'])<
  ReplyRequestParams,
  ReplySuccess,
  string
>();

export const addNewReply = createAsyncAction(['@addNewReplyRequest', '@addNewReplySuccess', '@addNewReplyFailure'])<
  AddReplyRequest,
  AddReplySuccess,
  string
>();

export const addNewReplyOffline = createAction('@addNewReplyOffline', (payload: Comment) => ({
  comment: payload,
}));

export const deleteReplyOffline = createAction('@deleteReplyOffline', (payload: number) => ({
  id: payload,
}));

export const deleteReply = createAsyncAction(['@deleteReplyRequest', '@deleteReplySuccess', '@deleteReplyFailure'])<
  DeleteReplyRequest,
  { msg: string; id: number },
  string
>();

export const editReply = createAsyncAction(['@editReplyRequest', '@editReplySuccess', '@editReplyFailure'])<
  EditReplyRequest,
  EditReplySuccess,
  string
>();

export const useGetReply = createDispatchAction(getReplyComments.request);
export const useAddNewReply = createDispatchAction(addNewReply.request);
export const useDeleteReplyOffline = createDispatchAction(deleteReplyOffline);
export const useDeleteReply = createDispatchAction(deleteReply.request);
export const useEditReply = createDispatchAction(editReply.request);
