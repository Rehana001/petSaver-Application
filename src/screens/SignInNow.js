import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image ,SafeAreaView} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import MainHeader from '../components/MainHeader'
import { moderateScale } from 'react-native-size-matters'


const SignInNow = ({ navigation }) => {

    const handleBack = () => {
        navigation.navigate('CaptureScreen')
        console.log('Go back');
    };

    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#C3F4FF'}}>
        <LinearGradient
            colors={['rgba(195, 244, 255, 0)', '#C3F4FF']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}>

        <View>
            <View >
        <MainHeader navigation={navigation} backButton={true} logo={true} heading={''} />
        </View>
            <View style={{ alignItems: 'center', marginTop: moderateScale(20, 0.1) }}>
                <Text style={{ fontFamily: 'Poppins-Medium', color: '#969696', fontSize: moderateScale(12, 0.1), textAlign: 'center' }}>Lorem ipsum dolor sit amet consectetur. {'\n'} Tincidunt sit nulla proin purus </Text>
                <TouchableOpacity style={{ borderBottomWidth: moderateScale(2, 0.1), borderBottomColor: '#0C8CCC', marginTop: moderateScale(35, 0.1) }} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.SignInText}>Sign In Now!</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.TouchableOpacitystyle} onPress={() => navigation.navigate('PostForm')} >
                    <LinearGradient
                        colors={[
                            "#DA007E",
                            "#FF6066"
                        ]}
                        style={{
                            borderRadius: moderateScale(15, 0.1),
                            height: moderateScale(64, 0.1),
                            width: moderateScale(245, 0.1),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}

                    >
                        <Text style={styles.buttonText}>Post Now</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', marginTop: moderateScale(10, 0.1) }}>
                    <Text style={{ fontSize: moderateScale(10, 0.1), color: '#808080', fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Lorem ipsum dolor sit amet consectetur. Tincidunt {"\n"} sit nulla proin purus </Text>
                </View>
                    
                <TouchableOpacity style={styles.TouchableOpacitystyle} onPress={() => navigation.navigate('BottomTabs',{screen:'Search'})} >
                    <LinearGradient
                        colors={[
                            "#8AE3FF",
                            "#0184C8"
                        ]}
                        style={{
                            borderRadius: moderateScale(15, 0.1),
                            height: moderateScale(64, 0.1),
                            width: moderateScale(245, 0.1),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}

                    >
                        <Text style={styles.buttonText}>Find Your Pet</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', marginTop: moderateScale(10, 0.1) }}>
                    <Text style={{ fontSize: moderateScale(10, 0.1), color: '#808080', fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Lorem ipsum dolor sit amet consectetur. Tincidunt {"\n"} sit nulla proin purus </Text>
                </View>
                </View>

            </View>
            <View style={styles.ImageContainer}>
                <Image source={require('../../assets/Images/cat_and_dog.png')} style={styles.ImageStyle} />
            </View>
        </LinearGradient>
        </SafeAreaView>
    )
}

export default SignInNow

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // height: height,
        // width: width,
        position: 'relative'
    },
    SignInText: {
        color: '#0c8ccc',
        fontSize: 23,
        fontFamily: 'Poppins-Bold'
    },
    buttonText: {
        color: 'white',
        fontSize: moderateScale(22, 0.1),
        fontFamily: 'Poppins-Medium'
    },
    ImageContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    ImageStyle: {
        resizeMode: 'contain'
    },
    TouchableOpacitystyle: {
        alignItems: 'center',
        marginTop: moderateScale(30, 0.1),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    shadowContainer1: {
        ...Platform.select({
            // ios: {
            //     shadowColor: "#DA007E",
            //     shadowOffset: {
            //         width: 0,
            //         height: 2,
            //     },
            //     shadowOpacity: 0.25,
            //     shadowRadius: 3.84,
            //     borderTopWidth: 0,
            // },
            // android: {
            //     elevation: 3,
            //     shadowColor: "#DA007E",
            //     shadowOffset: {
            //         width: 0,
            //         height: 4,
            //     },
            //     shadowOpacity: 0.25,
            //     shadowRadius: 3.84,
            //     borderTopWidth: 0,
            // },
        }),
        borderRadius: 10,
        marginVertical: 10,
    },


    shadowContainer2: {
        ...Platform.select({
            ios: {
                shadowColor: "#DA007E",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                borderTopWidth: 0,
            },
            android: {
                elevation: 3,
                shadowColor: "#0184C8",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                borderTopWidth: 0,
            },
        }),
        borderRadius: 10,
        marginVertical: 10,
    },

})