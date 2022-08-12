import nookies from "nookies";

const COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_COOKIE;
const EIGHT_HOURS = 60 * 60 * 8;

export const saveToken = (acessToken: string, ctx = null) => {
  nookies.set(ctx, COOKIE_NAME, acessToken, {
    maxAge: EIGHT_HOURS,
    path: "/",
  });
};

export const getToken = (ctx = null) => {
  const cookies = nookies.get(ctx);
  return cookies[COOKIE_NAME];
};

export const removeToken = (ctx = null) => {
  nookies.destroy(ctx, COOKIE_NAME);
};
