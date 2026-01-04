import { apiPostRequest } from "../http/post";
// import { APP_BACKEND_API } from '@env';
import {apiGetRequest} from '../http/get';
import { apiPutRequest } from "../http/put";
import Key from "../../constants/key"; // Import Key object

// Constants
const { DRIVER_API_URL, USER_API_URL } = Key;

// Post journey API
export const postJourneyAPI = (data) =>
  apiPostRequest({
    apiUrl: `${DRIVER_API_URL}/journey-details`,     
    content_type: "application/json",
    data: data,
    accessToken: null,
}); 


// Get All journey API
export const getAllJourneyByDriverIdAPI = (driverId) =>
  apiGetRequest({
    apiUrl: `${DRIVER_API_URL}/journey-details/driver/${driverId}`,     
    content_type: "application/json",
    accessToken: null,
}); 