import React, { useEffect, useRef, useState } from "react";
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
import { actionOverlay, commonAppBar } from "../../components/commonComponents";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, commonStyles, Fonts } from "../../constants/styles";
import SwipeableTabs from "../../components/swipeableTabs";
import { ParcelCard, ParcelLoadingCard } from "../../components/parcelCard";
import { FlatList } from "react-native-gesture-handler";
import RequestDetailScreen from "../orders/requestDetailScreen";
import PendingRequests from "../orders/pendingRequests";
import { useDispatch } from "react-redux";
import { getAllJourneyOrders } from "../../redux/thunk/orderThunk";
import { extractJourneyOrderCourierData, getDimensionUnitAbbreviation, getWeightUnitAbbreviation } from "../../utils/commonMethods";

const { width } = Dimensions.get("window");
const PACKAGES = [
  {
    id: "PCL2025",
    image:
      "https://thumbs.dreamstime.com/b/delivery-man-blue-uniform-handing-parcel-box-to-recipient-courier-service-concept-84275323.jpg?w=768",
    phone: "9876543210",
    pickup: {
      address: "101 Alpha Street nksn njsnn njnsj bbdj jdjne jndjn nnd jnjsj",
      latitude: 28.6139,
      longitude: 77.209,
    },
    delivery: {
      address:
        "202 Beta Avenue nsnj njsnjn njsnj jbsjb jbsjb bjs njsnjns njsnj",
      latitude: 19.076,
      longitude: 72.8777,
    },
    status: "Cancelled",
  },
  {
    id: "PCL202s5",
    image:
      "https://thumbs.dreamstime.com/b/delivery-man-blue-uniform-handing-parcel-box-to-recipient-courier-service-concept-84275323.jpg?w=768",
    phone: "9876543210",
    pickup: {
      address: "101 Alpha Street nksn njsnn njnsj bbdj jdjne jndjn nnd jnjsj",
      latitude: 12.9716,
      longitude: 77.5946,
    },
    delivery: {
      address:
        "202 Beta Avenue nsnj njsnjn njsnj jbsjb jbsjb bjs njsnjns njsnj",
      latitude: 13.0827,
      longitude: 80.2707,
    },
    status: "Delivered",
  },
  {
    id: "PCL20255",
    image: null,
    phone: "9876543210",
    pickup: {
      address: "101 Alpha Street nksn njsnn njnsj bbdj jdjne jndjn nnd jnjsj",
      latitude: 22.5726,
      longitude: 88.3639,
    },
    delivery: {
      address:
        "202 Beta Avenue nsnj njsnjn njsnj jbsjb jbsjb bjs njsnjns njsnj",
      latitude: 23.0225,
      longitude: 72.5714,
    },
    status: "Ongoing",
  },
];

