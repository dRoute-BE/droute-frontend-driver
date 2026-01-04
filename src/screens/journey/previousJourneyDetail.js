import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { actionOverlay, commonAppBar } from '../../components/commonComponents';
import MyStatusBar from '../../components/myStatusBar';
import { Colors, commonStyles, Fonts } from '../../constants/styles';
import SwipeableTabs from '../../components/swipeableTabs';
import { ParcelCard, ParcelLoadingCard } from '../../components/parcelCard';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get("window");
const PACKAGES = [
{
  id: "PCL2025",
  image: "https://thumbs.dreamstime.com/b/delivery-man-blue-uniform-handing-parcel-box-to-recipient-courier-service-concept-84275323.jpg?w=768", 
  phone: "9876543210",
  pickup: {
    address: "101 Alpha Street nksn njsnn njnsj bbdj jdjne jndjn nnd jnjsj",
  },
  delivery: {
    address: "202 Beta Avenue nsnj njsnjn njsnj jbsjb jbsjb bjs njsnjns njsnj",
  },
  status:"Cancelled"
},
{
  id: "PCL202s5",
  image: "https://thumbs.dreamstime.com/b/delivery-man-blue-uniform-handing-parcel-box-to-recipient-courier-service-concept-84275323.jpg?w=768", 
  phone: "9876543210",
  pickup: {
    address: "101 Alpha Street nksn njsnn njnsj bbdj jdjne jndjn nnd jnjsj",
  },
  delivery: {
    address: "202 Beta Avenue nsnj njsnjn njsnj jbsjb jbsjb bjs njsnjns njsnj",
  },
  status:"Delivered"
},
{
  id: "PCL20255",
  image: null, 
  phone: "9876543210",
  pickup: {
    address: "101 Alpha Street nksn njsnn njnsj bbdj jdjne jndjn nnd jnjsj",
  },
  delivery: {
    address: "202 Beta Avenue nsnj njsnjn njsnj jbsjb jbsjb bjs njsnjns njsnj",
  },
  status:"Ongoing"
}
];
const PreviousJourneyDetail = ({ navigation }) => {
  const [isAcceptModalVisible, setAcceptModalVisible] = useState(false);
  const [isRejectModalVisible, setRejectModalVisible] = useState(false);
const [isLoading,setIsLoading]=useState(false);
  const handleUpdate = () => {};
  const handleCancel = () => {};

  const JourneyDetailTab = () => {
    return (
      <>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={styles.locationsContainer}>
            <LocationItem title="Source Address" address="Vadgaon Bk Pune 411041 Vadgaon Bk Pune 411041 Vadgaon Bk Pune 411041 Vadgaon Bk Pune 411041" />
            <LocationItem title="Destination Address" address="Vadgaon Bk Pune 411041 411041 Vadgaon Bk Pune 411041" />
          </View>

          <View style={styles.section}>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Vehicle Capacity:</Text>
            <View style={styles.divider} />
            <View style={{ marginTop: 8 }}>
              <DetailRow label="Height" value="20 m" />
              <DetailRow label="Width" value="10 m" />
              <DetailRow label="Length" value="19 m" />
              <DetailRow label="Weight" value="20 Kg" />
            </View>
          </View>

          <View style={styles.divider} />
        </ScrollView>

        {/* <View style={styles.bottomButtons}>
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
        </View> */}
      </>
    );
  };

const OrdersDetail = () => {
const renderPackageCard = ({ item }) => <ParcelCard  parcelItem={item} />;
    return <>
    {isLoading?(<ParcelLoadingCard count={3} />):(
      <FlatList
        data={PACKAGES}
        renderItem={renderPackageCard}
        keyExtractor={(item) => item.id}
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
      />)}
    </>;
  };

  const LocationItem = ({ title, address }) => {
    return (
      <View style={styles.locationItem}>
        <View style={styles.locationMarker}>
          <MaterialIcons name="location-on" size={20} color="teal" />
        </View>
         <View style={styles.locationInfo}>
          <Text style={{ ...Fonts.blackColor14Bold, marginBottom: 4 }}>{title}</Text>
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
        titles={['Journey Detail', 'Order Detail']}
        components={[<JourneyDetailTab />, <OrdersDetail />]}
      />
      {actionOverlay(handleUpdate, isAcceptModalVisible, setAcceptModalVisible, "Do You Want to Update ?", Colors.primaryColor)}
      {actionOverlay(handleCancel, isRejectModalVisible, setRejectModalVisible, "Do You Want to Delete Journey ?", Colors.darkOrangeColor)}
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
   ...commonStyles.rowAlignCenter
  },
  userImagePlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: Colors.extraLightGrayColor,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'flex-end',
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
    flexDirection: 'row',
    marginBottom: 16,
  },
  locationMarker: {
    width: 24,
    alignItems: 'center',
  },
  
  locationInfo: {
    flex: 1,
    marginLeft: 8,
  },
 
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    gap:10,
    borderTopColor: Colors.extraLightGrayColor,
  },
 
  listContainer: {
    padding: 5,
     flexGrow:1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },

});

export default PreviousJourneyDetail;
