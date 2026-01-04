import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "./authThunk";
import { getAllJourneyOrdersAPI } from '../../utils/api/orderApi';

// Post journey Thunk
export const getAllJourneyOrders = createAsyncThunk(
  "order/getAllJourneyOrders",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getAllJourneyOrdersAPI(data);
      return response?.data;
    } catch (error) {
      console.log("Error in getAllJourneyOrders:", error);
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
