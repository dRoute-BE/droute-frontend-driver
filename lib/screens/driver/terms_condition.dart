import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
import 'package:droute_driver_frontend/screens/driver/enable_location.dart';

class TermsAndConditionsPage extends StatefulWidget {
  @override
  _TermsAndConditionsPageState createState() => _TermsAndConditionsPageState();
}

class _TermsAndConditionsPageState extends State<TermsAndConditionsPage> {
  bool _isAccepted = false;

  // Sample API Response (Replace this with actual API call)
  final List<Map<String, String>> termsData = [
    {
      "title": "1. Introduction",
      "description":
          "Welcome to DRoute. By using our services, you agree to these terms.",
    },
    {
      "title": "2. User Responsibilities",
      "description":
          "You must provide accurate information and comply with all local laws.",
    },
    {
      "title": "3. Payment & Transactions",
      "description":
          "All payments are final and non-refundable unless stated otherwise.",
    },
    {
      "title": "4. Liability",
      "description":
          "We are not responsible for losses incurred during transit.",
    },
    {
      "title": "5. Privacy Policy",
      "description":
          "Your personal data will be handled according to our privacy policy.",
    },
    {
      "title": "6. Modifications",
      "description":
          "We may update these terms at any time without prior notice.",
    },
    {
      "title": "7. Liability",
      "description":
          "We are not responsible for losses incurred during transit.",
    },
    {
      "title": "8. Privacy Policy",
      "description":
          "Your personal data will be handled according to our privacy policy.",
    },
    {
      "title": "9. Modifications",
      "description":
          "We may update these terms at any time without prior notice.",
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(
        children: [
          // Top Bar (Full Width with Shadow)
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 5,
                  spreadRadius: 2,
                  offset: Offset(0, 3),
                ),
              ],
            ),
            child: const SafeArea(
              child: Text(
                "Terms & Conditions",
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
            ),
          ),

          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start, // Left-aligned
                  children:
                      termsData.map((term) {
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 16.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                term["title"]!,
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 5),
                              Text(
                                term["description"]!,
                                style: const TextStyle(
                                  fontSize: 16,
                                  color: Colors.black54,
                                ),
                              ),
                            ],
                          ),
                        );
                      }).toList(),
                ),
              ),
            ),
          ),

          // Fixed Accept Checkbox & Next Button
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 5,
                  spreadRadius: 2,
                  offset: Offset(0, -2),
                ),
              ],
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Checkbox(
                      value: _isAccepted,
                      onChanged: (bool? value) {
                        setState(() {
                          _isAccepted = value!;
                        });
                      },
                    ),
                    const Text(
                      "I accept the Terms & Conditions",
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed:
                        _isAccepted
                            ? () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => EnableLocation(),
                                ),
                              );
                            }
                            : null,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColor.primaryColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 10),
                    ),
                    child: const Text(
                      "Next",
                      style: TextStyle(fontSize: 16, color: Colors.white),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
