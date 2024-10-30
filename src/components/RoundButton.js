import { StyleSheet, Text, TouchableOpacity, View ,SafeAreaView} from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'

const RoundButton = ({label,onPress}) => {
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.RoundButtonStyle} onPress={onPress}>
        <Text style={styles.Buttonlabel}>{label}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default RoundButton

const styles = StyleSheet.create({
    RoundButtonStyle:{
        backgroundColor:'#E52C2C',
        // padding:'6%',
        height:moderateScale(38, 0.1),
        width:moderateScale(157, 0.1),
        borderRadius:20,
      alignItems:'center',
      justifyContent:'center'
    },
    Buttonlabel:{
        color:'white',
        textAlign: 'center',
        // marginLeft:'13%',
        // marginRight:'13%',
        fontFamily:'Poppins-SemiBold'
    }
})