// DriverDashboard.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Colors,
  commonStyles,
  Fonts,
  screenWidth,
  Sizes,
} from "../../constants/styles";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import {
  fetchAddressComponent,
  fetchImageForCity as fetchRandomImage,
  getUserLocation,
} from "../../utils/commonMethods";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selector/authSelector";
import MyStatusBar from "../../components/myStatusBar";

const COLORS = {
  green: "#4CAF50",
  darkBlue: "#101942",
  lightOrange: "#FFA726",
  textDark: "#333333",
  textLight: "#757575",
  iconBgOrange: "rgba(255, 138, 101, 0.1)",
  iconBgPurple: "rgba(254, 212, 234, 0.56)",
  iconBgGreen: "rgba(76, 175, 80, 0.1)",
  iconBgPink: "rgba(144, 139, 245, 0.1)",
  iconBgLightOrange: "rgba(255, 167, 38, 0.1)",
};
const menuItems = [
  // {
  //   id: 1,
  //   title: "Pending Requests",
  //   screen: "PendingRequests",
  //   icon: (
  //     <Ionicons
  //       name="notifications-outline"
  //       size={24}
  //       color={Colors.orangeColor}
  //     />
  //   ),
  //   bgColor: COLORS.iconBgOrange,
  //   description: "Review and take action on new order requests from users.",
  // },
  // {
  //   id: 2,
  //   title: "All Journeys",
  //   screen:"AllJourneyList",
  //   icon: <MaterialIcons name="route" size={24} color={Colors.primaryColor} />,
  //   bgColor: COLORS.iconBgPurple,
  //   description: "View all your current and past journeys in one place.",
  // },
  {
    id:1,
    title: "Manage Journey",
    screen:"AllJourneyList",
    icon: <Ionicons name="map-outline" size={24} color={COLORS.green} />, // updated for clarity
    bgColor: COLORS.iconBgGreen,
    description: "Manage your ongoing journey with real-time updates.",
  },
  {
    id: 2,
    title: "Support",
    screen:"HelpScreen",
    icon: (
      <MaterialIcons name="support-agent" size={24} color={COLORS.darkBlue} />
    ),
    bgColor: COLORS.iconBgPink,
    description: "Access 24/7 support for any assistance you need.",
  },
  // {
  //   id: 5,
  //   title: "All Orders",
  //   icon: (
  //     <MaterialCommunityIcons
  //       name="clipboard-list-outline"
  //       size={24}
  //       color={COLORS.lightOrange}
  //     />
  //   ), // more fitting than message-text
  //   bgColor: COLORS.iconBgLightOrange,
  //   description: "Track all your ongoing and past orders efficiently.",
  // },
];
const Home = ({ navigation }) => {
  const mapRef = useRef(null);
  const [address, setAddress] = useState(null);
  const imageRef = useRef(null);
  const [region, setRegion] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMessage, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const user = useSelector(selectUser);
  const backgroundSource = imageRef?.current  
  ? { uri: imageRef.current }
  : require('../../../assets/images/homeBg.png');

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const fetchLocationAndAddress = async () => {
      try {
        const { latitude, longitude } = await getUserLocation({
          setRegion,
          setCurrentLocation,
          mapRef,
          setErrorMsg,
        });
        if (latitude && longitude) {
          const addressData = await fetchAddressComponent(latitude, longitude);
          imageRef.current = await fetchRandomImage(addressData?.city);
        //  console.log("address data is home page ",addressData);
          if (addressData?.address) {
            setAddress(addressData?.address);
          }
        } else {
          console.warn("Latitude or longitude not available.");
        }
      } catch (error) {
         console.log(":", error);
      }
    };
    fetchLocationAndAddress();
  }, []);

  const MenuItem = ({ item, screen, navigation }) => {
    const handlePress = () => {
      if (screen) {
        navigation.navigate(screen);
      }
    };

    return (
      <TouchableOpacity onPress={handlePress} style={styles.menuItem}>
        <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
          {item.icon}
        </View>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar/>
      <ImageBackground
        source={backgroundSource}
        style={styles.headerBackground}
      >
        <View style={styles.headerOverlay}>
          <View style={styles.locationContainer}>
            
            {address && (<>
             <MaterialIcons
              name="location-on"
              size={18}
               color={Colors.whiteColor}
            />
              <Text style={styles.locationText}>
                {address ? address.substring(0, 25) + "..." : ""}
              </Text>
              </>
            )}
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>WELCOME</Text>
            <Text style={styles.driverName}>{user?.fullName}</Text>
            <Text style={styles.driverInfo}>Vehicle Name:{" "}{user?.vehicleName}</Text>
            <Text style={styles.driverInfo}>Vehicle Number:{""}{user?.vehicleNumber}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.menuCard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <MenuItem
                key={item.id}
                item={item}
                screen={item.screen}
                navigation={navigation}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  headerBackground: {
    height: 280,
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  locationText: {
    paddingVertical: 10,
    ...Fonts.whiteColor12Medium,
    fontSize: 12,
  },
  welcomeContainer: {
    marginTop: 30,
  },
  welcomeText: {
    ...Fonts.whiteColor18SemiBold,
    letterSpacing: 1,
  },
  driverName: {
    ...Fonts.whiteColor18SemiBold,
    marginTop: 8,
  },
  driverInfo: {
    ...Fonts.whiteColor14Medium,
    marginTop: 4,
    opacity: 0.9,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  menuCard: {
    flex: 1,
    backgroundColor: Colors.bodyBackColor,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  menuItem: {
    width: "48%",
    backgroundColor: Colors.lightestGray,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderColor: Colors.extraLightGrayColor,
    borderWidth: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  menuDescription: {
    fontSize: 10,
    color: COLORS.textLight,
    lineHeight: 16,
  },
});

export default Home;
