import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Alert, Linking, Platform } from "react-native";
import Key from "../constants/key";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/selector/authSelector";
import { uploadSingleDocument } from "../redux/thunk/documentThunk";
import { showSnackbar } from "../redux/slice/snackbarSlice";
export const setupImagePicker = (file, label) => {
  // console.log("inside setup image");

  const fileExtension = file.split(".").pop().toLowerCase(); // Get the file extension
  const supportedFormats = ["jpg", "jpeg", "png"]; // Supported formats

  if (!supportedFormats.includes(fileExtension)) {
    throw new Error(
      "Unsupported file format. Please upload a JPG or PNG image."
    );
  }
  // console.log("File extension passed:", fileExtension);
  const mimeType = `image/${fileExtension}`; // Dynamically set MIME type
  const fileName = `${label}.${fileExtension}`; // Dynamically set file name

  // Prepare the form data for the API call
  const formData = new FormData();
  formData.append("file", {
    uri: file,
    name: fileName,
    type: mimeType,
  });

  return formData;
};

export const handleImageUpload = async (file, label, user, dispatch) => {
  console.log("this is file = ", file);
  const data = {
    file,
    driverId: user?.driverId,
    // driverId: parseInt(user?.driverId, 10),
    documentName: label,
  };

  if (file && label) {
    const response = await dispatch(uploadSingleDocument(data));
    if (uploadSingleDocument.fulfilled.match(response)) {
      return response?.payload?.data;
    } else {
      dispatch(
        showSnackbar({
          message:
            response?.payload?.message ||
            response?.payload?.title ||
            "Document Not Uploaded. Please try again",
            type:"error",
            time: 5000
        })
      );
      return null;
    }
  } else {
  }
};
export const openGallery = async (
  currentImageSetter,      
  label,       
  setImageLoading,         
  setBottomSheetVisible,   
  user,                   
  dispatch  
) => {
  setImageLoading(label);
  setBottomSheetVisible(false);
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: label === "avatar" ? [1, 1] : undefined,
      quality: 0.2,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      console.log("Raw ImageURi = ", imageUri);
      // console.log('Raw ImageURi = ', imageUri);
      const file = await setupImagePicker(imageUri, label);
      // file.append("driverId", driverId.toString());
      // file.append("documentName", documentName);

      console.log("File  = ", file);
      const googleDriveURI = await handleImageUpload(
        file,
        label,
        user,
        dispatch
      );
      console.log("google Drive URI ", googleDriveURI+"&t="+Date.now());//to make unique url , to replace cache data
      currentImageSetter(googleDriveURI+"&t="+Date.now());
      return imageUri;
    }
  } catch (error) {
    console.log("Error uploading file:", error);
    Alert.alert("Error", "Upload failed. Please try again.");
  } finally {
    setImageLoading(null);
    setBottomSheetVisible(false);
  }

  return null;
};

export const openCamera = async (
  currentImageSetter,
  label,
  setImageLoading,
  setBottomSheetVisible,
  user,
  dispatch
) => {
  console.log("This is label of image:", label);
  setImageLoading(label);
  setBottomSheetVisible(false);

  try {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.1,
      allowsEditing: true,
      aspect: label === "avatar" ? [1, 1] : undefined,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      console.log("Raw ImageURI =", imageUri);

      const file = await setupImagePicker(imageUri, label);
      console.log("File =", file);

      const googleDriveURI = await handleImageUpload(
        file,
        label,
        user,
        dispatch
      );
      console.log("Google Drive URI =", googleDriveURI);

          currentImageSetter(googleDriveURI+"&t="+Date.now());
      return imageUri;
    }
  } catch (error) {
    console.log("Error uploading file:", error);
    Alert.alert("Error", "Upload failed. Please try again.");
  } finally {
    setImageLoading(null);
    setBottomSheetVisible(false);
  }

  return null;
};


export const removeImage = (setter, setBottomSheetVisible) => {
  setter(null);
  setBottomSheetVisible(false);
};

export const showFullImageFunction = (
  uri,
  setSelectedImage,
  setModalVisible
) => {
  if (!uri) return;
  setSelectedImage(uri);
  setModalVisible(true);
};

