import http from "./http";

export const URL_LOGIN = "api/v1/auth/login";
export const URL_REGISTER = "api/v1/auth/register";
export const URL_VERIFY = "api/v1/auth/verify";
// export const URL_LOGOUT = "auth/logout";
// export const URL_REFRESH = "auth/refresh";

const authApi = {
  registerAccount(body) {
    return http.post(URL_REGISTER, body);
  },
  login(body) {
    return http.post(URL_LOGIN, body);
  },
  verify(token) {
    return http.put(`${URL_VERIFY}?token=${token}`);
  },
  forgot(refreshtoken) {
    return http.put(`${URL_VERIFY}?token=${refreshtoken}`);
  },

  //   logout() {
  //     return http.post(URL_LOGOUT);
  //   },
};

export default authApi;
