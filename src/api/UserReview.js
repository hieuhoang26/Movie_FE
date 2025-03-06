import http from "./http";

const URL_UserReview = "user/review";

export const adminUserApi = {
  //   getReviewByMovieId(id) {
  //     return http.get(`${URL_UserReview}/${id}`);
  //   },
  createReview() {
    return http.get(`${URL_UserReview}/${}`);
  },
  deleteUser(id) {
    return http.delete(`${URL_UserReview}/${id}`);
  },
  EditAdminUser(id, userName, email, password, profilePicture, role) {
    return http.put(`${URL_UserReview}/${id}`, {
      userName: userName,
      email: email,
      password: password,
      profilePicture: profilePicture,
      role: role,
    });
  },
};
