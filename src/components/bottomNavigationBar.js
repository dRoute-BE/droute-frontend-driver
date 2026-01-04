import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, Fonts, Sizes, commonStyles } from "../constants/styles";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  BackHandler,
  Text,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../screens/home/home";
import PostJourney from "../screens/journey/postJourneyForm";
import Profile from "../screens/profile/profilePage";
import LocationPickerScreen from "../screens/journey/locationPicker";

const Tab = createBottomTabNavigator();

const BottomNavigationBar = ({ navigation }) => {
  const [backClickCount, setBackClickCount] = useState(0);

  const backAction = () => {
    if (Platform.OS === "ios") {
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    } else {
      backClickCount === 1 ? BackHandler.exitApp() : _spring();
      return true;
    }
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [backClickCount])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.lightGrayColor,
          tabBarHideOnKeyboard: true,
          headerShown: false,

          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 10,
            marginTop: 4,
            fontWeight: "400",
          },
          tabBarStyle: styles.tabBarStyle,
          tabBarIconStyle: { alignSelf: "center" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={26}
                color={focused ? Colors.primaryColor : Colors.grayColor}
              />
            ),
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="LocationPickerScreen"
          component={LocationPickerScreen}
          options={({ navigation, route }) => ({
            tabBarButton: (props) => {
              const isFocused = navigation.getState().index === 1; // Index 1 is 'PostJourney' in tab order

              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 60,
                    height: 80,
                    position: "absolute",
                    bottom: 15,
                    left: "50%",
                    marginLeft: -30,
                  }}
                >
                  <TouchableOpacity
                    {...props}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 60,
                      height: 60,
                      borderRadius: 40,
                      borderColor: Colors.primaryColor,
                      borderWidth: 1,
                      backgroundColor: isFocused
                        ? Colors.primaryColor
                        : Colors.whiteColor,
                      shadowColor: Colors.primaryColor,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.4,
                      shadowRadius: 5,
                      elevation: 8,
                    }}

                  >
                    
                    <Ionicons
                      name="add"
                      size={35}
                      color={
                        isFocused ? Colors.whiteColor : Colors.primaryColor
                      }
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 80,
                      // backgroundColor: "cyan",
                      bottom:-16,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        textAlign: "center",
                        color:  isFocused ? Colors.primaryColor : Colors.grayColor
                      }}
                    >
                      Post Journey
                    </Text>
                  </View>
                </View>
              );
            },
          })}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person"
                size={26}
                color={focused ? Colors.primaryColor : Colors.grayColor}
              />
            ),
            tabBarLabel: "Profile",
          }}
        />
      </Tab.Navigator>
      {exitInfo()}
    </>
  );

  function exitInfo() {
    return backClickCount === 1 ? (
      <View style={styles.exitInfoWrapStyle}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Press Back Once Again To Exit!
        </Text>
      </View>
    ) : null;
  }
};

export default BottomNavigationBar;

const styles = StyleSheet.create({
  floatingButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    shadowColor: Colors.primaryColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
  },
  tabBarStyle: {
    backgroundColor: Colors.bodyBackColor,
    ...commonStyles.shadow,
    borderTopColor: Colors.extraLightGrayColor,
    borderTopWidth: 1.0,
    height: Platform.OS === "ios" ? 100.0 : 70.0,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
  exitInfoWrapStyle: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
});
