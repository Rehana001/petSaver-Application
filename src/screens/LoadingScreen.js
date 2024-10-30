// import { StyleSheet, Text, View ,Image} from 'react-native'
// import React from 'react'
// import BackgroundImage from './BackgroundImage';

// const LoadingScreen = ({navigation}) => {

//   const Splash=()=>{
//   setTimeout(() => {
//     navigation.navigate('CaptureScreen')
//   }, 1000);}

//   return (
   
//     <View style={styles.container}>
//       {/* <Text>LoadingScreen</Text> */}
//       <Image
//                 source={require('../../assets/Images/backgroundcolor.png')}
//                 style={styles.backgroundImage}
//             />
//             <View style={{ flex: 1, position: 'absolute' }}>
//                 <BackgroundImage />
//             </View>
//     </View>
//   )
// }

// export default LoadingScreen

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         alignContent:'center'
//     }
// })

import { StyleSheet, Text, View, Image ,SafeAreaView} from 'react-native';
import React, { useEffect } from 'react';
import BackgroundImage from './BackgroundImage';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    console.log('Splash screen timeout started');
    const splashTimeout = setTimeout(() => {
      console.log('Navigating to CaptureScreen');
      navigation.navigate('CaptureScreen');
    }, 2000);

    return () => clearTimeout(splashTimeout);
  }, [navigation]);

  return (
   
        <SafeAreaView style={styles.container}>
          {/* <Text>LoadingScreen</Text> */}
          <Image
                    source={require('../../assets/Images/backgroundcolor.png')}
                    style={styles.backgroundImage}
                />
                <View style={{ flex: 1, position: 'absolute' }}>
                    <BackgroundImage />
                </View>
        </SafeAreaView>
      )
    }
    
    export default LoadingScreen
    
    const styles = StyleSheet.create({
        container:{
            flex:1,
            alignContent:'center'
        }
    })
    