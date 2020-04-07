import axios, { AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse } from 'axios';

type ResponseData = any;

interface Configure {
  configure: AxiosRequestConfig;
  setAccessToken(): string;
  setRefreshToken(): string;
}

type Success<ResponseDataT> = (res: AxiosResponse<ResponseDataT>, originalRequest: AxiosRequestConfig) => void;

type Failure = (error: AxiosError) => void;

interface AccessTokenParams {
  setCondition: (config: AxiosRequestConfig) => boolean;
}

interface Config<ResponseDataT, AxiosDataReturnT> {
  url: string;
  setRefreshCondition(error: AxiosError): boolean;
  axiosData(refreshToken: string, accessToken: string): AxiosDataReturnT;
  success: Success<ResponseDataT>;
  failure: Failure;
}

const { CancelToken } = axios;
const source = CancelToken.source();

export default class ConfigureAxios {
  private axiosInstance: AxiosInstance;
  private setAccessToken: () => string;
  private setRefreshToken: () => string;

  public constructor({ configure, setAccessToken, setRefreshToken }: Configure) {
    this.setAccessToken = setAccessToken;
    this.setRefreshToken = setRefreshToken;
    this.axiosInstance = axios.create({ cancelToken: source.token, ...configure });
  }

  public create = () => {
    return this.axiosInstance;
  };

  public sagaCancelAxiosRequest = (cancel: string) => {
    (this.axiosInstance as AxiosInstance & { [key: string]: unknown })[cancel] = source.cancel;
  };

  public accessToken = ({ setCondition }: AccessTokenParams) => {
    this.axiosInstance.interceptors.request.use(config => {
      if (!config?.url) {
        return config;
      }
      const accessToken = this.setAccessToken();
      if (setCondition(config) && !config.headers.Authorization) {
        if (!!accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
      return config;
    });
  };

  private handleRefreshTokenAsync = async <ResponseDataT extends any, AxiosDataReturnT extends any>(
    config: Config<ResponseDataT, AxiosDataReturnT>,
    error: AxiosError,
  ) => {
    const { url, axiosData, success, failure } = config;
    try {
      const refreshToken = this.setRefreshToken();
      const accessToken = this.setAccessToken();
      const res = await this.axiosInstance.post(url, axiosData(refreshToken, accessToken));
      success(res, error.config);
      return await this.axiosInstance.request(error.config);
    } catch (err) {
      failure(error);
      return await Promise.reject(error);
    } finally {
      this.refreshToken(config);
    }
  };

  public refreshToken = <ResponseDataT extends ResponseData = any, AxiosDataReturnT = any>(config: Config<ResponseDataT, AxiosDataReturnT>) => {
    const interceptor = this.axiosInstance.interceptors.response.use(undefined, (error: AxiosError) => {
      if (!config.setRefreshCondition(error)) {
        return Promise.reject(error);
      }
      console.log('refreshToken', error.response);
      this.axiosInstance.interceptors.response.eject(interceptor);
      return this.handleRefreshTokenAsync(config, error);
    });
  };
}
