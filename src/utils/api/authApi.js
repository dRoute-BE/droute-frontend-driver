import { apiPostRequest } from "../http/post";
// import { APP_BACKEND_API } from '@env';
import {apiGetRequest} from '../http/get';
import { apiPutRequest } from "../http/put";
import Key from "../../constants/key"; // Import Key object

// Constants
const { DRIVER_API_URL, USER_API_URL } = Key;

// API CALLS
export const signInAPI = (data) =>
  apiPostRequest({
    apiUrl: `${DRIVER_API_URL}/login`,     
    content_type: "application/json",
    data: data,
    // accessToken,
});

export const registerAPI = (data) =>
  apiPostRequest({
    apiUrl: `${DRIVER_API_URL}/signup`,
    content_type: "application/json",
    data: data,
  });

export const getDriverByDriverIdAPI = (driverId) =>
  apiGetRequest({
    apiUrl: `${DRIVER_API_URL}/${driverId}`,
    content_type: "application/json",
  });

export const sendOtpAPI = (data) =>
  apiPostRequest({
    apiUrl: `${USER_API_URL}/auth/sendOTP`,
    content_type: "application/json",
    data: data,
  });

export const resetPasswordAPI = (data) =>
  apiPutRequest({
    apiUrl: `${DRIVER_API_URL}/reset-password`,
    content_type: "application/json",
    data: data,
  });

export const completeProfileAPI = (data) =>
  apiPutRequest({
    apiUrl: `${DRIVER_API_URL}/profile-complete`,
    content_type: "application/json",
    data: data,
  });
