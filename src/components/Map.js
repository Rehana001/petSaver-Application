import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import config from '../Providers/axios';
import { useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';

export default function MapScreen({ lat, long, filterData }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loader, setLoader] = useState(false);
  const [places, setPlaces] = useState([]);
  const [region, setRegion] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const token = useSelector((state) => state.auth.token);
  const mapRef = useRef(null); // Create a reference for the MapView

  const handleMarkerPress = (place) => {
    setSelectedPlace(place);
  };

  const getData = async (data) => {
    setLoader(true);
    console.log(data, 'datadatadata')
    try {
      const res = await config.post('/get-post', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res && res.data) {
        let data = [];
        res.data.recent_posts.forEach((v) => {
          data.push({
            name: v.name,
            coordinate: {
              latitude: Number(v.lat),
              longitude: Number(v.lng),
            },
            imageUri: v.images[0].image_url,
            id:v?.id
          });
        });
        res.data.new_posts.forEach((v) => {
          data.push({
            name: v.name,
            coordinate: {
              latitude: Number(v.lat),
              longitude: Number(v.lng),
            },
            imageUri: v.images[0].image_url,
            id:v?.id
          });
        });
        setPlaces(data);
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      console.error('API Error:', err.message);
    }
  };

  useEffect(() => {
    console.log(filterData, 'from map')
    getData(filterData)
  }, [filterData])


  // const requestLocationPermission = async () => {
  //   try {
  //     if (Platform.OS === 'android') {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //       );
  //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('Location permission denied');
  //         return null;
  //       }
  //     }

  //     return new Promise((resolve, reject) => {
  //       Geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           setRegion({
  //             latitude,
  //             longitude,
  //             latitudeDelta: 0.0922,
  //             longitudeDelta: 0.0421,
  //           });
  //           resolve({ latitude, longitude }); // Resolve with the location data.

  //         },
  //         (error) => {
  //           console.error('Error getting current location:', error);
  //           reject(error); // Reject the Promise on error.
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     console.error('Error requesting location permission:', error);
  //     throw error; // Rethrow the error if needed.
  //   }
  // };

  // useEffect(() => {
  //   if (isFocused) {
  //     getData();
  //   }
  // }, [isFocused]);

  // useEffect(() => {
  //   requestLocationPermission();
  // }, [])

  const setRegionFunc = (reg) => {
    const newRegion = {
      latitude: reg?.latitude,
      longitude: reg?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setRegion(newRegion);
  }


  useEffect(() => {
    if (lat && long) {
      const newRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(newRegion);
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000); // Animate to the new region over 1 second
      }
    }
  }, [lat, long]);

  return (
    <View style={styles.container}>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        onRegionChangeComplete={(reg) => setRegionFunc(reg)}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={place.coordinate}
            onPress={() => handleMarkerPress(place)}
          />
        ))}
      </MapView>
      {selectedPlace && (
        <TouchableOpacity style={styles.callout} onPress={() => navigation.navigate('InnerScreen', { id: selectedPlace.id })}>
          <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
          <Text style={styles.PetName}>{selectedPlace.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callout: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  PetName: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14, 0.1),
  },
});
