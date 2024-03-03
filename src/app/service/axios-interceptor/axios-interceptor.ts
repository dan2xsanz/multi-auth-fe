import { REQUEST_URL } from "@/properties";
import axios, { AxiosInstance } from "axios";


// REQUEST INTERCEPTOR
axios.interceptors.request.use(function (request) {
    return request;
  }, function (error) {
    return Promise.reject(error);
  });


// RESPONSE INTERCEPTOR
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });