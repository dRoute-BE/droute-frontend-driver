import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Colors, commonStyles, Fonts, screenWidth } from "../constants/styles";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { formatDateTime, getDimensionUnitAbbreviation, getWeightUnitAbbreviation } from "../utils/commonMethods";
// Journey =  [
//   {
//     "journeyId": 1,
//     "driverId": 1,
//     "journeySource": {
//       "locationId": 2,
//       "longitude": "77.0941087",
//       "latitude": "28.4921191",
//       "address": "U-46/24, Gali Number 5 NATHUPURA, 25, U Block, U Block, DLF Phase 3, Sector 24, Gurugram, Haryana 122022, India",
//       "city": "Gurugram",
//       "pinCode": null,
//       "country": "India"
//     },
//     "journeyDestination": {
//       "locationId": 1,
//       "longitude": "84.0188781",
//       "latitude": "24.9560393",
//       "address": "Sasaram Junction, Dilia, Sasaram, Bihar 821115, India",
//       "city": "Sasaram",
//       "pinCode": null,
//       "country": "India"
//     },
//     "visitedStateDuringJourney": "Bihar,Delhi,Haryana,Uttar Pradesh",
//     "availableLength": 5,
//     "availableWidth": 3,
//     "availableHeight": 3,
//     "availableSpaceMeasurementType": "METERS",
//     "availableWeight": 500,
//     "availableWeightMeasurementType": "KILOGRAMS",
//     "status": "NOT_STARTED",
//     "expectedDepartureDateTime": "2025-06-08T00:38:00",
//     "expectedArrivalDateTime": "2025-06-10T00:38:00"
//   }
export const JourneyCard = ({ journey }) => {
  return (
    <View style={styles.card}>
      <View style={styles.routeContainer}>
        <View style={styles.locationContainer}>
          <MaterialIcons
            name="location-on"
            size={20}
            color={Colors.primaryColor}
          />
          <View style={styles.fromContainer}>
            <Text style={styles.label}>From:</Text>
            <Text style={styles.descriptionText}>
              {" "}
              {journey?.journeySource?.city}
            </Text>
          </View>
        </View>

        <MaterialIcons
          name="arrow-right-alt"
          size={20}
          color={Colors.grayColor}
          style={styles.arrowIcon}
        />

        <View style={styles.toContainer}>
          <Text style={styles.label}>To:</Text>
          <Text style={styles.descriptionText}>
            {" "}
            {journey?.journeyDestination?.city}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.timeContainer}>
        <MaterialCommunityIcons
          name="clock-time-four-outline"
          size={18}
          color={Colors.blackColor}
        />
        <View style={styles.timeTextContainer}>
          <Text style={styles.label}>Departure:{" "}</Text>
          <Text style={styles.descriptionText}>
             {formatDateTime(journey?.expectedDepartureDateTime)}
          </Text>
        </View>
      </View>

      <View style={styles.timeContainer}>
        <MaterialCommunityIcons
          name="clock-time-four-outline"
          size={18}
          color={Colors.blackColor}
        />
        <View style={styles.timeTextContainer}>
          <Text style={styles.label}>Arrival:{" "}</Text>
          <Text style={styles.descriptionText}>
            {formatDateTime(journey?.expectedArrivalDateTime)}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.spaceContainer}>
        <View style={{ ...commonStyles.rowSpaceBetween }}>
          <FontAwesome name="cube" size={18} color={Colors.blackColor} />
          <View style={styles.spaceTextContainer}>
            <Text style={styles.label}>Available Space:</Text>
            <Text style={styles.descriptionText}>{journey?.availableLength*journey?.availableWidth*journey?.availableHeight}{" "}{getDimensionUnitAbbreviation(journey?.availableSpaceMeasurementType)}^3</Text>
          </View>
        </View>
        <View style={{ ...commonStyles.rowSpaceBetween }}>
          <FontAwesome name="balance-scale" size={18} color={Colors.blackColor} />
          <View style={styles.spaceTextContainer}>
            <Text style={styles.label}>Weight Capacity:</Text>
            <Text style={styles.descriptionText}>{journey?.availableWeight}{" "}{getWeightUnitAbbreviation(journey?.availableWeightMeasurementType)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.packagesButton}>
          <Text style={styles.packagesText}>Total Orders: {journey?.totalConfirmedPackages || 0}</Text>
        </View>

        <View>
          <Text
            style={{
              ...Fonts.primaryColor12SemiBold,
              fontWeight: "700",
              color: journey?.status==="COMPLETED"?"green":Colors.darkOrangeColor,
            }}
          >
            {journey?.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const LoadingJourneyCard = ({ count = 1 }) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const shimmerStyle = {
    opacity: shimmerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
  };

  const renderPlaceholder = (width, height = 12, marginVertical = 4) => (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: Colors.extraLightGrayColor,
          borderRadius: 4,
          marginVertical,
        },
        shimmerStyle,
      ]}
    />
  );

  const renderCard = (_, index) => (
    <View key={index} style={styles.card}>
      {renderPlaceholder("70%", 12)}
      {renderPlaceholder("90%")}
      {renderPlaceholder("80%")}
      <View style={styles.divider} />
      {renderPlaceholder("60%")}
      {renderPlaceholder("65%")}
      <View style={styles.divider} />
      {renderPlaceholder("50%")}
      <View style={styles.bottomContainer}>
        <View
          style={[
            styles.packagesButton,
            { backgroundColor: Colors.extraLightGrayColor },
          ]}
        >
          {renderPlaceholder("60%", 12, 0)}
        </View>
        {renderPlaceholder("25%", 12, 0)}
      </View>
    </View>
  );

  return <>{Array.from({ length: count }).map(renderCard)}</>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    padding: 16,
    margin: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  routeContainer: {
    flexDirection: "row",
    // justifyContent:"space-around",
    alignItems: "center",
    marginBottom: 3,
  },
  locationContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  fromContainer: {
    ...commonStyles.rowAlignCenter,
    marginLeft: 8,
    flexWrap: "wrap",
  },
  label: {
    ...Fonts.blackColor12Bold,
  },
  descriptionText: {
    ...Fonts.blackColor12Medium,
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
  toContainer: {
    flex: 1,
    ...commonStyles.rowAlignCenter,
    flexWrap: "wrap",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.extraLightGrayColor,
    marginVertical: 4,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  timeTextContainer: {
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  spaceContainer: {
    ...commonStyles.rowSpaceBetween,
    marginBottom: 10,
  },
  spaceTextContainer: {
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  packagesButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  packagesText: {
    color: Colors.whiteColor,
    fontWeight: "bold",
    fontSize: 12,
  },
  viewDetailsText: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
