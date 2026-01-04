import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import {
  ButtonWithLoader,
  commonAppBar,
  inputBox,
  reUsableBottomSheet,
  typeSection,
} from "../../components/commonComponents";
import { fetchAddressComponent, trimText } from "../../utils/commonMethods";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors, commonStyles, Sizes } from "../../constants/styles";
import { FlatList, Pressable } from "react-native-gesture-handler";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../redux/slice/snackbarSlice";
import { selectUser } from "../../redux/selector/authSelector";
import { postJourney } from "../../redux/thunk/journeyThunk";
const suggestionStateList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Jammu and Kashmir",
];

  const CapacitySection = ({
    weightUnit,
    setWeightUnit,
    lengthUnit,
    setLengthUnit,
    weight,
    setWeight,
    length,
    setLength,
    height,
    setHeight,
    width,
    setWidth,
  }) => (
    <>
      <View style={styles.section}>
        {typeSection(weightUnit, setWeightUnit, "Select Weight Unit", false, [
          { label: "Ton", value: "Ton" },
          { label: "kg", value: "Kg" },
        ])}
      </View>

      <View style={styles.section}>
        {typeSection(lengthUnit, setLengthUnit, "Select Length Unit", false, [
          { label: "meter", value: "m" },
          { label: "foot", value: "ft" },
          { label: "Centimeter", value: "cm" },
        ])}
      </View>

      <View style={[styles.section, commonStyles.rowSpaceBetween]}>
        <LabeledInput
          label={`Weight (${weightUnit})`}
          placeholder="Enter Weight Capacity"
          value={weight}
          setter={setWeight}
          required
          style={{ marginRight: 8 }}
        />
        <LabeledInput
          label={`Length (${lengthUnit})`}
          placeholder="Enter Length"
          value={length}
          setter={setLength}
          required
          style={{ marginLeft: 8 }}
        />
      </View>

      <View style={[styles.section, commonStyles.rowSpaceBetween]}>
        <LabeledInput
          label={`Height (${lengthUnit})`}
          placeholder="Enter Height"
          value={height}
          setter={setHeight}
          required
          style={{ marginRight: 8 }}
        />
        <LabeledInput
          label={`Width (${lengthUnit})`}
          placeholder="Enter Width"
          value={width}
          setter={setWidth}
          required
          style={{ marginLeft: 8 }}
        />
      </View>
    </>
  );

  const LabeledInput = ({
    label,
    placeholder,
    value,
    setter,
    required = false,
    style,
  }) => {
    return (
      <View style={[{ flex: 1 }, style]}>
        <Text style={styles.sectionLabel}>
          {label}
          {required && (
            <Text style={{ color: Colors.darkOrangeColor }}> *</Text>
          )}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => setter(text)}
          maxLength={80}
          keyboardType="numeric"
        />
      </View>
    );
  };
