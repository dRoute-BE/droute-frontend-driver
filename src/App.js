import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from "react-redux";
import OnboardingScreen from './screens/onBoardingScreens/onBoardingScreen';
import MyStatusBar from './components/myStatusBar';
import SignUpScreen from './screens/auth/signUp';
import SignInScreen from './screens/auth/signIn';
import VerificationScreen from './screens/auth/verificationScreen';
import ForgetPassword from './screens/auth/forgetPassword';
import CompleteProfileForm from './screens/completeProfile/completeProfileForm';
import PostJourney from './screens/journey/postJourneyForm';
import Home from './screens/home/home';
import AllJourneyList from './screens/journey/allJourneyList';
import BottomNavigationBar from './components/bottomNavigationBar';
import TermsAndConditionsScreen from './screens/profile/termsAndCondition';
import PrivacyPolicyScreen from './screens/profile/privacyPolicy';
import ChangePassword from './screens/profile/changePassword';
import EditProfile from './screens/profile/editProfile';
import ChatScreen from './screens/chatScreen/chatScreen';
import PendingRequests from './screens/orders/pendingRequests';
import HelpScreen from './screens/support/helpScreen';
import AllSupportTickets from './screens/support/allSupportTickets';
import AllParcelsInJourney from './screens/orders/AllParcelsInJourney';
import LocationPickerScreen from './screens/journey/locationPicker';
import CurrentJourney from './screens/journey/currentJourney';
import RequestDetailScreen from './screens/orders/requestDetailScreen';
import store from './redux/store/store';
import Snackbar from './components/snackbar';
import InstructionToComplete from './screens/completeProfile/instructionToComplete';
import PendingForApprovalScreen from './screens/completeProfile/pendingForApproval';
import profileStatusScreen from './screens/completeProfile/pendingAccountScreen';
import JourneyManagement from './screens/journey/journeyManagement';
import PreviousJourneyDetail from './screens/journey/previousJourneyDetail';
import UserHome from './screens/home/userHome';
import { selectUser } from './redux/selector/authSelector';
import OrderDetailScreen from './screens/orders/orderDetailScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log('User changed:', user);
  }, [user]);


  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          {!user ? (
            <>
            
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
              <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            </>
          ) : user.profileStatus === 'PENDING_COMPLETION' ? (
            <>
         
              <Stack.Screen name="InstructionToComplete" component={InstructionToComplete} />
              <Stack.Screen name="CompleteProfileForm" component={CompleteProfileForm} />
              <Stack.Screen name="HelpScreen" component={HelpScreen} />
            </>
          ) : user.profileStatus === 'PENDING_VERIFICATION' || user.profileStatus === 'PENDING_APPROVAL' ? (
            <>
             
              <Stack.Screen name="PendingForApprovalScreen" component={PendingForApprovalScreen} />
              <Stack.Screen name="HelpScreen" component={HelpScreen} />
            </>
          ) : user.profileStatus === 'ACTIVE' ? (
             <>
              
              <Stack.Screen name="BottomNavigationBar" component={BottomNavigationBar} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="JourneyManagement" component={JourneyManagement} />
              <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
              <Stack.Screen name="PostJourney" component={PostJourney} />
              <Stack.Screen name="AllJourneyList" component={AllJourneyList} />
              <Stack.Screen name="PreviousJourneyDetail" component={PreviousJourneyDetail} />
              <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
              <Stack.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} />
                   <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
              <Stack.Screen name="PendingRequests" component={PendingRequests} />
              <Stack.Screen name="AllParcelsInJourney" component={AllParcelsInJourney} />
              <Stack.Screen name="LocationPickerScreen" component={LocationPickerScreen} />
              <Stack.Screen name="CurrentJourney" component={CurrentJourney} />
              <Stack.Screen name="RequestDetailScreen" component={RequestDetailScreen} />
              <Stack.Screen name="AllSupportTickets" component={AllSupportTickets} />
              <Stack.Screen name="HelpScreen" component={HelpScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="profileStatusScreen" component={profileStatusScreen} />
              <Stack.Screen name="HelpScreen" component={HelpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
   
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MyStatusBar />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
            <View style={styles.container}>
              <Snackbar />
              <AppNavigator />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
});