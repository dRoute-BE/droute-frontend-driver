import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadSingleDocumentAPI } from "../../utils/api/documentApi";
import { handleAxiosError } from "./authThunk";

// Upload Single File Thunk
export const uploadSingleDocument = createAsyncThunk(
  "document/upload",
  async (data, { rejectWithValue }) => {
    try {
      const response = await uploadSingleDocumentAPI(data);

      if (response?.status === 200 || response?.status === 201) {
        
        return response?.data;
      } else {
        throw new Error(response?.data?.message || "Upload Failed, try again");
      }
    } catch (error) {
      console.log("Error in postSigle File Thunk:", error);
      return rejectWithValue(handleAxiosError(error));
    }
  }
);