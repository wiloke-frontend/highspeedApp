import { createAsyncAction, createDispatchAction } from 'utils/functions/reduxActions';
import { ForgetPasswordEndpoint } from 'api/Endpoint';

export interface ForgetPassRequest {
  endpoint: ForgetPasswordEndpoint;
  body: {
    user_login: string;
  };
  cb?: (status: string, message: string) => void;
}
export interface PasswordSuccess {
  status: string;
  msg: string;
}

export const forgetPassword = createAsyncAction(['@forgetPasswordRequest', '@forgetPasswordSuccess', '@forgetPassWordFailure'])<
  ForgetPassRequest,
  string,
  string
>();

export const useForgetPassword = createDispatchAction(forgetPassword.request);
