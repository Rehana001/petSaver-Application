import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { moderateScale } from 'react-native-size-matters';


const GooglePlaces = ({ setLat, setLong, setLocation, location, color }) => {

    const ref = useRef()

    const renderRow = (rowData, index) => {
        return <Text style={{ color: 'black' }}>{rowData.description}</Text>;
    };

    useEffect(() => {
        if(location){
            ref.current.setAddressText(location)
        }
    }, [])

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder={'Enter Location'}
                ref={ref}
                currentLocation={false}
                enableHighAccuracyLocation={true}
                enablePoweredByContainer={false}
                textInputProps={{ placeholderTextColor: 'grey' }}
                debounce={200}
                disableScroll={true}
                onFail={(error) => {
                    console.error('onFail error: ', error);
                }}
                onPress={(data, details = null) => {
                    console.log('Selected data:', data);
                    console.log('Selected details:', details);
                    setLat(details?.geometry?.location?.lat)
                    setLong(details?.geometry?.location?.lng)
                    setLocation(details?.formatted_address)

                    // Handle the selected place and its details here
                }}
                query={{
                    key: 'AIzaSyC79Nf0XQTQydISzOxiU-SCmsIVVFYKnC8',
                    language: 'en',
                }}
                fetchDetails={true}
                renderRow={renderRow}
                styles={{
                    textInput: color == 'white' ? styles.textInput : styles.textInput2,
                    container: styles.autocompleteContainer,
                    listView: styles.listView,
                }}
            />

        </View>
    )
}

export default GooglePlaces

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'visible', // Ensure overflow is visible
        zIndex: 1,
    },
    textInput: {
        borderRadius: 20,
        backgroundColor: "white",
        fontSize: moderateScale(14, 0.1),
        height: moderateScale(46, 0.1),
        width: width - 25,
        paddingLeft: moderateScale(20, 0.1),
        color:'#000'
    },
    textInput2: {
        borderRadius: 20,
        backgroundColor: "#f1f1f1",
        fontSize: moderateScale(14, 0.1),
        height: moderateScale(46, 0.1),
        width: width - 25,
        paddingLeft: moderateScale(20, 0.1),
    },
    autocompleteContainer: {
        borderBottomWidth: 0,
        width: width - 25,
        paddingLeft: moderateScale(10, 0.1),
        paddingBottom: moderateScale(20, 0.1)
    }
})