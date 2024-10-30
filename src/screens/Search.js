
import React, { useRef, useState ,useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Platform, PermissionsAndroid ,SafeAreaView} from 'react-native';
import Icon2 from 'react-native-vector-icons/Entypo';
import { moderateScale } from 'react-native-size-matters';
// import Geolocation from '@react-native-community/geolocation';
import Map from '../components/Map';
import Filters from '../components/Filters';
import GooglePlaces from '../components/GooglePlaces';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';


const Search = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [location, setLocation] = useState(null);
  const [filterData, setfilterData] = useState(null)
  const [sheet, setSheet] = useState(false);



  const filter = (data) => {
    setfilterData(data)
    console.log(data, 'under the search')
  }

  const FilterReset = () => {
    setfilterData(null)
  }

useEffect(() => {
 handleGetCurrentLocation()
}, [])


// const handleGetCurrentLocation = async () => {
//   console.log('Handling current location');
//   try {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );
//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Location permission denied');
//         return null;
//       }
//     } else if (Platform.OS === 'ios') {
//       const status = await Geolocation.requestAuthorization('whenInUse');
//       if (status !== 'granted') {
//         console.log('Location permission denied');
//         return null;
//       }
//     }

//     return new Promise((resolve, reject) => {
//       Geolocation.getCurrentPosition(
//         (position) => {
//           console.log(position);
//           const { latitude, longitude } = position.coords;
//           setLat(latitude);
//           setLong(longitude);
//           resolve({ latitude, longitude });
//         },
//         (error) => {
//           console.error('Error getting current location:', error);
//           reject(error);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

const handleGetCurrentLocation = async () => {
  console.log('Handling current location');
  try {
    if (Platform.OS === 'android') {
      // Check if permissions are granted or request them
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
        return null;
      }
    } else if (Platform.OS === 'ios') {
      // Check iOS location authorization status
      const status = await Geolocation.requestAuthorization('whenInUse');
      if (status !== 'granted') {
        console.log('Location permission denied');
        return null;
      }
    }

    // Return a promise to handle getCurrentPosition
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          // Assuming setLat and setLong are state setters for latitude and longitude
          setLat(latitude);
          setLong(longitude);
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
          Alert.alert('Error', 'Failed to get location. Please enable location services.');
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};



  return (
    <SafeAreaView style={{ flex: 1}}>
    <View style={styles.container}>
      <Map lat={lat} long={long} filterData={filterData} />
      <View style={{ position: 'relative', position: 'absolute', top: moderateScale(20, 0.1) }}>
        <GooglePlaces setLat={setLat} setLong={setLong} setLocation={setLocation} color={"white"} />
      </View>
      <TouchableOpacity style={styles.CrossIconView} onPress={handleGetCurrentLocation}>
        <Icon2 name="location-pin" size={30} color={"#C11E1E"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomTabView} onPress={() => setSheet(true)}>
        <Icon2 name="text" size={25} color={"#0082C6"} />
      </TouchableOpacity>
      <Filters sheet={sheet} setSheet={setSheet} filter={filter} FilterReset={FilterReset} />
    </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: moderateScale(20, 0.1)
  },
  CrossIconView: {
    alignSelf: 'flex-end',
    marginBottom: moderateScale(10, 0.1),
    position: 'absolute',
    bottom: moderateScale(110, 0.1),
    backgroundColor: 'white',
    borderRadius: moderateScale(100, 0.1),
    zIndex: 9,
    height: moderateScale(45, 0.1),
    width: moderateScale(45, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    right: 10

  },
  bottomTabView: {
    backgroundColor: 'white',
    padding: moderateScale(10, 0.1),
    borderRadius: moderateScale(100, 0.1),
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: moderateScale(70, 0.1),
    height: moderateScale(45, 0.1),
    width: moderateScale(45, 0.1),
    zIndex: 9,
    right: 10
  }
});
