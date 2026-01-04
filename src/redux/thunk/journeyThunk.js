import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "./authThunk";
import { postJourneyAPI, getAllJourneyByDriverIdAPI } from '../../utils/api/journeyAPI';

// Post journey Thunk
export const postJourney = createAsyncThunk(
  "journey/post",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postJourneyAPI(data);
      return response?.data;
    } catch (error) {
      console.log("Error in postJourney:", error);
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// Get all journey Thunk
export const getAllJourneyByDriverId = createAsyncThunk(
  "journey/getAllJourneyByDriverId",
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await getAllJourneyByDriverIdAPI(driverId);
  
      return response?.data;
    } catch (error) {
      console.log("Error in getAllJourneyByDriverId:", error);
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
