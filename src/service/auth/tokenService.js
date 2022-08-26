const ACCESS_TOKEN = "ACCESS_TOKEN";
import nookies from "nookies";

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  save(accessToken, ctx = null) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN, accessToken);
    globalThis?.sessionStorage?.setItem(ACCESS_TOKEN, accessToken);
    nookies.set(ctx, ACCESS_TOKEN, accessToken, {
      maxAge: ONE_YEAR,
      path: "/",
    });
  },
  get(ctx = null) {
    //return globalThis?.localStorage?.getItem(ACCESS_TOKEN);
    //return sessionStorage.getItem(ACCESS_TOKEN);
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN] || "";
  },
  delete(ctx = null) {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN);
    globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN);
    nookies.destroy(ctx, ACCESS_TOKEN);
  },
};