const JourneyManagement = ({ navigation, route }) => {
  const { journey } = route.params;
  const [isAcceptModalVisible, setAcceptModalVisible] = useState(false);
  const [isRejectModalVisible, setRejectModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedParcels, setSelectedParcels] = useState([]);
  // const [journey, setJourney] = useState(null);
  const [driver, setDriver] = useState(null);
  const [averageDriverRating, setAverageDriverRating] = useState(null);
  // const [order, setOrder] = useState(null);
  const [payment, setPayment] = useState(null);
  const [courier, setCourier] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const handleAddRemoveParcel = (parcel) => {
    setSelectedParcels((prev) => {
      const exists = prev.some((p) => p.id === parcel.id);
      if (exists) {
        return prev.filter((p) => p.id !== parcel.id); // remove
      } else {
        return [...prev, parcel]; // add
      }
    });
  };
 
  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await dispatch(
          getAllJourneyOrders(journey?.journeyId)
        );
        if (getAllJourneyOrders.fulfilled.match(response)) {
            setOrders(...orders, response?.payload?.data);
         console.log("this is orders in j management request",response?.payload?.data);
          await dispatch(
            showSnackbar({
              message: response?.payload?.message,
              type: "success",
              time: 1000,
            })
          );
        } else {
          await dispatch(
            showSnackbar({
              message: response?.payload?.message || "Failed to load journey.",
              type: "error",
              time: 3000,
            })
          );
        }
      } catch (e) {
        await dispatch(
          showSnackbar({
            message: e.message || "An error occurred while loading journeys.",
            type: "error",
            time: 3000,
          })
        );
      }
    };

    fetchJourneys();
  }, []);

  const handleUpdate = () => {};
  const handleCancel = () => {};

  const JourneyDetailTab = () => {
    return (
      <>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.locationsContainer}>
            <LocationItem
              title="Source Address"
              address={journey?.journeySource?.address}
            />
            <LocationItem
              title="Destination Address"
              address={journey?.journeyDestination?.address}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Vehicle Capacity:</Text>
            <View style={styles.divider} />
           <View style={{ marginTop: 8 }}>
  <DetailRow
    label="Height"
    value={
      journey?.availableHeight +
      " " +
      getDimensionUnitAbbreviation(journey?.availableSpaceMeasurementType)
    }
  />
  <DetailRow
    label="Width"
    value={
      journey?.availableWidth +
      " " +
      getDimensionUnitAbbreviation(journey?.availableSpaceMeasurementType)
    }
  />
  <DetailRow
    label="Length"
    value={
      journey?.availableLength +
      " " +
      getDimensionUnitAbbreviation(journey?.availableSpaceMeasurementType)
    }
  />
  <DetailRow
    label="Weight"
    value={
      journey?.availableWeight +
      " " +
      getWeightUnitAbbreviation(journey?.availableWeightMeasurementType)
    }
  />
</View>

          </View>

          <View style={styles.divider} />
        </ScrollView>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setRejectModalVisible(true)}
            style={{ ...commonStyles.outlinedButton, flex: 1 }}
          >
            <Text style={commonStyles.outlinedButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setAcceptModalVisible(true)}
            style={{ ...commonStyles.button, flex: 1 }}
          >
            <Text style={commonStyles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const OrdersDetail = ({orders}) => {
    //Filter confirmed order from all orders
    const confirmedOrder = orders.filter(order => order?.order?.status === 'ACCEPTED');
    const renderPackageCard = ({ item }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("OrderDetailScreen", {item})}
      >
        <ParcelCard
          parcelItem={item}
          isSelected={selectedParcels.some((p) => p.id === item.id)}
          onAddRemove={handleAddRemoveParcel}
        />
      </TouchableOpacity>
    );
    return (
      <>
        {isLoading ? (
          <ParcelLoadingCard count={3} />
        ) : (
          <FlatList
            data={confirmedOrder}
            renderItem={renderPackageCard}
            keyExtractor={(item) => item?.order?.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <FontAwesome
                  name="cube"
                  size={60}
                  color={Colors.extraLightGrayColor}
                />
                <Text style={styles.emptyText}>No Parcels found</Text>
              </View>
            }
          />
        )}
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setAcceptModalVisible(true)}
            style={{ ...commonStyles.button, flex: 1 }}
          >
            <Text style={commonStyles.buttonText}>Start Journey</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />
      {commonAppBar("Manage Journey", navigation)}
      <SwipeableTabs
        titles={["Journey Detail", "New Requests", "Confirmed Orders"]}
        components={[
          <JourneyDetailTab />,
          <PendingRequests orders={orders} navigation={navigation} />,
          <OrdersDetail orders={orders}/>,
        ]}
      />
      {actionOverlay(
        handleUpdate,
        isAcceptModalVisible,
        setAcceptModalVisible,
        "Do You Want to Update ?",
        Colors.primaryColor
      )}
      {actionOverlay(
        handleCancel,
        isRejectModalVisible,
        setRejectModalVisible,
        "Do You Want to Delete Journey ?",
        Colors.darkOrangeColor
      )}
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

export default JourneyManagement;
