import { createAsyncAction, createDispatchAction, createAction } from 'utils/functions/reduxActions';
import { Comments, Description, Comment } from 'api/Comment';
import { Pagination } from 'api/Pagination';
import { CommentEndpoint } from 'api/Endpoint';

export interface GetCommentSuccess extends Comments {
  pagination?: Pagination<'comments'>;
}
export interface CommentRequestParams {
  endpoint: CommentEndpoint;
  params: {
    postID: number;
    page: number;
    lastCommentID?: number;
  };
}
export interface PostNewCommentRequest {
  endpoint: CommentEndpoint;
  body: {
    postID: number;
    comment: Description;
    id?: number;
  };
  cb?: () => void;
}
export interface PostNewCommentSuccess {
  data: {
    comment: Comment;
  };
  status: ReducerStatus;
}

export interface DeleteCommentRequest {
  endpoint: string;
  cb?: ({ status, message }: { status: string; message: string }) => void;
}
export interface DeleteCommentSuccess {
  status: string;
  data: {
    comment: { id: number };
  };
  msg: string;
}

export interface EditCommentRequest {
  endpoint: string;
  id: number;
  body: {
    comment: Description;
  };
  cb?: ({ status, message }: { status: string; message: string }) => void;
}
export interface EditCommentSuccess {
  data: {
    comment: Comment;
    id: number;
  };
}

export interface ChildCommentPayload {
  childComments: Comment[];
  childCommentTotal: number;
  parentID: number;
}

export const getPostComment = createAsyncAction(['@getPostCommentsRequest', '@getPostCommentsSuccess', '@getPostCommentsFailure'])<
  CommentRequestParams,
  GetCommentSuccess,
  string
>();

export const postNewComment = createAsyncAction(['@postNewCommentRequest', '@postNewCommentSuccess', '@postNewCommentFailure'])<
  PostNewCommentRequest,
  PostNewCommentSuccess,
  string
>();

export const postNewCommentOffline = createAction('@postNewCommentOffline', (payload: Comment) => ({
  comment: payload,
}));

export const deleteComment = createAsyncAction(['@deleteCommentRequest', '@deleteCommentSuccess', '@deleteCommentFailure'])<
  DeleteCommentRequest,
  { msg: string; id: number },
  string
>();

export const deleteCommentOffline = createAction('@deleteCommentOffline', (payload: number) => ({
  id: payload,
}));

export const editComment = createAsyncAction(['@editCommentRequest', '@editCommentSuccess', '@editCommentFailure'])<
  EditCommentRequest,
  EditCommentSuccess,
  string
>();

export const getChildComment = createAction('@getChildComment', (payload: ChildCommentPayload) => ({
  data: payload,
}));

export const useGetPostComment = createDispatchAction(getPostComment.request);
export const useDeleteComment = createDispatchAction(deleteComment.request);
export const useAddNewComment = createDispatchAction(postNewComment.request);
export const useDeleteOffline = createDispatchAction(deleteCommentOffline);
export const useEditComment = createDispatchAction(editComment.request);
