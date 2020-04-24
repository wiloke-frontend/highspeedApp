import { createAsyncAction, createAction, createDispatchAction } from 'utils/functions/reduxActions';
import { UserProfile } from 'api/User';
import { SigninEndpoint, SignupEndpoint, LoginAppleEndpoint, FacebookEndpoint, ChangePasswordEndpoint } from 'api/Endpoint';

export interface Authentication {
  data: {
    msg: string;
    redirectTo: string;
    accessToken: string;
    refreshToken: string;
  } & Partial<UserProfile>;
  isLoggedIn: boolean;
  status: string;
  message: string;
}

export interface BodyRequest {
  user_login: string;
  user_password: string;
  user_email?: string;
}

export interface AuthenticationRequest {
  endpoint: SigninEndpoint | SignupEndpoint;
  body: BodyRequest;
  cb?: (auth: Authentication, { user_login, user_password, user_email }: BodyRequest) => void;
}

export interface AppleRequest {
  endpoint: LoginAppleEndpoint;
  body: {
    code: string | null;
    token: string | null;
    email: string | null;
  };
  cb?: (auth: Authentication) => void;
}

export interface FacebookRequest {
  endpoint: FacebookEndpoint;
  body: {
    accessToken: string;
  };
  cb?: (auth: Authentication) => void;
}

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export interface ChangePasswordRequest {
  endpoint: ChangePasswordEndpoint;
  body: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  cb?: (status: string, message: string) => void;
}

export interface ChangePasswordSuccess {
  status: string;
  msg: string;
  data: {
    refreshToken: string;
    accessToken: string;
  };
}

export const authentication = createAsyncAction(['@authRequest', '@authSuccess', '@authFailure'])<AuthenticationRequest, Authentication, string>();

export const logout = createAction('@logout');

export const getProfile = createAsyncAction(['@getProfileRequest', '@getProfileSuccess', '@getProfileFailure'])<string, UserProfile, string>();

export const register = createAsyncAction(['@registerRequest', '@registerSuccess', '@registerFailure'])<
  AuthenticationRequest,
  Authentication,
  string
>();

export const loginApple = createAsyncAction(['@loginAppleRequest', '@loginAppleSuccess', '@loginAppleFailure'])<
  AppleRequest,
  Authentication,
  string
>();

export const loginFacebook = createAsyncAction(['@loginFacebookRequest', '@loginFacebookSuccess', '@loginFacebookFailure'])<
  FacebookRequest,
  Authentication,
  string
>();

export const refreshToken = createAction('@renewToken', (payload: { accessToken: string }) => {
  return {
    accessToken: payload.accessToken,
  };
});

export const changePassword = createAsyncAction(['@changePasswordRequest', '@changePasswordSuccess', '@changePasswordFailure'])<
  ChangePasswordRequest,
  ChangePasswordSuccess,
  string
>();

export const useLogOut = createDispatchAction(logout);

export const useLoginApple = createDispatchAction(loginApple.request);
export const useAuthentication = createDispatchAction(authentication.request);
export const useFacebookLogin = createDispatchAction(loginFacebook.request);

export const useRefreshToken = createDispatchAction(refreshToken);
export const useChangePassword = createDispatchAction(changePassword.request);
