import 'package:droute_driver_frontend/screens/driver/home.dart';
import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/utils/routes.dart'; // Import routes file
import 'package:droute_driver_frontend/screens/driver/initial.dart'; // Import HomePage
import 'package:droute_driver_frontend/screens/map/search_on_map.dart';
import 'package:droute_driver_frontend/screens/driver/Chat.dart';
import 'package:droute_driver_frontend/screens/map/Map_Page.dart';
import 'package:droute_driver_frontend/screens/driver/enable_location.dart';
import 'package:droute_driver_frontend/screens/driver/profile.dart';


void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        fontFamily: 'Poppins', // Set default font
      ),
      title: 'dRoute Driver App',
      debugShowCheckedModeBanner: false,
      // home: SplashScreen(),// Set SplashScreen as the initial screen
      home: ProfileScreen(),
      routes: appRoutes, // Define app routes
    );
  }
}

// class SplashScreen extends StatefulWidget {
//   @override
//   _SplashScreenState createState() => _SplashScreenState();
// }
//
// class _SplashScreenState extends State<SplashScreen> {
//   @override
//   void initState() {
//     super.initState();
//     // Navigate to SignupPage after 1 second
//     Future.delayed(const Duration(seconds: 3), () {
//       Navigator.pushReplacementNamed(context, '/signup'); // Navigate to Signup
//     });
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Initial(); // Show the HomePage as the splash screen
//   }
// }
