// custom_scaffold.dart
import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/navigation_bar.dart';  // Updated import

class CustomScaffold extends StatelessWidget {
  final Widget body;

  CustomScaffold({required this.body});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: body,
      bottomNavigationBar: CustomNavigationBar(),  // Use renamed widget here
    );
  }
}
