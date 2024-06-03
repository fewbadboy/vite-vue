import axios from "axios";
import { message } from "ant-design-vue";
import { useAuthStore } from "../stores/auth";

const server = axios.create({
  baseURL: import.meta.env.VITE_ORIGIN_URL,
  withCredentials: true,
  timeout: 6 * 1000,
});

/**
 * request interceptor
 */
server.interceptors.request.use(
  (config) => {
    const auth = useAuthStore();
    config.headers["Authorization"] = auth.authorization;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * response interceptor
 * Response Schema
 * {
 *    data: {},
 *    status: 200,
 *    statusText: 'Ok',
 *    headers: {}
 *    config: {}
 *    request: {}
 * }
 */
server.interceptors.response.use(
  (response) => {
    /**
     * 处理文件流下载
     * blob--size / arrayBuffer--byteLength
     * 下载文件信息
     * headers: { 'content-disposition': 'attachment;filename=%E6%A8%A1%E6%9D%BF.xls' }
     */
    // const {
    //   config: { responseType },
    //   data: { size, arrayBuffer },
    //   status,
    //   data
    // } = response
    // if (/(blob|arrayBuffer)/.test(responseType)) {
    //   // 获取流和标头后，再次formData 构造后返回即可
    //   if (status === 200 && responseType === 'blob' ? size > 0 : arrayBuffer > 0) return Promise.resolve(data)
    //   return Promise.reject(data)
    // }

    // 针对服务端不同状态码处理
    const { data } = response;
    if (data.code !== 200) {
      const msg = data?.message;
      message.error(msg, 4000);

      if (data.code === 50010) {
        // todo: 自定义状态码处理
      }

      return Promise.reject(new Error(msg || "unknown error"));
    } else {
      return data;
    }
  },
  (error) => {
    const {
      response: {
        data: { message: msg },
      },
      status,
    } = error;
    message.error(msg, 4000);

    if (status === 401) {
      // todo: resetToken
    }

    return Promise.reject(error);
  },
);

export default server;
