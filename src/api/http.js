import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
} from "../utils/storage";

const baseUrl = "http://localhost:6868/";

class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    this.refreshTokenRequest = null;

    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor để thêm accessToken vào request
    // this.instance.interceptors.request.use(
    //   (config) => {
    //     if (this.accessToken) {
    //       config.headers.Authorization = `Bearer ${this.accessToken}`;
    //     }
    //     return config;
    //   },
    //   (error) => Promise.reject(error)
    // );

    // Interceptor để xử lý lỗi response (ví dụ: token hết hạn)
    this.instance.interceptors.response.use(
      (response) => {
        if (response.config.url.includes("api/v1/auth/login")) {
          console.log(response);
          const token = response.data.data;
          const { accessToken, refreshToken } = jwtDecode(token, {
            header: true,
          });
          console.log("accessToken", accessToken);
          console.log("refreshToken", refreshToken);
          setAccessTokenToLS(accessToken);
          setRefreshTokenToLS(refreshToken);
        }
        return response;
      },
      async (error) => {
        if (error.response && error.response.status === 401) {
          console.log("Token expired. Handle refresh here.");
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
