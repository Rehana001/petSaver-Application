import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Input } from 'react-native-elements'
import RoundButton from '../components/RoundButton'
import MainHeader from '../components/MainHeader'
import { moderateScale } from 'react-native-size-matters'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { useSelector, useDispatch } from 'react-redux'
import { addToken } from '../redux/slicer'
import config from '../Providers/axios'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useToast } from "react-native-toast-notifications";



const SignIn = ({ navigation }) => {

    const toast = useToast();

    const dispatch = useDispatch()

    const [loader, setloader] = useState(false)
    const [showPassword, setshowPassword] = useState(true)

    const handleBack = () => {
        navigation.navigate('CaptureScreen')
        console.log('Go back');
    };

    const login = async (data) => {
        setloader(true)
        try {
            const res = await config.post('/auth/login', data);
            console.log(data, 'datadata')

            if (res && res.data) {
                console.log("Response: ", res);
                dispatch(addToken(res.data.token, res.data.user))
                setloader(false)
                toast.show("Successful login", {
                    type: "success",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
                navigation.navigate('BottomTabs', { screen: 'Home' })
            }
        } catch (err) {
            setloader(false)
            if (err.response) {
                toast.show(err.response.data?.error, {
                    type: "danger",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
                console.error('Response data:', err.response.data?.error);
                console.error('Response status:', err.response.status);
                console.error('Response headers:', err.response.headers);

            } else if (err.request) {
                console.error('Request data:', err.request);
            } else {
                console.error('Error message:', err.message);
            }
        }
    };


    const SignupSchema = Yup.object().shape({
        password: Yup.string()
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    useEffect(() => {

    }, [])


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
                colors={['rgba(195, 244, 255, 0)', '#C3F4FF']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.mainView}
            >

                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => login(values)}
                    validationSchema={SignupSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <MainHeader navigation={navigation} backButton={true} logo={true} heading={''} />
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: moderateScale(25, 0.1) }}>
                                <Text style={{ color: '#0D8CCD', textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: moderateScale(16, 0.1) }}>Sign In</Text>
                            </View>


                            <View style={{ marginTop: moderateScale(50, 0.1), paddingHorizontal: moderateScale(30, 0.1) }}>
                                <Input
                                    placeholder='Username/Email'
                                    style={styles.InputStyle}
                                    inputContainerStyle={styles.inputContainer}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                {errors.email && touched.email ? (
                                    <View style={styles.errorContainer}>
                                        <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    </View>
                                ) : null}
                                <View style={{ position: 'relative' }}>
                                    <Input
                                        placeholder='Password'
                                        style={styles.InputStyle}
                                        inputContainerStyle={styles.inputContainer}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={showPassword}
                                    />
                                    <TouchableOpacity style={{
                                        position:'absolute',
                                        right:25,
                                        top:13
                                    }}
                                    onPress={() => setshowPassword(!showPassword)}
                                    >
                                    <Icon name={ showPassword ? 'eye' : 'eye-slash'} size={17} color={'red'}  />
                                    </TouchableOpacity>
                                </View>
                                {errors.password && touched.password ? (
                                    <View style={styles.errorContainer}>
                                        <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                        <Text style={styles.errorPassword}>{errors.password}</Text>
                                    </View>
                                ) : null}

                                <View style={{ alignItems: 'flex-end', paddingRight: moderateScale(20, 0.1), marginTop: -10, marginBottom: moderateScale(30, 0.1) }}>
                                    <TouchableOpacity style={styles.ForgetPasswordView} onPress={() => navigation.navigate('Forgetpassword')}>
                                        <Text style={styles.ForgetPasswordText}>Forget Password?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                <RoundButton label={"Sign In"}
                                    onPress={
                                        () => { handleSubmit(); }
                                    }
                                    title="Submit"
                                />
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(15, 0.1), justifyContent: 'center', }}>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                                    <Text style={{ color: '#FF3636', fontSize: moderateScale(10, 0.1), fontFamily: 'Poppins-Bold' }}>Register your account!</Text>
                                </TouchableOpacity>
                                <Text style={{ color: '#969696', fontSize: moderateScale(10, 0.1), fontFamily: 'Poppins-Bold' }}> If you don't have an account</Text>
                            </View>
                        </View>
                    )}
                </Formik>

                <View style={styles.ImageContainer}>
                    <Image source={require('../../assets/Images/SignInpetsImage.png')} style={styles.ImageStyle} />
                </View>

            </LinearGradient>
        </SafeAreaView>

    )
}

export default SignIn

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
        height: moderateScale(200, 0.1),
        marginBottom: moderateScale(10, 0.1),
        width: '100%',
        bottom: 0,
        // backgroundColor:'black'
    },
    ImageStyle: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    ForgetPasswordText: {
        color: '#FF3636',
        fontFamily: 'Poppins-Bold',
        fontSize: moderateScale(10, 0.1)
    },
    ForgetPasswordView: {
        // marginLeft: moderateScale(0, 0.1),
        // paddingHorizontal: moderateScale(30, 0.1),
        // marginBottom: moderateScale(20, 0.1),
        // marginTop: moderateScale(-20, 0.1)
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
