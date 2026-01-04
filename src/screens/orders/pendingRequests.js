// ViewAllUserPage.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Colors,
  screenWidth,
  commonStyles,
  Sizes,
  Fonts,
} from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RNModal from "react-native-modal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RefreshControl } from "react-native";
import { UserCardLoader, UserInfo } from "../../components/userCards";
import { useSelector } from "react-redux";
import { selectAuthloader } from "../../redux/selector/authSelector";

const PendingRequests = ({ navigation, orders }) => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [users, setUsers] = useState(USERS);
  // const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isLoading = useSelector(selectAuthloader);
  const pendingOrders = orders.filter(
    (data) => data?.order?.orderStatus === "PENDING"
  );
  // const requestedUsers= pendingOrders.map(order => order.courier?.user).filter(Boolean);
  // console.log(
  //   "this is orders in pending request",
  //   JSON.stringify(pendingOrders, null, 2)
  // );
  const filteredUsers = pendingOrders?.courier?.userUsers.filter((user) => {
    const fullName = order?.courier?.user?.fullName?.toLowerCase() || "";
    const contactNo = order?.courier?.user?.contactNo || "";

    const query = searchQuery.toLowerCase();

    return fullName.includes(query) || contactNo.includes(query);
  });

  const handleCardPress = (pendingOrder) => {
  // console.log("Navigating with:", pendingOrder); // debug
  navigation.navigate("RequestDetailScreen", { pendingOrder }); 
};


  const handleRefresh = async () => {};
  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />

      {searchBar()}
      {isLoading ? (
        <UserCardLoader count={10} />
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={handleRefresh}
          data={pendingOrders}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleCardPress(item)}
            >
              <UserInfo user={item?.courier?.user} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item?.courier?.courierId?.toString()}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="account-search" size={60} color={Colors.grayColor} />
              <Text style={styles.emptyText}>No users found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );

  function searchBar() {
    return (
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={[styles.searchBar, { flex: 1 }]}>
          <MaterialIcons
            name="search"
            size={24}
            color="#888"
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="Search Users or Vendors...."
            placeholderTextColor="#888"
            style={{
              flex: 1,
              padding: 12,
              fontSize: 12,
            }}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bodyBackColor,
    paddingHorizontal: Sizes.fixPadding * 0.5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.bodyBackColor,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: Colors.blackColor,
  },
  listContainer: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.extraLightGrayColor,
    marginLeft: 78,
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

export default PendingRequests;
