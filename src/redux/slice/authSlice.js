import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { register, signIn, getDriverByDriverId, completeProfile } from "../thunk/authThunk";
import { getAllJourneyByDriverId, postJourney } from "../thunk/journeyThunk";

const initialState = {
  user: null,
  journey: [],
  loading: false,
  errorMessage: null,
  //   accessToken: null,
  userCoordinate: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: () => {
      AsyncStorage.removeItem("driver_id");
      console.log("User logged out successfully");
      return initialState; 
    },
    // New reducer to update userCoordinate
    updateUserCoordinate: (state, action) => {
      state.userCoordinate = action.payload; // Update userCoordinate with the payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("User = ", action.payload);
        state.user = action?.payload?.data;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      })

      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("User = ", action.payload);
        state.user = action?.payload?.data;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Restore user
      .addCase(getDriverByDriverId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDriverByDriverId.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("User = ", action.payload);
        state.user = action?.payload?.data;
      })
      .addCase(getDriverByDriverId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Complete Profile
      .addCase(completeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeProfile.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("User = ", action.payload);
        state.user = action?.payload?.data;
      })
      .addCase(completeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Post Journey
    // This handles the postJourney thunk
      builder.addCase(postJourney.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postJourney.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("Journey = ", action.payload);
        state.journey = action?.payload?.data;
      })
      .addCase(postJourney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
     // getAllJourney By DriverId
      .addCase(getAllJourneyByDriverId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJourneyByDriverId.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("User = ", action.payload);
        state.journey = action?.payload?.data;
      })
      .addCase(getAllJourneyByDriverId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const {
  setAuthLoaderFalse,
  logoutUser,
  signUpUser,
  updateUserCoordinate,
} = authSlice.actions;

export default authSlice.reducer;
