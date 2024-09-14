import request from "@/utils/request";

export function postAnalysisResult(data) {
  return request({
    url: "",
    method: "post",
    data,
  });
}

export function getUserInfo(params) {
  return request({
    url: "",
    method: "get",
    params,
  });
}

export function getUserActor(params) {
  return request({
    url: "",
    method: "get",
    params,
    responseType: "blob",
    timeout: 10 * 1000,
  });
}

export function getMockInfo(params) {
  return request({
    url: "/get-mock-info",
    method: "get",
    params,
    transformRequest: [
      (data, headers) => {
        // 可修改请求头
        return data;
      },
    ],
    transformResponse: [
      (data) => {
        // 返回给 then/catch 前修改数据
        return data;
      },
    ],
    paramsSerializer: (params) => {
      // qs 去序列化 params
      return params;
    },
    adapter: (config) => {
      return new Promise((resolve, reject) => {
        resolve({
          data: { name: "test-mock" },
          status: 200,
          statusText: "OK",
        });
      });
    },
    maxContentLength: 2000, // 默认值, 单位 Byte
    maxBodyLength: 2000,
    validateStatus: (status) => {
      // HTTP状态码验证
      return status >= 200 && status < 300;
    },
    maxRedirects: 5,
  });
}
