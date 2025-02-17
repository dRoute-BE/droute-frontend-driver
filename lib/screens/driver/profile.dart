import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/custom_scaffold.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  @override
  Widget build(BuildContext context) {
    return CustomScaffold(

      body: Padding(
        padding: const EdgeInsets.only(left:20,top:40,right: 20,bottom: 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Center( child: // Center the image
                Container(
                  padding: EdgeInsets.all(3), // Border width
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.grey, width: 2), // Gray border
                  ),
                  child: CircleAvatar(
                    radius: 60,
                    backgroundColor: Colors.grey[300], // Optional background color
                    foregroundImage: NetworkImage('https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
                    child: const Icon(Icons.person, size: 60, color: Colors.white), // Fallback icon if image fails
                  ),
                ),

            ),
            Center(
              child:  Text.rich(
                TextSpan(
                  children: [
                    TextSpan(
                      text: 'Driver Name\n',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                    TextSpan(
                      text: 'driveremail@gmail.com',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w400,
                        color: Colors.teal,
                      ),
                    ),
                  ],
                ),
                textAlign: TextAlign.center,
              ),
            ),
            SizedBox(height: 5),
             const SizedBox(height: 16),
            _buildProfileMenuItem(Icons.person, 'My profile'),
            _buildProfileMenuItem(Icons.payment, 'Payment methods'),
            _buildProfileMenuItem(Icons.shopping_cart, 'Orders'),
            _buildProfileMenuItem(Icons.car_rental, 'Journey'),
            _buildProfileMenuItem(Icons.help, 'Help & support'),
            _buildProfileMenuItem(Icons.logout, 'Log Out'),
            SizedBox(height: 10,)
          ],
        ),
      ),
    );
  }

  Widget _buildProfileMenuItem(IconData icon, String text) {
    return InkWell( // Makes the list items tappable
      onTap: () {
        // Handle navigation or actions for each item
        print('Tapped on $text'); // Example: print to console
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0),
        child: Row(
          children: [
            Icon(icon ,
            size:35 ,
                color: Color(0xFF082131),
            ),
            const SizedBox(width: 20),
            Text(text,
            style: TextStyle(
              fontSize: 20,
              color: Color(0xFF082131),

            ),),
          ],
        ),
      ),
    );
  }
}
