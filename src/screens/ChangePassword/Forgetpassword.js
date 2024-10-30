import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, SafeAreaView ,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { Image, Input } from 'react-native-elements'
import RoundButton from '../../components/RoundButton'
import SettingsHeader from '../../components/SettingsHeader'
import { moderateScale } from 'react-native-size-matters'
import MainHeader from '../../components/MainHeader';
import Icon2 from 'react-native-vector-icons/Entypo'
import Calendar from 'react-native-calendar-picker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useToast } from "react-native-toast-notifications";
import { useSelector, useDispatch } from 'react-redux'
import config from '../../Providers/axios'


const Forgetpassword = ({ navigation }) => {

    const toast = useToast();
    const [loader, setloader] = useState(false)

    const handleSelectDate = (date) => {
        setSelectedDate(date);
        setShowCalendarModal(false);
    };


    const ForgetPasswordSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const Auth = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    const sendOTP = async (data) => {
        setloader(true)
        console.log(data)
        try {
            const res = await config.post('/send', data);
            console.log(data, 'datadata')

            if (res && res.data) {
                console.log("Response: ", res);
                const token = res.data.token; 
                setloader(false)
                toast.show("OTP send successfully", {
                    type: "success",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
                navigation.navigate('OTPScreen',data) 
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#C3F4FF' }}>
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
                <View>
                    <View>
                        <MainHeader navigation={navigation} backButton={true} logo={false} heading={'Forget Password'} />
                    </View>

                    <Formik
                        initialValues={{ email: '' }}
                        // onSubmit={values => console.log(values)}
                        onSubmit={values => sendOTP(values)}
                        validationSchema={ForgetPasswordSchema}
                    >

                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
                                <View style={{ marginTop: moderateScale(50, 0.1), paddingHorizontal: moderateScale(30, 0.1) }}>

                                    <Input
                                        placeholder='Email Adress'
                                        style={styles.InputStyle}
                                        inputContainerStyle={styles.inputContainer}
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                    />
                                      {errors.email && touched.email ? (
                                    <View style={styles.errorContainer}>
                                        <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                        <Text style={styles.errorPassword}>{errors.email}</Text>
                                    </View>
                                ) : null}
                                </View>
                                <View style={{ alignContent: 'center', alignItems: 'center', marginTop: moderateScale(20, 0.1) }}>
                                    <RoundButton label={"Send OTP"} onPress={
                                        () => { handleSubmit()
                                            // navigation.navigate('OTPScreen') 
                                        }
                                    } />
                                </View>
                            </View>
                        )}

                    </Formik>





                </View>


            </LinearGradient>
        </SafeAreaView>

    )
}

export default Forgetpassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',

    },
    DescriptionStyle: {
        borderRadius: moderateScale(10, 0.1),
        backgroundColor: "#F3F3F3",
        paddingLeft: moderateScale(10, 0.1),
        fontSize: moderateScale(10, 0.1),
        fontFamily: 'Poppins-Medium',
        paddingBottom: moderateScale(30, 0.1),
        marginLeft: moderateScale(6, 0, 1),
        marginRight: moderateScale(5, 0, 1),
    },
    inputContainer: {
        borderBottomWidth: 0,
        marginTop: moderateScale(25, 0.1)
    },
    textContainer: {
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: moderateScale(50, 0.1),
        paddingTop: moderateScale(20, 0.1)
    },
    text1: {
        color: '#434343',
        fontSize: moderateScale(12, 0.1),
        fontFamily: 'Poppins-Medium',
    },
    text2: {
        color: '#FF1313',
        fontSize: moderateScale(12, 0.1),
        fontFamily: 'Poppins-Medium'
    },
    searchBarStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F2F2F2',
        borderRadius: moderateScale(20, 0.1),
        paddingVertical: moderateScale(10, 0.1),
        paddingHorizontal: moderateScale(15, 0.1),
        // height: moderateScale(34, 0.1),
        marginBottom: moderateScale(10, 0.1),
    },
    searchIcon: {
        marginRight: 0,
        marginBottom: moderateScale(4, 0.1),
        paddingRight: moderateScale(10, 0.1)
    },
    termsText: {
        color: '#0082C6',
        fontFamily: 'Poppins-Regular',
        fontSize: moderateScale(12, 0.1)
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,

        borderRadius: 10,
        width: '100%',
        maxHeight: '80%', // Set maximum height of the modal content
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    CloseButtonCalendar: {
        borderRadius: moderateScale(10, 0.1),
        backgroundColor: '#E52C2C',
        paddingLeft: moderateScale(20, 0.1),
        paddingRight: moderateScale(20, 0.1),
        paddingTop: moderateScale(5, 0.1),
        paddingBottom: moderateScale(5, 0.1)
    },
    CloseText: {
        color: 'white',
    },
    InputStyle: {
        borderRadius: 20,
        backgroundColor: "white",
        fontSize: moderateScale(14, 0.1),
        fontFamily: 'Poppins-Light',
        height: moderateScale(46, 0.1),
        width: moderateScale(316, 0.1),
        paddingLeft: moderateScale(20, 0.1),
    },
    inputContainer: {
        borderBottomWidth: 0,
    },
    ProfilePicture: {
        backgroundColor: '#D9D9D9',
        // paddingTop:moderateScale(20,0.1),
        // paddingBottom:moderateScale(20,0.1),
        marginLeft: moderateScale(110, 0.1),
        marginRight: moderateScale(100, 0.1),
        borderRadius: moderateScale(100, 0.1),
        height: moderateScale(115, 0.1),
        marginBottom: moderateScale(30, 0.1)
    },
    CameraIcon: {
        marginLeft: moderateScale(80, 0.1),
        marginTop: moderateScale(-20, 0.1)
    },
    errorText: {
        color: 'red',
        fontSize: moderateScale(11),
        marginLeft: moderateScale(25),
        marginBottom: moderateScale(20),
        marginTop: moderateScale(-20)
    },
    errorPassword: {
        color: 'red',
        fontSize: moderateScale(11),
        marginLeft: moderateScale(25),
        marginBottom: moderateScale(20),
        marginTop: moderateScale(-20)
    },
    ErrorIcon: {
        marginBottom: moderateScale(10),
        marginLeft: moderateScale(15),
    },
    errorContainer: {
        marginTop: moderateScale(-16)
    }
})