const ACCESS_TOKEN = "ACCESS_TOKEN";

export const tokenService = {
  save(accessToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    sessionStorage.setItem(ACCESS_TOKEN, accessToken);
  },
  get() {
    return localStorage.getItem(ACCESS_TOKEN);
    //return sessionStorage.getItem(ACCESS_TOKEN);
  },
  delete() {
    localStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(ACCESS_TOKEN);
  },
};