const PostJourney = ({ route, navigation }) => {
  const { data } = route?.params;
  // route?.params;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState("locationDetail");
  const [selectedField, setSelectedField] = useState(null);
  const [departureDateTime, setDepartureDateTime] = useState("");
  const [arrivalDateTime, setArrivalDateTime] = useState("");
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [length, setLength] = useState(null);
  const [lengthUnit, setLengthUnit] = useState(null);
  const [weightUnit, setWeightUnit] = useState(null);
  const [stateList, setStateList] = useState([]);
  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  console.log("date time is ", departureDateTime);

  // console.log("Data to be submitted:", data);

  const handleSubmit = async () => {
    // Validate required fields
    if (
      !departureDateTime ||
      !arrivalDateTime ||
      !weight ||
      !height ||
      !width ||
      !length ||
      !lengthUnit ||
      !weightUnit ||
      stateList.length === 0
    ) {
      await dispatch(
        showSnackbar({
          message: "Please Fill all The Details First",
          type: "error",
          time: 3000,
        })
      );
      return;
    }

    // Date formatting function
const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return null;

  try {
    const [datePart, timePartWithMeridiemRaw] = dateTimeStr.split(", ");
    const [month, day, year] = datePart.split("/");

    const timePartWithMeridiem = timePartWithMeridiemRaw.replace(/\u202F|\u00A0/g, " ");
    const [time, meridiem] = timePartWithMeridiem.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (meridiem.toLowerCase() === "pm" && hours !== 12) {
      hours += 12;
    } else if (meridiem.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return null;
  }
};


    // Prepare the data object

    const journeySource = await fetchAddressComponent(
      data?.sourceCoordinate?.latitude,
      data?.sourceCoordinate?.longitude
    );
    const journeyDestination = await fetchAddressComponent(
      data?.destinationCoordinate?.latitude,
      data?.destinationCoordinate?.longitude
    );

    const journeyData = {
      driverId: user?.driverId,
      journeySource: journeySource,
      journeyDestination: journeyDestination,
      visitedStateDuringJourney: stateList.join(','),

      availableLength: length,
      availableWidth: width,
      availableHeight: height,
      availableSpaceMeasurementType: lengthUnit,

      availableWeight: weight,
      availableWeightMeasurementType: weightUnit,
      expectedDepartureDateTime: formatDateTime(departureDateTime),
      expectedArrivalDateTime: formatDateTime(arrivalDateTime),
    };

    setIsLoading(true);

    try {
      console.log(
        "Formatted Journey data to be submitted:",
        JSON.stringify(journeyData, null, 2)
      );

      const response = await dispatch(postJourney(journeyData));

      if (postJourney.fulfilled.match(response)) {
        console.log("Journey created successfully:", response.payload);

        await dispatch(
          showSnackbar({
            message: response?.payload?.message || "Journey created successfully.",
            type: "success",
            time: 3000,
          })
        );

      navigation.navigate("BottomNavigationBar");

      } else {
        console.error("Failed to create journey:", response.payload);
        await dispatch(
          showSnackbar({
            message: response?.payload?.message || "Failed to create journey.",
            type: "error",
            time: 3000,
          })
        );

        return;
       
      }
    } catch (error) {
      console.error("Submission error:", error);
      await dispatch(
        showSnackbar({
          message: "Failed to create journey. Please try again.",
          type: "error",
          time: 3000,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };
  const toggleState = (state) => {
    if (stateList.includes(state)) {
      setStateList(stateList.filter((s) => s !== state));
    } else {
      setStateList([...stateList, state]);
    }
  };
  const removeState = (stateToRemove) => {
    setStateList(stateList.filter((state) => state !== stateToRemove));
  };

  const handleDatePick = (date) => {
    const formatted = date.toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (selectedField === "departure") {
      setDepartureDateTime(formatted);
    } else if (selectedField === "arrival") {
      setArrivalDateTime(formatted);
    }

    hidePicker();
  };

  const handleVisibility = (form) => {
    const formKey = String(form);
    if (selectedForm !== formKey) {
      setSelectedForm(formKey);
    }
  };


  return (
    <ScrollView scrollEnabled={!dropdownVisible} style={styles.container}>
      <MyStatusBar />
      {commonAppBar("Post journey", navigation)}
      {locationDetail?.()}
      {additionalDetail?.()}

      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 50,
        }}
      >
        {ButtonWithLoader("Submit", "Processing..", isLoading, handleSubmit)}
      </View>
    </ScrollView>
  );

  function locationDetail() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          handleVisibility("locationDetail");
          if (dropdownVisible) setDropdownVisible(false);
        }}
      >
        <View style={styles.card}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.sectionTitle}>Location Detail</Text>
            <Ionicons
              name={
                selectedForm === "locationDetail"
                  ? "caret-back-outline"
                  : "caret-down-outline"
              }
              size={18}
              color={Colors.primaryColor}
            />
          </View>

          {selectedForm === "locationDetail" && (
            <>
              <View style={styles.routeContainer}>
                <View style={styles.timeline}>
                  <View style={styles.timelineCircleFilled} />
                  <View style={styles.timelineLine} />
                  <View style={styles.timelineCircleEmpty} />
                </View>

                <View style={styles.addressesContainer}>
                  <Text style={styles.addressText}>
                    {trimText(data?.sourceAddress, 45)}
                  </Text>
                  <View style={{ height: 25 }} />
                  <Text style={styles.addressText}>
                    {trimText(data?.destinationAddress, 45)}
                  </Text>
                </View>
              </View>

              {statesContainer?.()}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  }
  function statesContainer() {
    return (
      <View style={{ marginBottom: 12 }}>
        <TouchableOpacity
          style={styles.stateSelectorButton}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.stateSlectorButtonText}>
            Choose States You Will Pass Through
          </Text>
          <Ionicons
            name="caret-down-outline"
            size={18}
            color={Colors.primaryColor}
          />
        </TouchableOpacity>
        {reUsableBottomSheet(dropdownVisible, setDropdownVisible, statesList)}

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {stateList.map((state, index) => (
            <View
              key={index}
              style={[
                styles.stateButton,
                { ...commonStyles.rowSpaceBetween, gap: 10 },
              ]}
            >
              <Text style={styles.TypebuttonText}>{state}</Text>
              <TouchableOpacity onPress={() => removeState(state)}>
                <Ionicons
                  name="close-circle-outline"
                  size={18}
                  color={Colors.orangeColor}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }
  function statesList() {
    return (
      <FlatList
        data={suggestionStateList}
        keyExtractor={(state) => state}
        renderItem={({ item: state }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => toggleState(state)}
          >
            <Text>{state}</Text>
            <Ionicons
              name={stateList.includes(state) ? "checkbox" : "square-outline"}
              size={20}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        )}
      />
    );
  }
  function additionalDetail() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleVisibility("additionalDetail")}
      >
        <View style={styles.card}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.sectionTitle}>Additional Detail</Text>
            <Ionicons
              name={
                selectedForm === "additionalDetail"
                  ? "caret-back-outline"
                  : "caret-down-outline"
              }
              size={18}
              color={Colors.primaryColor}
            />
          </View>
          {selectedForm === "additionalDetail" && (
            <>
              {dateTimeInfo?.()}
              <CapacitySection
                weightUnit={weightUnit}
                setWeightUnit={setWeightUnit}
                lengthUnit={lengthUnit}
                setLengthUnit={setLengthUnit}
                weight={weight}
                setWeight={setWeight}
                length={length}
                setLength={setLength}
                height={height}
                setHeight={setHeight}
                width={width}
                setWidth={setWidth}
              />
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  }
  function dateTimeInfo() {
    return (
      <>
        <Text style={styles.sectionLabel}>
          Date & Time <Text style={{ color: Colors.darkOrangeColor }}> *</Text>
        </Text>
        <View style={styles.customTimeContainer}>
          <TouchableOpacity
            style={styles.timeInput}
            onPress={() => {
              setSelectedField("departure");
              showPicker();
            }}
          >
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              {departureDateTime || "Departure Time"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.timeInput}
            onPress={() => {
              setSelectedField("arrival");
              showPicker();
            }}
          >
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              {arrivalDateTime || "Arrival Time"}
            </Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="datetime"
          onConfirm={handleDatePick}
          onCancel={hidePicker}
        />
      </>
    );
  }
};

export default PostJourney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginBottom: 6,
  },
  //Location detail
  routeContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  timeline: {
    width: 20,
    alignItems: "center",
    marginRight: 8,
  },
  timelineCircleFilled: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primaryColor,
  },
  timelineLine: {
    width: 1,
    height: 25,
    backgroundColor: Colors.primaryColor,
    marginVertical: 4,
    borderStyle: "dotted",
    borderWidth: 1,
  },
  timelineCircleEmpty: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.whiteColor,
  },
  addressesContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 12,
    color: Colors.blackColor,
    lineHeight: 15,
  },
  customTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 8,
    padding: 10,
    fontSize: 12,
    width: "48%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
    fontSize: 12,
  },
  section: {
    marginBottom: 12,
  },
  //state
  stateButton: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.grayColor,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  TypebuttonText: {
    fontSize: 12,
    color: Colors.grayColor,
  },
  stateSelectorButton: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 8,
    padding: Sizes.fixPadding * 1,
    marginVertical: 20,
  },
  stateSlectorButtonText: {
    color: Colors.primaryColor,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
  },

  suggestionItem: {
    padding: 10,
    borderBottomColor: Colors.extraLightGrayColor,
    borderBottomWidth: 0.5,
    ...commonStyles.rowSpaceBetween,
  },
});
