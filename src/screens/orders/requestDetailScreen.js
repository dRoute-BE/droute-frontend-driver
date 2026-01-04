import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { actionOverlay, commonAppBar } from "../../components/commonComponents";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, commonStyles, Fonts } from "../../constants/styles";
import {
  getDimensionUnitAbbreviation,
  getWeightUnitAbbreviation,
} from "../../utils/commonMethods";

const RequestDetailScreen = ({ navigation, route }) => {
  const { pendingOrder } = route.params || {};

  useEffect(() => {
    console.log("This is pendingOrder:", pendingOrder);
  }, []);

  const [isAcceptModalVisible, setAcceptModalVisible] = useState(false);
  const [isRejectModalVisible, setRejectModalVisible] = useState(false);
  const image = null;

  // console.log("this is pendingOrder courier",pendingOrder)
  const handleAccept = () => {};
  const handleReject = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />
      {commonAppBar("Request Detail", navigation)}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.userContainer}>
          <View style={styles.userInfo}>
            {image ? (
              <Image source={{ uri: image }} style={styles.userImage} />
            ) : (
              <View style={styles.userImagePlaceholder}>
                <MaterialIcons
                  name="person"
                  size={26}
                  color={Colors.grayColor}
                />
              </View>
            )}
            <View style={styles.userDetails}>
              <Text style={styles.userName}>
                {pendingOrder?.courier?.user?.fullName || "Na"}
              </Text>
              <Text style={{ ...Fonts.grayColor12Medium }}>
                +91 {pendingOrder?.courier?.user?.contactNo || "Na"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("ChatScreen")}
            style={styles.chatIcon}
          >
            <MaterialIcons name="chat" size={26} color="teal" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />
        <View style={styles.locationsContainer}>
          <LocationItem
            title={"Pickup Address"}
            address={pendingOrder?.courier?.courierSourceAddress || "Na"}
          />
          <LocationItem
            title={"Delivery Addess"}
            address={pendingOrder?.courier?.courierDestinationAddress || "Na"}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Package Details:</Text>
          <View style={styles.divider} />
          <View style={{ marginTop: 8 }}>
            <DetailRow
              label={"Height"}
              value={`${
                pendingOrder?.courier?.courierHeight ?? "Na"
              } ${getDimensionUnitAbbreviation(
                pendingOrder?.courier?.courierDimensionUnit
              )}`}
            />
            <DetailRow
              label={"Width"}
              value={`${
                pendingOrder?.courier?.courierWidth ?? "Na"
              } ${getDimensionUnitAbbreviation(
                pendingOrder?.courier?.courierDimensionUnit
              )}`}
            />
            <DetailRow
              label={"Length"}
              value={`${
                pendingOrder?.courier?.courierLength ?? "Na"
              } ${getDimensionUnitAbbreviation(
                pendingOrder?.courier?.courierDimensionUnit
              )}`}
            />
            <DetailRow
              label={"Weight"}
              value={`${
                pendingOrder?.courier?.courierWeight ?? "Na"
              } ${getWeightUnitAbbreviation(
                pendingOrder?.courier?.courierWeightUnit
              )}`}
            />
            <DetailRow
              label={"Expected Value"}
              value={`₹ ${pendingOrder?.courier?.courierValue ?? "Na"}`}
            />
            <DetailRow
              label={"Offered Value"}
              value={`₹ ${pendingOrder?.order?.offeredFare ?? "Na"}`}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          onPress={() => setRejectModalVisible(true)}
          style={{ ...commonStyles.outlinedButton, flex: 1 }}
        >
          <Text style={{ ...commonStyles.outlinedButtonText }}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAcceptModalVisible(true)}
          style={{ ...commonStyles.button, flex: 1 }}
        >
          <Text style={{ ...commonStyles.buttonText }}>Accept</Text>
        </TouchableOpacity>
      </View>
      {actionOverlay(
        handleAccept,
        isAcceptModalVisible,
        setAcceptModalVisible,
        "Do You Want to Accept ?",
        Colors.primaryColor
      )}
      {actionOverlay(
        handleReject,
        isRejectModalVisible,
        setRejectModalVisible,
        "Do You Want to Reject ?",
        Colors.darkOrangeColor
      )}
    </SafeAreaView>
  );
  function LocationItem({ title, address }) {
    return (
      <View style={styles.locationItem}>
        <View style={styles.locationMarker}>
          <MaterialIcons name="location-on" size={20} color="teal" />
        </View>
        <View style={styles.locationInfo}>
          <Text style={{ ...Fonts.blackColor14Bold, marginBottom: 4 }}>
            {title}
          </Text>
          <Text style={{ ...Fonts.grayColor12Medium }}>{address}</Text>
        </View>
      </View>
    );
  }
  function DetailRow({ label, value }) {
    return (
      <View style={{ ...commonStyles.rowSpaceBetween, paddingVertical: 8 }}>
        <Text style={{ ...Fonts.blackColor12SemiBold }}>{label}:</Text>
        <Text style={{ ...Fonts.blackColor12SemiBold }}>{value}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  content: {
    flex: 1,
  },
  userContainer: {
    ...commonStyles.rowSpaceBetween,
    padding: 16,
  },
  userInfo: {
    ...commonStyles.rowAlignCenter,
  },
  userImagePlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: Colors.extraLightGrayColor,
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userDetails: {
    marginLeft: 12,
  },
  userName: {
    ...Fonts.blackColor16Bold,
    color: Colors.primaryColor,
    marginBottom: 4,
  },
  chatIcon: {
    alignItems: "flex-end",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.extraLightGrayColor,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    ...Fonts.blackColor14Bold,
    marginVertical: 8,
  },
  locationsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  locationItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  locationMarker: {
    width: 24,
    alignItems: "center",
  },

  locationInfo: {
    flex: 1,
    marginLeft: 8,
  },

  bottomButtons: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: Colors.extraLightGrayColor,
  },
});

export default RequestDetailScreen;
