// AllJourneyList.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
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
import { commonAppBar } from "../../components/commonComponents";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyStatusBar from "../../components/myStatusBar";
import { JourneyCard, LoadingJourneyCard } from "../../components/journeyCard";
import {
  selectAuthloader,
  selectJourney,
  selectUser,
} from "../../redux/selector/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { getAllJourneyByDriverId } from "../../redux/thunk/journeyThunk";
import { showSnackbar } from "../../redux/slice/snackbarSlice";

const JOURNEYS = [
  {
    id: "1",
    from: {
      address: "123 Main Street",
      city: "Anytown",
      state: "IND",
      zip: "845103",
    },
    to: "prayagraj up",
    departure: {
      date: "20 Feb",
      time: "05:00 PM", 
    },
    arrival: {
      date: "20 Feb",
      time: "05:00 PM",
    },
    availableSpace: "Length x Width x Height (in ft)",
    packages: 32,
  },
  {
    id: "2",
    from: {
      address: "456 Oak Avenue",
      city: "Anytown",
      state: "IND",
      zip: "845103",
    },
    to: "prayagraj up",
    departure: {
      date: "22 Feb",
      time: "08:00 AM",
    },
    arrival: {
      date: "22 Feb",
      time: "08:00 PM",
    },
    availableSpace: "Length x Width x Height (in ft)",
    packages: 18,
  },
  {
    id: "3",
    from: {
      address: "789 Pine Road",
      city: "Anytown",
      state: "IND",
      zip: "845103",
    },
    to: "prayagraj up",
    departure: {
      date: "25 Feb",
      time: "10:30 AM",
    },
    arrival: {
      date: "25 Feb",
      time: "10:30 PM",
    },
    availableSpace: "Length x Width x Height (in ft)",
    packages: 45,
  },
  {
    id: "4",
    from: {
      address: "101 Maple Drive",
      city: "Anytown",
      state: "IND",
      zip: "845103",
    },
    to: "prayagraj up",
    departure: {
      date: "28 Feb",
      time: "02:15 PM",
    },
    arrival: {
      date: "28 Feb",
      time: "02:15 AM",
    },
    availableSpace: "Length x Width x Height (in ft)",
    packages: 27,
  },
];

const AllJourneyList = ({ navigation }) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleCardClick = () => {
    navigation.navigate("JourneyManagement");
  };

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const selectLoader = useSelector(selectAuthloader);

  const journeys = useSelector(selectJourney);
  console.log("Journey = ", JSON.stringify(journeys, null, 2));

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await dispatch(
          getAllJourneyByDriverId(user?.driverId)
        );
        if (getAllJourneyByDriverId.fulfilled.match(response)) {
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
              message: response?.payload?.message || "Failed to load journeys.",
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

  const handleRefresh = async () => {
    try {
      const response = await dispatch(getAllJourneyByDriverId(user?.driverId));
      if (getAllJourneyByDriverId.fulfilled.match(response)) {
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
            message: response?.payload?.message || "Failed to load journeys.",
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

  const renderJourneyCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("JourneyManagement",{journey:item})}
      activeOpacity={0.7}
    >
      <JourneyCard journey={item} />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />
      {commonAppBar("All Journey List", navigation)}
      {selectLoader ? (
        <LoadingJourneyCard count={5} />
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={handleRefresh}
          data={journeys}
          renderItem={renderJourneyCard}
          keyExtractor={(item) => item.journeyId}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon
                name="map-search-outline"
                size={60}
                color={Colors.grayColor}
              />
              <Text style={styles.emptyText}>Journey Not found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bodyBackColor,
  },

  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.grayColor,
    marginTop: 12,
  },
});

export default AllJourneyList;
