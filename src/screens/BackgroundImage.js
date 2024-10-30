import { Image, StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import React from 'react'

const BackgroundImage = () => {
  return (
    <SafeAreaView style={{flex:1,position:'absolute'}}>
      <Image
      source={require('../../assets/Images/backgroundImage.png')}
      resizeMode="contain"
      style={[styles.backgroundImage, { opacity: 0.5 }]} 
    // styles={styles.backgroundImage}
      />
    </SafeAreaView>
  )
}

export default BackgroundImage

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        position:'absolute',
        ...StyleSheet.absoluteFillObject,
        alignItems:'center',
        justifyContent:'center',
       
    },
})