export const getUserLocation = async ({
  setRegion,
  setCurrentLocation,
  mapRef,
  setErrorMsg,
}) => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      const fallback = {
        latitude: 28.6139,
        longitude: 77.209,
      };
      setRegion({ ...fallback, latitudeDelta: 0.05, longitudeDelta: 0.05 });
      setCurrentLocation(fallback);
      return fallback;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    setCurrentLocation({ latitude, longitude });

    if (mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: { latitude, longitude },
          zoom: 15,
        },
        { duration: 0 }
      );
    }
    console.log("user Current location", latitude, longitude);
    return { latitude, longitude };
  } catch (error) {
    console.log("Error requesting location:", error);
    const fallback = {
      latitude: 28.6139,
      longitude: 77.209,
    };
    setRegion({ ...fallback, latitudeDelta: 0.05, longitudeDelta: 0.05 });
    setCurrentLocation(fallback);
    return fallback;
  }
};

export const fetchAddressFromCoordinates = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Key.mapApiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].formatted_address;
    }
  } catch (error) {
    console.log("Error fetching address:", error);
    return null;
  }
};

export const fetchAddressComponent = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Key.mapApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK" || !data.results.length) {
      console.log("Geocoding failed:", data.status);
      return null;
    }

    const address = data.results[0].formatted_address;
    const locationComponents = data.results[0].address_components;

    const cityComponent = locationComponents.find(
      (component) =>
        component.types.includes("locality") ||
        component.types.includes("administrative_area_level_2")
    );
    const state = locationComponents.find((component) =>
      component.types.includes("administrative_area_level_1")
    );
    const country = locationComponents.find((component) =>
      component.types.includes("country")
    );
    const pinCode = locationComponents.find((component) =>
      component.types.includes("postal_code")
    );

    const city = cityComponent ? cityComponent.long_name : "";
    const addressData = {
      latitude,
      longitude,
      address,
      city,
      state: state ? state.long_name : "",
      pinCode: pinCode ? pinCode.long_name : "",
      country: country ? country.long_name : "",
    };
    // console.log("address data in fetchAddress ", addressData);    
    return addressData;
  } catch (error) {
    console.log("Error fetching address:", error);
    return null;
  }
};

export const fetchImageForCity = async ({ city }) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=mountain&orientation=landscape&client_id=${Key.unsplashApiKey}`
  );
  const data = await response.json();
  // console.log("image data",data?.urls?.regular);
  if (data && data?.urls) {
    return data?.urls?.regular;
  }
};

export const trimText = (text, maxLength) => {
  if (typeof text !== "string") return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    weekday: "long",    // e.g., Sunday
    year: "numeric",    // e.g., 2025
    month: "long",      // e.g., June
    day: "numeric",     // e.g., 8
    hour: "numeric",    // e.g., 12
    minute: "2-digit",  // e.g., 38
    hour12: true,       // AM/PM format
  });
};

// Map enum names to abbreviations
const weightUnitAbbreviations = {
  GRAMS: "g",
  KILOGRAMS: "kg",
  POUNDS: "lb",
  OUNCES: "oz",
  MILLIGRAMS: "mg",
  TONNES: "Ton",
};


export const getWeightUnitAbbreviation = (enumName) => {
  return weightUnitAbbreviations[enumName] || enumName;
};


// Map enum names to abbreviations for DimensionUnit
const dimensionUnitAbbreviations = {
  CENTIMETERS: "cm",
  METERS: "m",
  INCHES: "in",
  FEET: "ft",
  MILLIMETERS: "mm",
};

export const getDimensionUnitAbbreviation = (enumName) => {
  return dimensionUnitAbbreviations[enumName] || enumName;
};

export  const openGoogleMaps = (latitude, longitude, label = 'dRoute Service') => {
  const encodedLabel = encodeURIComponent(label);
  const url = Platform.select({
    ios: `maps://?q=${encodedLabel}&ll=${latitude},${longitude}`,
    android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${encodedLabel})`,
  });
  Linking.openURL(url);
};



