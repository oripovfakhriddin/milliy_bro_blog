import axios from "axios";
import Cookies from "js-cookie";
import { ENDPOINT, TOKEN } from "../const";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1/`,
  timeout: 10000,
  headers: { Authorization: `Bearer ${Cookies.get(TOKEN)}` },
});

request.interceptors.response.use(
  (response) => response,
  (err) => {
    // console.log("Err: ", err);
    return Promise.reject(err);
  }
);
export default request;
