import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { message } from 'ant-design-vue';
import httpStatusCodeHandler from './httpStatusCodeHandler';

const instance: AxiosInstance = axios.create({
  baseURL: '/proxy',
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config): AxiosRequestConfig => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        'Authorization'
      )}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (res): AxiosResponse => {
    if (res.data.errorCode !== 10200) {
      message.error(res.data.errorMsg);
    }
    return res;
  },
  (err): AxiosResponse => {
    httpStatusCodeHandler.sendMessage(err.response.status, message);
    return err;
  }
);

export default instance;
