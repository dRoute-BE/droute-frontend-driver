import { apiPostRequest } from "../http/post";
// import { APP_BACKEND_API } from '@env';
import {apiGetRequest} from '../http/get';
import { apiPutRequest } from "../http/put";
import Key from "../../constants/key"; // Import Key object

// Constants
const { DRIVER_API_URL, ORDER_API_URL } = Key;



// Get All journey API
export const getAllJourneyOrdersAPI = (journyId) =>
  apiGetRequest({
    apiUrl: `${ORDER_API_URL}/journey/${journyId}?status=ALL`,     
    content_type: "application/json",
    accessToken: null,
}); 