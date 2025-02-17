import 'package:droute_driver_frontend/screens/driver/enable_location.dart';
import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
import 'package:droute_driver_frontend/models/auth_model.dart';
import 'package:droute_driver_frontend/screens/auth/signin.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final AuthModel _authModel = AuthModel();
  final TextEditingController _fullNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _mobileController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();

  bool _isLoading = false;
  String? _errorMessage;
  Color _errorMessageColor = Colors.red;

  void _clearControllers() {
    _fullNameController.clear();
    _passwordController.clear();
    _emailController.clear();
    _mobileController.clear();
    _confirmPasswordController.clear();
  }

  // Request OTP action
  Future<void> _requestOtp() async {
    if (_fullNameController.text.isEmpty ||
        _emailController.text.isEmpty ||
        _passwordController.text.isEmpty ||
        _mobileController.text.isEmpty ||
        _confirmPasswordController.text.isEmpty) {
      _errorMessage = "Please Enter All given Fields!";
      _errorMessageColor = Colors.red;

      return;
    }
    ;

    if (_passwordController.text != _confirmPasswordController.text) {
      setState(() {
        _errorMessage = "Passwords do not match!";
        _errorMessageColor = Colors.red;
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final otpResponse = await _authModel.otpRequest(_emailController.text);
      print("signup sent otp" + otpResponse);
      // Handle OTP response and navigate to OTP page
      if (otpResponse.isNotEmpty) {
        setState(() {
          _errorMessage = "OTP sent successfully!";
          _errorMessageColor = Colors.green;
          _clearControllers();
        });
        Navigator.pushNamed(
          context,
          '/otp',
          arguments: {
            'fullName': _fullNameController.text,
            'email': _emailController.text,
            'mobile': _mobileController.text,
            'password': _passwordController.text,
            'otpResponse': otpResponse,
          },
        );
      } else {
        setState(() {
          _errorMessage = "OTP request failed!";
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
        child: SingleChildScrollView(
          physics: BouncingScrollPhysics(),
          child: Column(
            children: [
              SizedBox(height: MediaQuery.of(context).size.height * 0.05),
              Center(
                child: Image.asset(
                  'assets/images/droute_logo.png',
                  width: 200,
                  height: 170,
                ),
              ),
              SizedBox(height: 30),
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(20),
                    topRight: Radius.circular(20),
                  ),
                ),
                padding: const EdgeInsets.only(
                  top: 16,
                  left: 16,
                  right: 16,
                  bottom: 50,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Sign UP",
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 10),
                    CustomText(text: "Full Name:"),
                    TextFormField(
                      controller: _fullNameController,
                      decoration: InputDecoration(
                        hintText: "Enter Your Fullname",
                      ),
                    ),
                    const SizedBox(height: 16),
                    CustomText(text: "Email:"),
                    TextFormField(
                      controller: _emailController,
                      decoration: InputDecoration(hintText: "Enter Email Id"),
                    ),

                    SizedBox(height: 10),
                    CustomText(text: "Mobile Number:"),
                    TextFormField(
                      controller: _mobileController,
                      decoration: InputDecoration(
                        hintText: "Enter mobile Number",
                      ),
                    ),
                    SizedBox(height: 10),
                    CustomText(text: "Password:"),
                    TextFormField(
                      controller: _passwordController,
                      obscureText: true,
                      decoration: InputDecoration(hintText: "Enter Password"),
                    ),
                    SizedBox(height: 10),
                    CustomText(text: "Confirm Password"),
                    TextFormField(
                      controller: _confirmPasswordController,
                      obscureText: true,
                      decoration: InputDecoration(
                        hintText: "Enter Confirm Password",
                      ),
                    ),
                    SizedBox(height: 10),

                    if (_errorMessage != null)
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        child: Text(
                          _errorMessage!,
                          style: TextStyle(color: _errorMessageColor),
                        ),
                      ),
                    _isLoading
                        ? Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(
                            vertical: 10,
                            horizontal: 20,
                          ),
                          decoration: BoxDecoration(
                            color: AppColor.primaryColor,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Center(
                            child: CircularProgressIndicator(
                              color: Colors.white,
                            ),
                          ),
                        )
                        : InkWell(
                          onTap: _requestOtp,
                          child: Container(
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(
                              vertical: 10,
                              horizontal: 20,
                            ),
                            decoration: BoxDecoration(
                              color: AppColor.primaryColor,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: const Text(
                              "Request OTP",
                              style: TextStyle(color: Colors.white),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),

                    SizedBox(height: 16),
                    InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => SignInPage()),
                        );
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            "Already Have an Account?",
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                          SizedBox(width: 5),
                          Text(
                            "Sign In",
                            style: TextStyle(
                              color: AppColor.primaryColor,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

Widget CustomText({required String text}) {
  return Text(
    text,
    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
  );
}
