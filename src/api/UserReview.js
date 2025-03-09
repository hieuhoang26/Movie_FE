import http from "./http";

const URL_UserReview = "user/review";

export const UserReviewApi = {
  getReviewByMovieId(movie, page, size) {
    return http.get(
      `${URL_UserReview}?movie=${movie}&page=${page}&size=${size}`
    );
  },

  createReview() {
    return http.get(`${URL_UserReview}`);
  },
  deleteUser(id) {
    return http.delete(`${URL_UserReview}/${id}`);
  },
};
