const ACCESS_TOKEN = "ACCESS_TOKEN";

export const tokenService = {
  save(accessToken) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN, accessToken);
    globalThis?.sessionStorage?.setItem(ACCESS_TOKEN, accessToken);
  },
  get() {
    return globalThis?.localStorage?.getItem(ACCESS_TOKEN);
    //return sessionStorage.getItem(ACCESS_TOKEN);
  },
  delete() {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN);
    globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN);
  },
};
