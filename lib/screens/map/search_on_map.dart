import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_place/google_place.dart';

class SearchOnMap extends StatefulWidget {
  const SearchOnMap({super.key});

  @override
  State<SearchOnMap> createState() => _SearchOnMapState();
}

class _SearchOnMapState extends State<SearchOnMap> {
  final TextEditingController _searchController = TextEditingController();
  GoogleMapController? _mapController;
  LatLng? _currentLocation;
  LatLng? _searchedLocation;
  bool _locationPermissionGranted = false;
  List<AutocompletePrediction> _searchResults = [];

  late GooglePlace _googlePlace;

  @override
  void initState() {
    super.initState();
    _googlePlace = GooglePlace("AIzaSyCzA7Sa70D3EnqD8aNMTM-vZC7byX3bFCU");
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    LocationPermission permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied ||
        permission == LocationPermission.deniedForever) {
      Navigator.pop(context); // Go back if permission is denied
      return;
    }
    _locationPermissionGranted = true;
    Position position = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );
    setState(() {
      _currentLocation = LatLng(position.latitude, position.longitude);
    });
  }

  void _searchPlaces(String query) async {
    if (query.isEmpty) {
      setState(() {
        _searchResults = [];
      });
      return;
    }

    var result = await _googlePlace.autocomplete.get(query);
    if (result != null && result.predictions != null) {
      setState(() {
        _searchResults = result.predictions!;
      });
    }
  }

  void _selectLocation(AutocompletePrediction prediction) async {
    String? placeId = prediction.placeId;
    if (placeId == null) return;

    var details = await _googlePlace.details.get(placeId);
    if (details != null && details.result != null) {
      double lat = details.result!.geometry!.location!.lat!;
      double lng = details.result!.geometry!.location!.lng!;
      LatLng newLocation = LatLng(lat, lng);

      setState(() {
        _searchedLocation = newLocation;
        _searchController.text = prediction.description!;
        _searchResults = [];
      });

      _mapController?.animateCamera(CameraUpdate.newLatLng(newLocation));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Google Map
          Positioned.fill(
            child: GoogleMap(
              initialCameraPosition: CameraPosition(
                target: _currentLocation ?? LatLng(37.7749, -122.4194),
                // Default SF if location unavailable
                zoom: 500,
              ),
              onMapCreated: (controller) => _mapController = controller,
              myLocationEnabled: _locationPermissionGranted,
              myLocationButtonEnabled: true,
              mapType: MapType.satellite,
              markers: {
                if (_searchedLocation != null)
                  Marker(
                    markerId: MarkerId("searched_location"),
                    position: _searchedLocation!,
                    icon: BitmapDescriptor.defaultMarker,
                  ),
              },
            ),
          ),

          // Search Box
          Positioned(
            top: 40,
            left: 15,
            right: 15,
            child: Column(
              children: [
                TextField(
                  controller: _searchController,
                  onChanged: _searchPlaces,
                  decoration: InputDecoration(
                    hintText: "Search location...",
                    prefixIcon: Icon(Icons.search, color: Colors.black54),
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(4),
                      borderSide: BorderSide.none,
                    ),
                  ),
                ),
                if (_searchResults.isNotEmpty)
                  Container(
                    margin: const EdgeInsets.only(top: 5),
                    height: 200,
                    color: Colors.white,
                    child: ListView(
                      children:
                          _searchResults
                              .map(
                                (prediction) => ListTile(
                                  title: Text(prediction.description ?? ""),
                                  onTap: () => _selectLocation(prediction),
                                ),
                              )
                              .toList(),
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
