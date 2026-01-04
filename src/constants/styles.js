import { Dimensions } from "react-native";
//#861658 //axis
//#101942  //evcare
//#083c5d  //user
export const Colors = {
  primaryColor: "teal",
  extraLightPrimaryColor:"#fce6f3",
  blackColor: "#000000",
  whiteColor: "#FFFFFF",
  grayColor: "#828282",
  userBubble:"#d9f7fa",
  otherBubble:"#f9ffd9",
  lightBlackColor: "#333333",
  bodyBackColor: "#F2F2F2",
  yellowColor: "#F2C94C",
  lightestGray:"#fafafa",
  extraLightGrayColor: "#e0e0e0",
  redColor: "#FF0606",
  orangeColor: "#FF8C00",
  darkOrangeColor: "#FF5722",
};

export const FontFamily = {
  Regular: "Poppins-Regular",
  Medium: "Poppins-Medium",
  SemiBold: "Poppins-SemiBold",
  Bold: "Poppins-Bold",
};

export const Fonts = {
  whiteColor16Regular: {
    color: Colors.whiteColor,
    fontSize: 12.0,
    fontFamily: FontFamily.Regular,
    includeFontPadding: false,
  },

  whiteColor14Regular: {
    color: Colors.whiteColor,
    fontSize: 14.0,
    fontFamily: FontFamily.Regular,
    includeFontPadding: false,
  },

  whiteColor10Medium: {
    color: Colors.whiteColor,
    fontSize: 10.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  whiteColor12Medium: {
    color: Colors.whiteColor,
    fontSize: 12.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },
   whiteColor16Medium: {
    color: Colors.whiteColor,
    fontSize: 16.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  whiteColor14Medium: {
    color: Colors.whiteColor,
    fontSize: 14.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  whiteColor14SemiBold: {
    color: Colors.whiteColor,
    fontSize: 14.0,
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },

  whiteColor16SemiBold: {
    color: Colors.whiteColor,
    fontSize: 16.0,
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },

  whiteColor18SemiBold: {
    color: Colors.whiteColor,
    fontSize: 18.0,
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },

  whiteColor34SemiBold: {
    color: Colors.whiteColor,
    fontSize: 34.0,
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },

  blackColor12Regular: {
    color: Colors.blackColor,
    fontSize: 12.0,
    fontFamily: FontFamily.Regular,
    includeFontPadding: false,
  },

  blackColor10Medium: {
    color: Colors.blackColor,
    fontSize: 10.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },
   blackColor16Medium: {
    color: Colors.blackColor,
    fontSize: 16.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  blackColor12Medium: {
    color: Colors.blackColor,
    fontSize: 12.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  blackColor14Medium: {
    color: Colors.blackColor,
    fontSize: 14.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  blackColor12SemiBold: {
    color: Colors.blackColor,
    fontSize: 12.0,
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },
   blackColor12Bold: {
    color: Colors.blackColor,
    fontSize: 12.0,
    fontWeight:"700",
    fontFamily: FontFamily.Bold,
    includeFontPadding: false,
  },

  blackColor14SemiBold: {
    color: Colors.blackColor,
    fontSize: 14.0,
    fontWeight:"500",
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },
  blackColor14Bold: {
    color: Colors.blackColor,
    fontSize: 14.0,
    fontWeight:"700",
    fontFamily: FontFamily.Bold,
    includeFontPadding: false,
  },
  blackColor16SemiBold: {
    color: Colors.blackColor,
    fontSize: 16.0,
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },
   blackColor16Bold: {
    color: Colors.blackColor,
    fontSize: 16.0,
    fontWeight:"700",
    fontFamily: FontFamily.Bold,
    includeFontPadding: false,
  },

  blackColor22SemiBold: {
    color: Colors.blackColor,
    fontSize: 22.0,
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },

  grayColor10Regular: {
    color: Colors.grayColor,
    fontSize: 10.0,
    fontFamily: FontFamily.Regular,
    includeFontPadding: false,
  },

  grayColor12Regular: {
    color: Colors.grayColor,
    fontSize: 12.0,
    fontFamily: FontFamily.Regular,
    includeFontPadding: false,
  },
  grayColor12SemiBold: {
    color: Colors.grayColor,
    fontSize: 12.0,
    fontWeight: "800",
    includeFontPadding: false,
  },

  grayColor14Regular: {
    color: Colors.grayColor,
    fontSize: 14.0,
    fontFamily: FontFamily.Regular,
    includeFontPadding: false,
  },

  grayColor10Medium: {
    color: Colors.grayColor,
    fontSize: 10.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  grayColor10Medium: {
    color: Colors.grayColor,
    fontSize: 10.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  grayColor11Medium: {
    color: Colors.grayColor,
    fontSize: 11.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  grayColor12Medium: {
    color: Colors.grayColor,
    fontSize: 12.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  grayColor14Medium: {
    color: Colors.grayColor,
    fontSize: 14.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  grayColor14SemiBold: {
    color: Colors.grayColor,
    fontSize: 14.0,
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },

  primaryColor12Medium: {
    color: Colors.primaryColor,
    fontSize: 12.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  primaryColor14Medium: {
    color: Colors.primaryColor,
    fontSize: 14.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },

  primaryColor12SemiBold: {
    color: Colors.primaryColor,
    fontSize: 12.0,
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },

  primaryColor14SemiBold: {
    color: Colors.primaryColor,
    fontSize: 14.0,
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },

  primaryColor18SemiBold: {
    color: Colors.primaryColor,
    fontSize: 18.0,
    fontFamily: FontFamily.SemiBold,
    includeFontPadding: false,
  },

  redColor14Medium: {
    color: Colors.redColor,
    fontSize: 14.0,
    fontFamily: FontFamily.Medium,
    includeFontPadding: false,
  },
};

export const Sizes = {
  fixPadding: 10.0,
};

export const commonStyles = {
  shadow: {
    elevation: 2.0,
    shadowColor: Colors.grayColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: Sizes.fixPadding * 1,
  },
  outlinedButton: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: Sizes.fixPadding * 1,
  },
  outlinedButtonText: {
    color: Colors.primaryColor,
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonText: {
    color: Colors.whiteColor,
    fontSize: 14,
    fontWeight: "bold",
  },
  boxInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    fontSize: 12,
    backgroundColor: "#f5f5f5",
    height: 45,
  },
};

export const screenWidth = Dimensions.get("window").width;

export const screenHeight = Dimensions.get("window").height;
