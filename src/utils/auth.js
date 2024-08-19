import Cookie from "js-cookie";

const TokenKey = "User-Token";

export function getToken() {
  return Cookie.get(TokenKey);
}

export function setToken(token) {
  // 30 分钟
  return Cookie.set(TokenKey, token, {
    expires: 1 / 48,
  });
}

export function removeToken() {
  return Cookie.remove(TokenKey);
}
