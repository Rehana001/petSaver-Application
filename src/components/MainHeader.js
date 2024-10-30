import { StyleSheet, Text, View, TouchableOpacity, Image, Settings,SafeAreaView } from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { moderateScale } from 'react-native-size-matters';
import SignIn from '../screens/SignIn';
import PostForm from '../screens/PostForm';

const MainHeader = ({ navigation, backButton, logo, heading }) => {
  return (
    <SafeAreaView style={styles.header}>
      {
        backButton ? (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <FeatherIcon name="arrow-left" size={moderateScale(20, 0.1)} color={'white'} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View></View>
          </>
        )
      }

      {
        logo ? (
          <>
            <View style={{ height: moderateScale(70, 0.1), width: moderateScale(96, 0.1) }}>
              <Image source={require('../../assets/Images/Logo.png')} style={styles.LogoImage} />
            </View>
          </>
        ) : heading != '' ? (
          <>
            <Text style={styles.heading}>{heading}</Text>
          </>
        ) : (
          <>
            <View></View>
          </>
        )
      }

      <View>
        <View style={{...styles.backButton, opacity:0}}>
          <FeatherIcon name="arrow-left" size={moderateScale(20, 0.1)} color={'white'} />
        </View>
      </View>

    </SafeAreaView>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: moderateScale(40, 0.1),
    paddingHorizontal: moderateScale(30, 0.1),
    justifyContent: 'space-between',


  },
  backButton: {
    backgroundColor: '#E52C2C',
    height: moderateScale(30, 0.1),
    width: moderateScale(30, 0.1),
    borderRadius: moderateScale(20, 0.1),
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontSize: moderateScale(19, 0.1),
    fontFamily: "Poppins-Bold",
    color: '#0082C6',
  },
  LogoImage: {
    height: '100%',
    width: '100%',
  }
});