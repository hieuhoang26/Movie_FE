import http from "./http";

const URL_UserGet = "user/user/";
const URL_UserPut = "user/user/";

export const userDetail = {
  getUserById(id) {
    return http.get(`${URL_UserGet}${id}`);
  },
  updateUser(id, userData) {  
    return http.put(`${URL_UserPut}${id}`, userData);
  }
  
};
