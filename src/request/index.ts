import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import url from "../../url.config";

const axiosInstance = axios.create({
  baseURL: url,
});

const pendingRequest = new Map();

// 为每一个请求生成一个独立的 key
function generateReqKey(config: AxiosRequestConfig) {
  const { method, url, params, data } = config;

  return [method, url, qs.stringify(params), qs.stringify(data)].join("&");
}

function addPendingRequest(config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config);
  // console.log(requestKey);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}

function removePendingRequest(config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey);
    cancel(requestKey);
    pendingRequest.delete(requestKey);
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config); // 把当前请求添加到pendingRequest对象中
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config); // 从pendingRequest对象中移除请求
    return response;
  },
  (error) => {
    removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
    if (axios.isCancel(error)) {
      // console.log("已取消的重复请求：" + error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
