import axios from "./axios";
import type { AxiosRequestConfig } from "axios";

type HttpMethod = "get" | "post" | "put" | "delete";

const request =
  <T = any, R = ResponseBody<T>>(method: HttpMethod) =>
  (url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      method,
      url,
    };
    if (method === "get" || method === "delete") {
      requestConfig.params = data;
    } else {
      requestConfig.data = data;
    }
    return axios(requestConfig);
  };

export const get = <T = any, R = ResponseBody<T>>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
) => request<T, R>("get")(url, params, config);

export const post = <T = any, R = ResponseBody<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => request<T, R>("post")(url, data, config);

export const put = <T = any, R = ResponseBody<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => request<T, R>("put")(url, data, config);

export const del = <T = any, R = ResponseBody<T>>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
) => request<T, R>("delete")(url, params, config);

