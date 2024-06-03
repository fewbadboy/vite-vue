import request from "@/utils/request";

export function signIn(data) {
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

export function signOut() {
  return request({
    url: "",
    method: "post",
  });
}
