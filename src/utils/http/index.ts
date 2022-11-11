import request from './axios';
import { ResponseType } from '@/types/http';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const _get = <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ResponseType<T>>> => {
  return request.get(url, config);
};

const _post = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any> | undefined
): Promise<AxiosResponse<ResponseType<T>>> => {
  return request.post(url, data, config);
};

const _put = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any> | undefined
): Promise<AxiosResponse<ResponseType<T>>> => {
  return request.put(url, data, config);
};

const _delete = <T = any>(
  url: string,
  config?: AxiosRequestConfig<any> | undefined
): Promise<AxiosResponse<ResponseType<T>>> => {
  return request.delete(url, config);
};

export default {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};
