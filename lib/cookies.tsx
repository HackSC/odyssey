import { setCookie, parseCookies } from "nookies";

function setCookiesBaseDomain(ctx, key, value, options) {
  //TODO enable cookies sharing between odyssey. and apply.
  return setCookie(ctx, key, value, {
    ...options
  });
}

export { parseCookies, setCookiesBaseDomain };
