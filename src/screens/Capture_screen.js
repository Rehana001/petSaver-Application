import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import BackgroundImage from './BackgroundImage';
import Icon from 'react-native-vector-icons/EvilIcons';
import RoundButton from '../components/RoundButton';
import { moderateScale } from 'react-native-size-matters';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';

const CaptureScreen = ({ navigation, props }) => {

    useEffect(() => {
        // GoogleSignin.configure({
        //     //
        //   });

        // getCurrentUser()
    }, [])

    const GsignIn = async () => {
        try {
            // await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo, 'userInfo');
        } catch (error) {
            console.log(error, 'error');
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("Sign in action cancelled"); // Handle sign-in cancellation
                // You can display a message to the user, e.g., a toast/notification
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("Sign-in operation is already in progress");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("Google Play services not available or outdated");
            } else {
                console.log("An error occurred during sign-in:", error);
            }
        }
    };

    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        const isSignedIn = await GoogleSignin.isSignedIn();
        console.log(currentUser, isSignedIn)

        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      };



    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/Images/petBg.png')} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10%', paddingTop: '15%' }}>
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <View style={{ height: moderateScale(188, 0.1), width: moderateScale(260, 0.1) }}>
                            <Image source={require('../../assets/Images/Logo.png')}
                                style={{ width: '100%', height: '100%', alignItems: 'center' }}
                            />
                        </View>

                        <View>
                            <TouchableOpacity style={styles.CaptureButton} onPress={() => navigation.navigate('Sign_In_Now')}>
                                <View style={{ height: moderateScale(31, 0.1), width: moderateScale(42, 0.1) }}>
                                    <Image source={require('../../assets/Images/cameraIcon.png')}
                                        style={{ width: '100%', height: '100%', alignItems: 'center' }}
                                    />
                                </View>
                                <Text style={styles.ButtonTextStyle}>Capture Now</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center', textAlign: 'center', marginTop: '18%' }}>
                            <Text style={styles.AftercaptureText}>Together, {'\n'}
                                we can move the{'\n'}
                                world for animals {'\n'}</Text>
                            <Text style={styles.DummyText}>Lorem ipsum dolor sit amet consectetur. {'\n'} Tincidunt sit nulla proin purus </Text>
                        </View>
                    </View>
                    <View style={styles.SignUpButtonStyle}>
                        <RoundButton label={'Sign In'} onPress={() => navigation.navigate('SignIn')} />
                    </View>


                    {/* <View style={styles.GoogleLoginView}>
                        <TouchableOpacity style={styles.GoogleLoginButton} onPress={() => GsignIn()}>
                        <Image source={require('../../assets/Images/googleIcon.png')} style={{height:moderateScale(20),width:moderateScale(20)}}/>
                        <Text style={styles.ContinueGoogleText}>Continue with google</Text>
                        </TouchableOpacity>
                    </View> */}


                    <View style={styles.lasttext}>
                        <Text style={styles.donthaveaccountstyle}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={{ borderBottomWidth: 1, borderBottomColor: '#E52C2C' }}>
                            <Text style={styles.SignUpNowstyle}>Sign Up Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

        </View>
    );
}

export default CaptureScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundImage: {
        // ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        resizeMode: 'cover',
    },
    CaptureButton: {
        flexDirection: 'row',
        // flex: 1,
        backgroundColor: '#E52C2C',
        borderRadius: 6,
        padding: moderateScale(12, 0.1),
        // marginRight: '15%',
        // marginLeft: '9%',
        // marginTop: '20%',
        alignItems: 'center',
        marginTop: moderateScale(70, 0.1)
    },
    ButtonTextStyle: {
        color: '#FFFFFF',
        fontSize: moderateScale(18, 0.1),
        fontFamily: 'Poppins-Medium',
        marginLeft: 7,
    },
    AftercaptureText: {
        color: 'white',
        fontSize: moderateScale(28, 0.1),
        textAlign: 'center',
        lineHeight: moderateScale(31, 0.1),
        fontFamily: "Poppins-SemiBold",
    },
    AftercaptureText2: {
        color: 'white',
        fontSize: 30,
        marginRight: '15%',
        marginLeft: '10%',
        fontWeight: 'bold',
        marginVertical: -2,
        textShadowColor: 'black',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 2,
            height: 2,
        },
    },
    AftercaptureText3: {
        color: 'white',
        fontSize: 30,
        marginRight: '10%',
        marginLeft: '10%',
        marginVertical: -10,
        textShadowColor: 'black',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 2,
            height: 2,
        },
    },
    dummyTextView: {
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '9%'
    },
    DummyText: {
        color: 'white',
        textAlign:'center',
        marginTop:moderateScale(-30, 0.1)
    },
    SignUpButtonStyle: {
        // marginTop: '50%',
        // textAlign: 'center',
        // justifyContent: 'center',
        // flex: 1
        marginBottom: moderateScale(15, 0.1)
    },
    lasttext: {
        flexDirection: 'row',
        // alignItems:'center',
        // justifyContent:'center'
    },
    donthaveaccountstyle: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    },
    SignUpNowstyle: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        marginLeft: 2
    },
    GoogleLoginView:{
        backgroundColor:'white',
        padding:moderateScale(10),
        borderRadius:moderateScale(15),
        marginBottom:moderateScale(10),
    },
    ContinueGoogleText:{
        color:'black',
        textAlign: 'center',
        fontSize:moderateScale(11),
        fontFamily:'Poppins-Regular' ,
    },
    GoogleLoginButton:{
        flexDirection:'row',
        padding:moderateScale(3),
    }




});