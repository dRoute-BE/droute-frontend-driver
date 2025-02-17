import 'package:droute_driver_frontend/screens/driver/enable_location.dart';
import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
import 'package:droute_driver_frontend/models/auth_model.dart';
import 'package:droute_driver_frontend/screens/auth/signup.dart';
import 'package:droute_driver_frontend/screens/driver/terms_condition.dart';

class SignInPage extends StatefulWidget {
  const SignInPage({super.key});

  @override
  State<SignInPage> createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  final AuthModel _authModel = AuthModel();
  final TextEditingController _emailOrPhoneController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  bool _isLoading = false;
  String? _errorMessage;
  Color _errorMessageColor = Colors.red;

  void _clearControllers() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _emailOrPhoneController.clear();
      _passwordController.clear();
      setState(() {}); // Force UI update after clearing
    });
  }

  Future<void> _signIn() async {
    print(
      "entered data " +
          _emailOrPhoneController.text +
          "AND " +
          _passwordController.text,
    );

    if (_emailOrPhoneController.text.isEmpty ||
        _passwordController.text.isEmpty) {
      setState(() {
        _errorMessage = "Please Enter given Fields!";
        _errorMessageColor = Colors.red;
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final signInResponse = await _authModel.login(
        _emailOrPhoneController.text,
        _passwordController.text,
      );

      if (signInResponse.containsKey("message") &&
          signInResponse["message"] == "Logged in Successfully..") {
        _clearControllers(); // Clear inputs before navigating

        setState(() {
          _errorMessage = "Logged in Successfully !!";
          _errorMessageColor = Colors.green;
        });

        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => EnableLocation()),
        );
      } else {
        setState(() {
          _errorMessage = "Sign In failed!";
          _errorMessageColor = Colors.red;
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = "An error occurred: $e";
        _errorMessageColor = Colors.red;
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColor.primaryColor,
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight),
                child: IntrinsicHeight(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Expanded(
                        child: Center(
                          child: Image.asset(
                            'assets/images/droute_logo.png',
                            width: 200,
                            height: 170,
                          ),
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 50),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(20),
                            topRight: Radius.circular(20),
                          ),
                        ),
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 16),
                            Text(
                              "Sign In",
                              style: const TextStyle(
                                fontFamily: 'TimesNewRoman',
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 16),

                            CustomText(text: "Email or Mobile number"),
                            TextFormField(
                              controller: _emailOrPhoneController,
                              decoration: InputDecoration(
                                hintText: "Enter Email Or Mobile no.",
                              ),
                            ),

                            SizedBox(height: 10),
                            CustomText(text: "Password"),
                            TextFormField(
                              controller: _passwordController,
                              decoration: InputDecoration(
                                hintText: "Enter Password",
                              ),
                            ),

                            SizedBox(height: 15),

                            InkWell(
                              onTap: () {},
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  Text(
                                    "Forgot Password?",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      color: Colors.red,
                                    ),
                                  ),
                                  Text(
                                    "Click here",
                                    style: TextStyle(
                                      color: AppColor.primaryColor,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            SizedBox(height: 15),

                            InkWell(
                              // onTap: _signIn,
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder:
                                        (context) => TermsAndConditionsPage(),
                                  ),
                                );
                                _isLoading = false;
                              },
                              child: Container(
                                width: double.infinity,
                                padding: EdgeInsets.symmetric(
                                  vertical: 10,
                                  horizontal: 20,
                                ),
                                decoration: BoxDecoration(
                                  color: AppColor.primaryColor,
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child:
                                    _isLoading
                                        ? Center(
                                          child: CircularProgressIndicator(
                                            color: Colors.white,
                                          ),
                                        )
                                        : Text(
                                          "Sign In",
                                          style: TextStyle(color: Colors.white),
                                          textAlign: TextAlign.center,
                                        ),
                              ),
                            ),

                            SizedBox(height: 15),

                            if (_errorMessage != null)
                              Container(
                                padding: EdgeInsets.all(8),

                                child: Text(
                                  _errorMessage!,
                                  style: TextStyle(color: _errorMessageColor),
                                  textAlign: TextAlign.center,
                                ),
                              ),

                            SizedBox(height: 15),

                            InkWell(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => SignUpPage(),
                                  ),
                                );
                              },
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    "Don't Have an Account?",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text(
                                    "Sign Up",
                                    style: TextStyle(
                                      color: AppColor.primaryColor,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            SizedBox(height: 15),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

Widget CustomText({required String text}) {
  return Text(
    text,
    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
  );
}
