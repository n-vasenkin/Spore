import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Inject, Singleton } from 'typescript-ioc';
import { ToastService, ToastType } from 'ui-kit';
import AuthService from './AuthService';

enum Method {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete'
}

type ApiResponse = Promise<any>;

interface RequestConfig {
  config?: AxiosRequestConfig;
  apiVer?: false | string;
}

export const BACKEND_URL = '/';
// export const BACKEND_URL = 'http://185.41.160.136/';

@Singleton
export default class Api {
  @Inject private toastService: ToastService;
  @Inject private auth: AuthService;
  private requestSender: AxiosInstance = axios.create();

  private prepareUrl = (endpoint: string, apiVer: string | boolean): string => {
    return `${BACKEND_URL}api/${apiVer}/${endpoint}`;
  };

  private doRequest(
    method: Method,
    requestEndpoint: string,
    params: object,
    data: object | Array<any>,
    requestConfig: RequestConfig = {}
  ): ApiResponse {
    const { config = {}, apiVer = 'v1' } = requestConfig;
    const axiosConfig = { params, ...config };
    const endpoint = this.prepareUrl(requestEndpoint, apiVer);

    axiosConfig.headers = this.auth.token ? { ...axiosConfig.headers, authorization: this.auth.token } : {};

    let request;
    switch (method) {
      case Method.GET: {
        request = this.requestSender.get(endpoint, axiosConfig);
        break;
      }
      case Method.DELETE: {
        request = this.requestSender.delete(endpoint, axiosConfig);
        break;
      }
      case Method.POST: {
        request = this.requestSender.post(endpoint, data, axiosConfig);
        break;
      }
      case Method.PATCH: {
        request = this.requestSender.patch(endpoint, data, axiosConfig);
        break;
      }
    }

    request = request
      .then((response: AxiosResponse) => response.data)
      .catch((error: AxiosError) => {
        if (error.response.data.code === 500) return; // Проверка на ошибку при авторизации
        let text = 'Ошибка при отправке запроса! ';
        if (endpoint) text += `Адрес: ${endpoint} `;
        if (Object.keys(params).length) text += ` | Параметры: ${JSON.stringify(params)}\n`;
        this.toastService.showToast(ToastType.ERROR, 'Ошибка при запросе', text, 'common/problem');
        return Promise.reject(error);
      });

    return request;
  }

  get(endpoint: string, params: object = {}, config?: RequestConfig): ApiResponse {
    return this.doRequest(Method.GET, endpoint, params, {}, config);
  }

  post(endpoint: string, data?: any, config?: RequestConfig): ApiResponse {
    return this.doRequest(Method.POST, endpoint, {}, data, config);
  }

  patch(endpoint: string, data?: object, config?: RequestConfig): ApiResponse {
    return this.doRequest(Method.PATCH, endpoint, {}, data, config);
  }

  delete(endpoint: string, config?: RequestConfig): ApiResponse {
    return this.doRequest(Method.DELETE, endpoint, {}, {}, config);
  }
}
