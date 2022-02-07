import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import url from "./url";

// 配置 axios 拦截器，防止多次重复请求
const axiosInstance = axios.create({
  baseURL: url,
});

// 存储所有请求的 key
const requestList = new Map();

// 为每一个请求生成一个独立的 key
function generateKey(config: AxiosRequestConfig) {
  const { method, url, params, data } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join("&");
}

// 添加请求
function addRequest(config: AxiosRequestConfig) {
  const requestKey = generateKey(config);
  // console.log(requestKey);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!requestList.has(requestKey)) {
        requestList.set(requestKey, cancel);
      }
    });
}

// 删除请求
function removeRequest(config: AxiosRequestConfig) {
  const requestKey = generateKey(config);
  if (requestList.has(requestKey)) {
    const cancel = requestList.get(requestKey);
    cancel(requestKey);
    requestList.delete(requestKey);
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    removeRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addRequest(config); // 把当前请求添加到请求列表中
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    removeRequest(response.config); // 从请求列表中移除请求
    return response;
  },
  (error) => {
    removeRequest(error.config || {}); // 从请求列表中移除请求
    if (axios.isCancel(error)) {
      // console.log("已取消的重复请求：" + error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
