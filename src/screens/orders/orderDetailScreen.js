import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  actionOverlay,
  circularLoader,
  commonAppBar,
  fullImageContainer,
  ImageBottomSheet,
  inputBox,
  otpFields,
  renderImageBox,
  reUsableOverlayWithButton,
} from "../../components/commonComponents";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, commonStyles, Fonts } from "../../constants/styles";
import SwipeableTabs from "../../components/swipeableTabs";
import { ParcelCard, ParcelLoadingCard } from "../../components/parcelCard";
import { FlatList, TextInput } from "react-native-gesture-handler";
import {
  getDimensionUnitAbbreviation,
  getWeightUnitAbbreviation,
  openGoogleMaps,
  showFullImageFunction,
} from "../../utils/commonMethods";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/selector/authSelector";
import LottieView from "lottie-react-native";
import {
  DottedBlackLoader,
  DottedLoader,
  LottieFaiure,
  LottieSuccess,
} from "../../components/lottieLoader/loaderView";
const OrderDetailScreen = ({ navigation, route }) => {
  //image start

  const { item } = route?.params;
  const [imageloading, setImageLoading] = useState("");
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [currentImageSetter, setCurrentImageSetter] = useState(null);
  const [currentImageLabel, setCurrentImageLabel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  //image end
  const [pickupParcelImage, setPickupParcelImage] = useState(null);
  const [deliveryParcelImage, setDeliveryParcelImage] = useState(null);
  const [isPickupModalVisible, setPickupModalVisible] = useState(false);
  const [isDeliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const [isPickupOtpVisible, setPickupOtpVisible] = useState(false);
  const [isDeliveryOtpVisible, setDeliveryOtpVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pickupOtp, setPickupOtp] = useState(null);
  const [deliveryOtp, setDeliveryOtp] = useState(null);
  //   const [deliveryOtpSent, setDeliveryOtpSent] = useState(false);
  //   const [pickupOtpSent, setPickupOtpSent] = useState(false);

  //true
  const image = null;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handlePickupSubmit = () => {};

  const handleDeliverySubmit = () => {};
  const sendPickupOtp = () => {
    closeModal();
    setPickupModalVisible(true);
  };
  const sendDeliveryOtp = () => {
    closeModal();
    setDeliveryModalVisible(true);
  };

  const closeModal = () => {
    setPickupModalVisible(false);
    setDeliveryModalVisible(false);
    setPickupOtpVisible(false);
    setDeliveryOtpVisible(false);
  };

  const SenderDetailTab = () => {
    return (
      <>
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
                  {item?.courier?.user?.fullName}
                </Text>
                <Text style={{ ...Fonts.grayColor12Medium }}>
                  +91 {item?.courier?.user?.contactNo}
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
          <View style={styles.locationsContainer}>
            <LocationItem
              title="Sender Address"
              address={item?.courier?.courierSourceAddress}
            />
            <LocationItem
              title="Landmark"
              address={item?.order?.senderLandmarkAddress}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Parcel Detail:</Text>
            <View style={styles.divider} />
            <View style={{ marginTop: 8 }}>
              <DetailRow
                label="Height"
                value={`${
                  item?.courier?.courierHeight
                } ${getDimensionUnitAbbreviation(
                  item?.courier?.courierDimensionUnit
                )}}`}
              />
              <DetailRow
                label="Width"
                value={`${
                  item?.courier?.courierHeight
                } ${getDimensionUnitAbbreviation(
                  item?.courier?.courierDimensionUnit
                )}}`}
              />
              <DetailRow
                label="Length"
                value={`${
                  item?.courier?.courierLength
                } ${getDimensionUnitAbbreviation(
                  item?.courier?.courierDimensionUnit
                )}}`}
              />
              <DetailRow
                label="Weight"
                value={`${
                  item?.courier?.courierWeight
                } ${getWeightUnitAbbreviation(
                  item?.courier?.courierWeightUnit
                )}}`}
              />
              <DetailRow
                label="Value"
                value={`${
                  item?.courier?.courierValue
                } ${getDimensionUnitAbbreviation(
                  item?.courier?.courierDimensionUnit
                )}}`}
              />
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Payment Detail :</Text>
            <View style={styles.divider} />
            <View style={{ marginTop: 8 }}>
              <DetailRow label="Delivery Charge" value={`${amount} ₹`} />
              <DetailRow
                label="Insurance Charge"
                value={`${insuranceCharge.toFixed(2)} ₹`}
              />
              <DetailRow label="GST" value={`${gst.toFixed(2)} ₹`} />
              <DetailRow label="Platform & Handeling Charge" value="5%" />
              <DetailRow label="Total" value={`${total.toFixed(2)} ₹`} />
            </View>
          </View>
          <View style={styles.divider} />
        </ScrollView>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              const [latitude, longitude] =
                item?.courier?.courierSourceCoordinate?.split(",") || [];
              if (latitude && longitude) {
                openGoogleMaps(
                  latitude.trim(),
                  longitude.trim(),
                  `${item?.order?.senderName}'s Location`
                );
              }
            }}
            style={{ ...commonStyles.outlinedButton, flex: 1 }}
          >
            <Text style={commonStyles.outlinedButtonText}>Sender Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPickupOtpVisible(true)}
            style={{ ...commonStyles.button, flex: 1 }}
          >
            <Text style={commonStyles.buttonText}>Pickup</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const RecieverDetailTab = () => {
    return (
      <>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.userContainer}>
            <View style={styles.userInfo}>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{item?.order?.recieverName}</Text>
                <Text style={{ ...Fonts.grayColor12Medium }}>
                  +91 {item?.order?.recieverContactNo}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.locationsContainer}>
            <LocationItem
              title="Delivery Address"
              address={item?.courier?.courierDestinationAddress}
            />
            <LocationItem
              title="Landmark"
              address={item?.order?.recieverLandmarkAddress}
            />
          </View>

          <View style={styles.divider} />
        </ScrollView>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              const [latitude, longitude] =
                item?.courier?.courierDestinationCoordinate?.split(",") || [];
              if (latitude && longitude) {
                openGoogleMaps(
                  latitude.trim(),
                  longitude.trim(),
                  `${item?.order?.recieverName}'s Location`
                );
              }
            }}
            style={{ ...commonStyles.outlinedButton, flex: 1 }}
          >
            <Text style={commonStyles.outlinedButtonText}>Reciever Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setDeliveryOtpVisible(true)}
            style={{ ...commonStyles.button, flex: 1 }}
          >
            <Text style={commonStyles.buttonText}>Deliver</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const LocationItem = ({ title, address }) => {
    return (
      <View style={styles.locationItem}>
        <View style={styles.locationMarker}>
          <MaterialIcons name="location-on" size={20} color="teal" />
        </View>
        <View style={styles.locationInfo}>
          <Text style={{ ...Fonts.blackColor14Bold, marginBottom: 4 }}>
            {title}
          </Text>
          <Text style={Fonts.grayColor12Medium}>{address}</Text>
        </View>
      </View>
    );
  };

  const DetailRow = ({ label, value }) => {
    return (
      <View style={{ ...commonStyles.rowSpaceBetween, paddingVertical: 8 }}>
        <Text style={Fonts.blackColor12SemiBold}>{label}:</Text>
        <Text style={Fonts.blackColor12SemiBold}>{value}</Text>
      </View>
    );
  };
  const pickupOverlay = () => {
    return (
      <View style={{ padding: 10 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "700",
            marginBottom: 10,
            color: Colors.primaryColor,
          }}
        >
          Submit OTP with Image
        </Text>
        {otpFields(pickupOtp, setPickupOtp)}
        {renderImageBox(
          "Parcel Image",
          setPickupParcelImage,
          pickupParcelImage,
          showFullImageFunction,
          setCurrentImageSetter,
          setCurrentImageLabel,
          setBottomSheetVisible,
          imageloading,
          setSelectedImage,
          setModalVisible
        )}
      </View>
    );
  };
  const deliveryOverlay = () => {
    return (
      <View style={{ padding: 10 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "700",
            marginBottom: 10,
            color: Colors.primaryColor,
          }}
        >
          Submit OTP with Image
        </Text>
        {otpFields(deliveryOtp, setDeliveryOtp)}
        {renderImageBox(
          "Parcel Image",
          setDeliveryParcelImage,
          deliveryParcelImage,
          showFullImageFunction,
          setCurrentImageSetter,
          setCurrentImageLabel,
          setBottomSheetVisible,
          imageloading,
          setSelectedImage,
          setModalVisible
        )}
      </View>
    );
  };

  const deliveryOtpOverlay = () => {
    return (
      <View style={{ padding: 10 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "700",
            marginBottom: 10,
            color: Colors.primaryColor,
          }}
        >
          Do Your want to Deliver ?
        </Text>
      </View>
    );
  };
  const pickupOtpOverlay = () => {
    return (
      <View style={{ padding: 10 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "700",
            marginBottom: 10,
            color: Colors.primaryColor,
          }}
        >
          Do Your want to Pickup ?
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />
      {commonAppBar("Order Detail", navigation)}
      <SwipeableTabs
        titles={["Sender Detail", "Reciever Detail"]}
        components={[<SenderDetailTab />, <RecieverDetailTab />]}
      />

      {reUsableOverlayWithButton(
        pickupOverlay,
        handlePickupSubmit,
        closeModal,
        isPickupModalVisible,
        setPickupModalVisible,
        "Submit",
        "Cancel"
      )}
      {reUsableOverlayWithButton(
        deliveryOverlay,
        handleDeliverySubmit,
        closeModal,
        isDeliveryModalVisible,
        setDeliveryModalVisible,
        "Submit",
        "Cancel"
      )}
      {reUsableOverlayWithButton(
        deliveryOtpOverlay,
        sendDeliveryOtp,
        closeModal,
        isDeliveryOtpVisible,
        setDeliveryOtpVisible,
        "Yes",
        "No"
      )}
      {reUsableOverlayWithButton(
        pickupOtpOverlay,
        sendPickupOtp,
        closeModal,
        isPickupOtpVisible,
        setPickupOtpVisible,
        "Yes",
        "No"
      )}

      {fullImageContainer(modalVisible, setModalVisible, selectedImage)}
      <ImageBottomSheet
        currentImageSetter={currentImageSetter}
        currentImageLabel={currentImageLabel}
        isBottomSheetVisible={isBottomSheetVisible}
        setBottomSheetVisible={setBottomSheetVisible}
        setImageLoading={setImageLoading}
        user={user}
        dispatch={dispatch}
      />
      {isLoading && <>{DottedBlackLoader()}</>}
    </SafeAreaView>
  );
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
  boxInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 12,
    backgroundColor: "#f5f5f5",
    marginBottom: 15,
    height: 45,
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

  listContainer: {
    padding: 5,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
});

export default OrderDetailScreen;
