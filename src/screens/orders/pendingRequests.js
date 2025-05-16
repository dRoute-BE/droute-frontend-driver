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
import { UserCardLoader, UserInfo } from "../../components/cards";
// Define colors at the top for easy customization
const COLORS = {
  primary: "#101942",
  accent: "#FF5722",
  background: "#F8F9FA",
  white: "#FFFFFF",
  gray: "#8A94A6",
  lightGray: "#E0E0E0",
  text: "#333333",
  userRole: "#4CAF50",
  vendorRole: "#FF9800",
  divider: "#e1e1ea",
};

// Sample user data
const USERS = [
  {
    id: 1,
    user_key: "user1key",
    owner_legal_name: "User One",
    mobile_number: "+910000000001",
    status: "New",
    role: "user",
  },
  {
    id: 2,
    user_key: "user2key",
    owner_legal_name: "User Two",
    mobile_number: "+910000000002",
    status: "Active",
    role: "user",
  },
  {
    id: 3,
    user_key: "user3key",
    owner_legal_name: "User Three",
    mobile_number: "+910000000003",
    status: "Inactive",
    role: "vendor",
  },
  {
    id: 4,
    user_key: "user4key",
    owner_legal_name: "User Four",
    mobile_number: "+910000000004",
    status: "Blocked",
    role: "vendor",
  },
  {
    id: 5,
    user_key: "user5key",
    owner_legal_name: "User Five",
    mobile_number: "+910000000005",
    status: "New",
    role: "user",
  },
  {
    id: 6,
    user_key: "user6key",
    owner_legal_name: "User Six",
    mobile_number: "+910000000006",
    status: "Active",
    role: "user",
  },
  {
    id: 7,
    user_key: "user7key",
    owner_legal_name: "User Seven",
    mobile_number: "+910000000007",
    status: "Inactive",
    role: "vendor",
  },
  {
    id: 8,
    user_key: "user8key",
    owner_legal_name: "User Eight",
    mobile_number: "+910000000008",
    status: "Blocked",
    role: "vendor",
  },
  {
    id: 9,
    user_key: "user9key",
    owner_legal_name: "User Nine",
    mobile_number: "+910000000009",
    status: "New",
    role: "user",
  },
  {
    id: 10,
    user_key: "user10key",
    owner_legal_name: "User Ten",
    mobile_number: "+910000000010",
    status: "Active",
    role: "vendor",
  },
];

const PendingRequests = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(USERS);
  const [isLoading, setIsLoading] = useState(true);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("both");
  const [refreshing, setRefreshing] = useState(false);
  // Filter users based on search query
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user?.owner_legal_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user?.mobile_number?.includes(searchQuery);

    const matchesRole = selectedRole === "both" || user?.role === selectedRole;

    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(user?.status);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCardPress=()=>{
  console.log("card pressed")
  }
  const handleRefresh = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />

      {searchBar()}

      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={filteredUsers}
        renderItem={({ item }) => <UserInfo user={item} handleCardPress={handleCardPress}/>}
        keyExtractor={(item) => item?.id?.toString()}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="account-search" size={60} color={COLORS.lightGray} />
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        }
      />
      {isLoading && <UserCardLoader count={10} />}

      {bottonSheet()}
    </SafeAreaView>
  );



  function searchBar() {
    return (
      <View
        style={{
          marginVertical:10,
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
        <MaterialIcons
          name="filter-list"
          color={Colors.blackColor}
          size={26}
          style={{ marginLeft: 12 }} // add some spacing
          onPress={() => setBottomSheetVisible(true)}
        />
      </View>
    );
  }
  function bottonSheet() {
    return (
      <RNModal
        isVisible={isBottomSheetVisible}
        onBackdropPress={() => setBottomSheetVisible(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={styles.bottomSheet}>
          {roleSelector()}
          {statusSection()}
        </View>
      </RNModal>
    );
  }

  function roleSelector() {
    const roles = ["user", "vendor", "both"];

    return (
      <View style={[styles.section, { marginBottom: 12 }]}>
        <Text style={{ marginBottom: 4, fontWeight: "bold", fontSize: 14 }}>
          Select Role
        </Text>

        <View style={styles.TypeContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.TypeButton,
                selectedRole === role && styles.selectedButton,
              ]}
              onPress={() => setSelectedRole(role)}
            >
              <Text
                style={[
                  styles.TypebuttonText,
                  selectedRole === role && styles.selectedButtonText,
                ]}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  function statusSection() {
    const statuses = ["New", "Active", "Inactive", "Blocked"];

    const toggleStatus = (status) => {
      if (selectedStatuses.includes(status)) {
        setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
      } else {
        setSelectedStatuses([...selectedStatuses, status]);
      }
    };

    return (
      <View style={[styles.section, { marginBottom: 12 }]}>
        <Text style={{ marginBottom: 4, fontWeight: "bold", fontSize: 14 }}>
          Select Status
        </Text>

        <View style={[styles.TypeContainer, { flexWrap: "wrap" }]}>
          {statuses.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.TypeButton,
                selectedStatuses.includes(status) && styles.selectedButton,
              ]}
              onPress={() => toggleStatus(status)}
            >
              <Text
                style={[
                  styles.TypebuttonText,
                  selectedStatuses.includes(status) &&
                    styles.selectedButtonText,
                ]}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
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
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(182, 206, 232, 0.3)",
    zIndex: 999,
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

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: COLORS.text,
  },
  listContainer: {
    paddingBottom: 16,
  },



  separator: {
    height: 1,
    backgroundColor: COLORS.divider,
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
    color: COLORS.gray,
    marginTop: 12,
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  TypeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  TypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
  },
  TypebuttonText: {
    fontSize: 12,
    color: "#555",
  },
  selectedButton: {
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.primaryColor,
  },
  selectedButtonText: {
    color: "white",
  },
});

export default PendingRequests;
