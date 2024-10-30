import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Input } from 'react-native-elements'
import RoundButton from '../components/RoundButton'
import MainHeader from '../components/MainHeader'
import { moderateScale } from 'react-native-size-matters'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const PersonalDetails = ({ navigation }) => {

    const handleBack = () => {
        navigation.navigate('CaptureScreen')
        console.log('Go back');
    };
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#C3F4FF'}}>
            {/* <KeyboardAwareScrollView> */}
                <LinearGradient
                    colors={['rgba(195, 244, 255, 0)', '#C3F4FF']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.mainView}
                >

                    <View>
                    <MainHeader navigation={navigation} backButton={true} logo={true} heading={''} />
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: moderateScale(25, 0.1) }}>
                            <Text style={{ color: '#0D8CCD', textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: moderateScale(16, 0.1) }}>Personal Details</Text>
                        </View>

                        <View style={{ marginTop: moderateScale(30, 0.1), paddingHorizontal: moderateScale(30, 0.1) }}>
                            <Input
                                placeholder='Full Name'
                                style={styles.InputStyle}
                                inputContainerStyle={styles.inputContainer}
                            />
                            <Input
                                placeholder='Email'
                                style={styles.InputStyle}
                                inputContainerStyle={styles.inputContainer}
                            />
                            <Input
                                placeholder='Contact No'
                                style={styles.InputStyle}
                                inputContainerStyle={styles.inputContainer}
                            />
                              <Input
                                placeholder='Address'
                                style={styles.InputStyle}
                                inputContainerStyle={styles.inputContainer}
                            />
                              <Input
                                placeholder='Location'
                                style={styles.InputStyle}
                                inputContainerStyle={styles.inputContainer}
                            />
                        </View>
                        <View style={{ alignContent: 'center', alignItems: 'center' ,marginTop:moderateScale(15,0.1)}}>
                            <RoundButton label={"Next"} onPress={() => navigation.navigate('UploadPicture')} />
                        </View>

                      
                    </View>


                </LinearGradient>
            {/* </KeyboardAwareScrollView> */}
        </SafeAreaView>
    )
}

export default PersonalDetails

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor:'black'
    },
    logoContainer: {
        alignItems: 'center',
    },
    InputStyle: {
        borderRadius: 20,
        backgroundColor: "white",
        fontSize: moderateScale(14, 0.1),
        height: moderateScale(46, 0.1),
        width: moderateScale(316, 0.1),
        paddingLeft: moderateScale(20, 0.1),
    },
    inputContainer: {
        borderBottomWidth: 0,
    },
    ImageContainer: {
        // position:'absolute',
        height:moderateScale(200,0.1),
        marginBottom:moderateScale(10,0.1),
        width:'100%',
        bottom:0,
        // backgroundColor:'black'
    },
    ImageStyle: {
        height:'100%',
        width:'100%',
        resizeMode: 'contain',
    },
})
