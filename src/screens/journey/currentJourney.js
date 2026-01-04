// AllJourneyList.js
import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { selectJourney } from "../../redux/selector/authSelector";


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

const CurrentJourney = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);




  const renderJourneyCard = ({ item }) => (
    <TouchableOpacity onPress={()=>navigation.navigate("JourneyManagement",item)} activeOpacity={0.7}>
     <JourneyCard journey={item}  />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />
      {commonAppBar("Current Journey List", navigation)}
      {isLoading ? (
        <LoadingJourneyCard count={5} />
      ) : (
        <FlatList
          data={JOURNEYS}
          renderItem={renderJourneyCard}
          keyExtractor={(item) => item.id}
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

export default CurrentJourney;
