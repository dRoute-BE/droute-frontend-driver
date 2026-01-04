import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Colors,
  commonStyles,
  screenWidth,
} from "../constants/styles";

export function UserInfo({ user }) {

  // console.log()
  return (
    <View activeOpacity={0.7}  style={styles.userItem}>
      {user?.avatar ? (
        <Image source={{ uri: user?.avatar }} style={styles.avatar} />
      ) : (
        <Icon
          name="account-circle"
          size={50}
          color="#ccc"
          style={styles.avatar}
        />
      )}

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user?.fullName || "N/A"}</Text>
        <Text style={styles.userMobile}>{user?.contactNo || "N/A"}</Text>
      </View>

      <View style={[styles.timeBadge]}>
        {/* <Text style={[styles.timeText, { color: Colors.grayColor }]}>
          20 min ago
        </Text> */}
      </View>
    </View>
  );
}

export function UserCardLoader({ count = 5 }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const loaders = Array(count).fill(0);
  return (
    <>
      {loaders.map((_, index) => (
        <Animated.View key={index} style={[styles.userItem, { opacity }]}>
          <View style={styles.skeletonAvatar} />
          <View style={styles.userInfo}>
            <View style={styles.skeletonTextShort} />
            <View style={styles.skeletonTextLong} />
          </View>
          <View style={styles.skeletonTime} />
        </Animated.View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 3,
    ...commonStyles.shadow,
    borderColor: Colors.extraLightGrayColor,
    borderWidth: 0.1,
    borderTopWidth: 1.0,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginBottom: 4,
  },
  userMobile: {
    fontSize: 12,
    color: Colors.grayColor,
  },
  timeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    // fontWeight: "bold",
  },

  skeletonAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.extraLightGrayColor,
  },
  skeletonTextShort: {
    height: 12,
    width: screenWidth * 0.3,
    borderRadius: 4,
    backgroundColor: Colors.extraLightGrayColor,
    marginBottom: 6,
  },
  skeletonTextLong: {
    height: 10,
    width: screenWidth * 0.5,
    borderRadius: 4,
    backgroundColor: Colors.extraLightGrayColor,
  },
  skeletonTime: {
    width: 60,
    height: 15,
    borderRadius: 4,
    backgroundColor: Colors.extraLightGrayColor,
  },
});
