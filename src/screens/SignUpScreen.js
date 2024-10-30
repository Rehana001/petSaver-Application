import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Input } from 'react-native-elements'
import RoundButton from '../components/RoundButton'
import MainHeader from '../components/MainHeader'
import { moderateScale } from 'react-native-size-matters'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useToast } from "react-native-toast-notifications";
import { useSelector, useDispatch } from 'react-redux'
import config from '../Providers/axios'
import PhoneInput from "react-native-phone-number-input";



const SignUpScreen = ({ navigation }) => {

    const toast = useToast();

    const [loader, setloader] = useState(false)
    const [showPassword, setshowPassword] = useState(true)
    const [CountryCode,setCountryCode]=useState(null)
    const [submit, setSubmit] = useState(false)
    const [value, setValue] = useState('');
    const [phoneNum, setphoneNum]= useState(null);
    const phoneInput = useRef(null); 


    const SignupSchema = Yup.object().shape({
        password: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        name: Yup.string().required('Required'),
        // contact_no: Yup.number().required('Required'),
        confirm_password: Yup.string().required('Required'),
    });

    const Auth = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    const register = async (data) => {
       
        data['contact_no']=phoneNum
        if(phoneNum!= "" && phoneNum !=null){
            setloader(true)
            try {
                const res = await config.post('/auth/register', data);
                console.log(data, 'datadata')
    
                if (res && res.data) {
                    console.log("Response: ", res);
                    const token = res.data.token;
                    setloader(false)
                    toast.show("User has been registered", {
                        type: "success",
                        placement: "bottom",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                    });
                    navigation.navigate('SignIn')
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
            <ScrollView>
                <View style={styles.container}>
                    {/* <KeyboardAwareScrollView> */}
                    <LinearGradient
                        colors={['rgba(195, 244, 255, 0)', '#C3F4FF']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.mainView}
                    >

                        <View>
                            <View >
                                <MainHeader navigation={navigation} backButton={true} logo={true} heading={''} />
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: moderateScale(25, 0.1) }}>
                                <Text style={{ color: '#0D8CCD', textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: moderateScale(16, 0.1) }}>Sign Up Now</Text>
                            </View>

                            <Formik
                                initialValues={{ name: '', email: '', contact_no: '', password: '', confirm_password: '' }}
                                onSubmit={values => register(values)}
                                validationSchema={SignupSchema}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <View style={{ marginTop: moderateScale(50, 0.1), paddingHorizontal: moderateScale(30, 0.1) }}>
                                        <Input
                                            placeholder='username'
                                            style={styles.InputStyle}
                                            inputContainerStyle={styles.inputContainer}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.name}
                                        />
                                        {errors.name && touched.name ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>{errors.name}</Text>
                                            </View>
                                        ) : null}
                                        <Input
                                            placeholder='Email'
                                            style={styles.InputStyle}
                                            inputContainerStyle={styles.inputContainer}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>{errors.email}</Text>
                                            </View>
                                        ) : null}
                                        {/* <Input
                                            placeholder='Contact No.'
                                            style={styles.InputStyle}
                                            inputContainerStyle={styles.inputContainer}
                                            onChangeText={handleChange('contact_no')}
                                            onBlur={handleBlur('contact_no')}
                                            value={values.contact_no}
                                        />
                                        {errors.contact_no && touched.contact_no ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>{errors.contact_no}</Text>
                                            </View>
                                        ) : null} */}
                                       
                                        <PhoneInput
                                            ref={phoneInput}
                                            textContainerStyle={[
                                                {
                                                    backgroundColor: 'white',
                                                    paddingVertical: 0,
                                                    borderRadius:moderateScale(50,0.1)
                                                   
                                                },
                                            ]}
                                            containerStyle={[
                                                // s.phoneInputBox,
                                                {
                                                    paddingVertical: 0,
                                                    width: '95%',
                                                    marginHorizontal:moderateScale(7,0.1),
                                                    borderRadius:moderateScale(20,0.1),
                                                    marginBottom:moderateScale(25,0.1)
                                                },
                                            ]}
                                            defaultCode="GB"
                                            layout="first"
                                            onChangeText={text => {
                                                console.log(text)
                                               
                                               
                                            }}
                                            onChangeFormattedText={text => {
                                                console.log(text)
                                                setphoneNum(text);
                                                // setBookerPhone(text);
                                            }}
                                            onChangeCountry={text => {
                                                console.log(text)
                                                setCountryCode(text?.callingCode?.[0]);
                                                // setLocation(text?.name);
                                            }}
                                        />
                                        {phoneNum == '' || (phoneNum == null  && submit) ? (
                                            <>
                                                <View style={{flexDirection:'row'}}>
                                                <Icon name='asterisk' size={6} color={'red'} style={{ marginLeft: moderateScale(15),marginRight:moderateScale(5,0.1),marginTop:moderateScale(-15,0.1)}} />
                                                    <Text style={{marginBottom:moderateScale(10,0.1),color:'red', fontSize: moderateScale(11),marginBottom: moderateScale(20),marginTop:moderateScale(-20,0.1)}}>Required</Text>
                                                </View>
                                            </>
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
                                                position: 'absolute',
                                                right: 25,
                                                top: 13
                                            }}
                                                onPress={() => setshowPassword(!showPassword)}
                                            >
                                                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={17} color={'red'} />
                                            </TouchableOpacity>
                                        </View>
                                        {errors.password && touched.password ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>{errors.password}</Text>
                                            </View>
                                        ) : null}

                                        <View style={{ position: 'relative' }}>
                                            <Input
                                                placeholder='Confirm Password'
                                                style={styles.InputStyle}
                                                inputContainerStyle={styles.inputContainer}
                                                onChangeText={handleChange('confirm_password')}
                                                onBlur={handleBlur('confirm_password')}
                                                value={values.confirm_password}
                                                secureTextEntry={showPassword}
                                            />
                                            <TouchableOpacity style={{
                                                position: 'absolute',
                                                right: 25,
                                                top: 13
                                            }}
                                                onPress={() => setshowPassword(!showPassword)}
                                            >
                                                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={17} color={'red'} />
                                            </TouchableOpacity>
                                        </View>
                                        {errors.confirm_password && touched.confirm_password ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>{errors.confirm_password}</Text>
                                            </View>
                                        ) : null}
                                        <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                            <RoundButton
                                                onPress={
                                                    () => { handleSubmit(); setSubmit(true) }
                                                }
                                                label={"Register Now"}
                                            />
                                        </View>
                                    </View>
                                )}
                            </Formik>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(100, 0.1), justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                    <Text style={{ color: '#FF3636', fontWeight: 'bold', fontSize: moderateScale(10, 0.1) }}>Sign in Now!</Text>
                                </TouchableOpacity>
                                <Text style={{ fontWeight: 'bold', color: '#969696', fontSize: moderateScale(10, 0.1) }}> If you already have an account</Text>
                            </View>
                        </View>



                    </LinearGradient>
                    {/* </KeyboardAwareScrollView> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpScreen

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
        flex: 1,
        justifyContent: 'space-between',
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
        bottom: 0,
        right: 0,
    },
    ImageStyle: {
        resizeMode: 'contain'
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
