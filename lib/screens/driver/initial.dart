import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';

class Initial extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: AppColor.primaryColor, // Set background color
        child: Center(
          child: Image.asset(
            'assets/images/droute_logo.png', // Path to your logo
            width: 200, // Adjust size as needed
            height: 200,
          ),
        ),
      ),
    );
  }
}
