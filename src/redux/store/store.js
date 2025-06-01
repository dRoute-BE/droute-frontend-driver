import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import authReducer, { restoreUser } from ;
import authReducer, { restoreUser } from "../slice/authSlice";
import snackbarReducer, { showSnackbar } from "../slice/snackbarSlice";
import { getDriverByDriverId } from "../thunk/authThunk";

const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const loadUserData = async () => {
  try {
    const driver_id = await AsyncStorage.getItem("driver_id");
    // const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("user key in store", driver_id);
    // console.log("Access token in store", accessToken);
    // if (driver_id && accessToken) {
    if (driver_id) {
      await store.dispatch(getDriverByDriverId(parseInt(driver_id)));
    }
  } catch (error) {
    console.log("Error loading user data:", error);
    store.dispatch(
      showSnackbar({ message: "Logged-In failed. Try again", type: "error" })
    );
  }
};

loadUserData();

export default store;
