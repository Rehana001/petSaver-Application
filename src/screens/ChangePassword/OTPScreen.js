
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,SafeAreaView,ActivityIndicator } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { OtpInput } from "react-native-otp-entry";
import { LinearGradient } from 'react-native-linear-gradient';
import MainHeader from '../../components/MainHeader';
import RoundButton from '../../components/RoundButton';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useToast } from "react-native-toast-notifications";
import { useSelector, useDispatch } from 'react-redux'
import config from '../../Providers/axios'

const OTPScreen = ({ navigation , route }) => {

    useEffect(() => {
      console.log(route.params.email)
    }, [])
    


    const toast = useToast();
    const [loader, setloader] = useState(false)
    const [otp, setOtp]= useState(null)

    const VerifyOTP = async () => {
        setloader(true)
        let data = {
            email:route.params.email,
            otp:otp
        }
        console.log(data)
        
        try {
            const res = await config.post('/verify_otp', data);
            console.log(data, 'datadata')

            if (res && res.data) {
                console.log("Response: ", res);
                const token = res.data.token; 
                setloader(false)
                toast.show("OTP verified success", {
                    type: "success",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
                navigation.navigate('ChangePassLogin', {email:route.params.email})
            }
        } catch (err) {
            setloader(false)
            if (err.response) {
                toast.show(err.response.data?.message, {
                    type: "danger",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
                console.error('Response data:', err.response.data?.message);
                console.error('Response status:', err.response.status);
                console.error('Response headers:', err.response.headers);

            } else if (err.request) {
                console.error('Request data:', err.request);
            } else {
                console.error('Error message:', err.message);
            }
        }
    };

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#C3F4FF'}}>
            {
                loader && <>
                    <View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1, backgroundColor: '#0000009c', alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="red" />
                    </View>
                </>
            }
        <LinearGradient
            colors={['#C3F4FF', '#C3F4FF']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <View >
                <MainHeader navigation={navigation} backButton={true} logo={false} heading={'OTP'} />
                <Text style={styles.OTPText}>Enter the 4 digit OTP code that we sent on car****@gmail.com</Text>
                <View style={styles.inputContainer}>
                    <OtpInput
                        numberOfDigits={4}
                        focusColor="green"
                        focusStickBlinkingDuration={500}
                        onTextChange={(text) => console.log(text)}
                        onFilled={(text) => setOtp(text)}
                        inputStyle={styles.input}
                        theme={{
                            // containerStyle: styles.container,
                            inputsContainerStyle: styles.inputsContainer,
                            pinCodeContainerStyle: styles.pinCodeContainer,
                            pinCodeTextStyle: styles.pinCodeText,
                            focusStickStyle: styles.focusStick,
                            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                        }}

                    />
                </View>
                <View style={styles.buttonContainer}>
                    <RoundButton label={"Verify"} onPress={() =>VerifyOTP()} />
                </View>
                <View style={styles.bottomText}>
                    <Text style={styles.Text1}>Didn't get the code </Text>
                    <Text style={styles.Text2}>Resend it?</Text>
                </View>
            </View>
        </LinearGradient>
        </SafeAreaView>
    )
}

export default OTPScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    OTPText: {
        textAlign: 'center',
        color: '#434343',
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        marginTop: moderateScale(50, 0.1),
        paddingHorizontal: moderateScale(30, 0.1)
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(20, 0.1),
        paddingHorizontal: moderateScale(40, 0.1),
        paddingVertical: moderateScale(10, 0.1),
    },
    input: {
        flex: 1,
        textAlign: 'center',
        fontSize: moderateScale(20, 0.1),
        color: 'black', 
        borderBottomWidth: 1,
        borderBottomColor: '#0082C6',
        marginHorizontal: moderateScale(5, 0.1),
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: moderateScale(20, 0.1)
    },
    bottomText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(20, 0.1)
    },
    Text1: {
        fontFamily: 'Poppins-Bold',
        color: '#969696',
        fontSize: 11,

    },
    Text2: {
        fontFamily: 'Poppins-Bold',
        color: '#FF3636',
        fontSize: 11
    },
    pinCodeText: {
        color: "grey",
    },
    pinCodeContainer:{
        borderWidth:moderateScale(1,0.1),
        borderColor:'grey'
    }

});
