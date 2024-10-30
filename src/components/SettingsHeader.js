import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView } from 'react-native';
import React from 'react';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';

const SettingsHeader = ({ backButton, heading }) => {
  return (
    <SafeAreaView style={styles.header}>
      {backButton && (
        <TouchableOpacity onPress={backButton.onPress} style={styles.backButton}>
          <AntdesignIcon name="leftcircle" size={30} color={'#E52C2C'} />
        </TouchableOpacity>
      )}
      <Text style={styles.heading}>{heading}</Text>
    </SafeAreaView>
  );
};

export default SettingsHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
    borderBottomWidth: 0,
    paddingHorizontal: 90,
  },
  backButton: {
    position: 'absolute',
    left: 4,
    marginLeft:'0%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#0082C6',
  },
});