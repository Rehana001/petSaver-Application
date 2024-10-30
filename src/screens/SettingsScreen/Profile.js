import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, PermissionsAndroid, Platform, SafeAreaView, ActivityIndicator,Alert } from 'react-native';
import { Image, Input } from 'react-native-elements';
import RoundButton from '../../components/RoundButton';
import MainHeader from '../../components/MainHeader';
import { moderateScale } from 'react-native-size-matters';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import CameraIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from "react-native-raw-bottom-sheet";
import { Divider } from 'react-native-paper';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import config from '../../Providers/axios';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useToast } from 'react-native-toast-notifications';
import { addToken, loadToken, removeTokenAsync } from '../../redux/slicer';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Profile = ({ navigation }) => {
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [loader, setLoader] = useState(false);
    const RBSheetRef = useRef();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const toast = useToast();
    const dispatch = useDispatch()

    const pickImage = async () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setSelectedImage(imageUri);
                RBSheetRef.current.close()
            }
        });
    };

    // const OpenCamera = async () => {
    //     try {
    //         if (Platform.OS === 'android') {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.CAMERA,
    //                 {
    //                     title: 'Camera Permission',
    //                     message: 'App needs camera permission',
    //                 },
    //             );

    //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                 launchCamera({ mediaType: 'photo' }, (response) => {
    //                     if (response.didCancel) {
    //                         console.log('User cancelled camera');
    //                     } else if (response.error) {
    //                         console.log('Camera error: ', response.error);
    //                     } else {
    //                         let imageUri = response.uri || response.assets?.[0]?.uri;
    //                         setSelectedImage(imageUri);
    //                         RBSheetRef.current.close()
    //                     }
    //                 });
    //             } else {
    //                 console.log('Camera permission denied');
    //             }
    //         }
    //     } catch (err) {
    //         console.warn('Error requesting camera permission:', err);
    //     }
    // };


    const requestCameraPermissionAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera permission',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };
    
    // Request camera permission on iOS
    const requestCameraPermissionIOS = async () => {
        try {
            const result = await request(PERMISSIONS.IOS.CAMERA);
            console.log('Camera permission result for iOS:', result);
            return result === RESULTS.GRANTED;
        } catch (err) {
            console.error('Error requesting camera permission for iOS:', err);
            return false;
        }
    };
    
    // Main function to open camera
    const OpenCamera = async () => {
        try {
            let hasPermission = true;
    
            // if (Platform.OS === 'android') {
            //     hasPermission = await requestCameraPermissionAndroid();
            // } else if (Platform.OS === 'ios') {
            //     hasPermission = await requestCameraPermissionIOS();
            // }
    
            console.log('Camera permission:', hasPermission);
    
            // if (!hasPermission) {
            //     Alert.alert('Camera Permission', 'Camera permission denied');
            //     return;
            // }
            setTimeout(() => {
                launchCamera({ mediaType: 'photo' }, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled camera');
                    } else if (response.error) {
                        console.log('Camera error: ', response.error);
                    } else {
                        let imageUri = response.uri || response.assets?.[0]?.uri;
                        console.log('imaeuri',imageUri)
                        setSelectedImage(imageUri);
                        if (RBSheetRef && RBSheetRef.current) {
                            RBSheetRef.current.close();
                        }
                    }
                });
            });
    
            
        } catch (err) {
            console.warn('Error requesting camera permission:', err);
        }
    };
    
    const uploadImage = async () => {
        if (!selectedImage) return null;
        setLoader(true);

        const formData = new FormData();
        formData.append('image', {
            uri: selectedImage,
            type: 'image/jpeg', // or 'image/png'
            name: 'profile.jpg'
        });

        try {
            const res = await config.post('/image-upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res && res.data) {
                console.log(res.data, 'res.datares.data')
                setLoader(false);
                return res.data.data?.image_url;
            }
        } catch (err) {
            setLoader(false);
            console.error('Image upload error:', err);
            return null;
        }
    };

    const postProfileData = async (data) => {
        console.log(data, 'data res')
        setLoader(true);
        try {
            const res = await config.post('/user-updates', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res && res.data) {
                console.log("Profile updated successfully: ", res.data);

                toast.show(res.data?.message, {
                    type: "success",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
                dispatch(addToken(token, res.data.user)).then(() => {
                    dispatch(loadToken())
                })

                setLoader(false);
            }
        } catch (err) {
            setLoader(false);
            if (err.response) {
                console.error('Response data:', err.response?.data);
                console.error('Response status:', err.response.status);
                console.error('Response headers:', err.response.headers);
            } else if (err.request) {
                console.error('Request data:', err.request);
            } else {
                console.error('Error message:', err.message);
            }
        }
    };

    const handleSubmitProfile = async (values) => {
        const imageUri = await uploadImage();
        const profileData = {
            ...values,
            id: user?.id
        };
        if (imageUri) {
            profileData['user_img'] = imageUri
        }
        await postProfileData(profileData);
    };

    const ProfileValidationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        name: Yup.string().required('Required'),
        contact_no: Yup.number().required('Required'),
        address: Yup.string().required('Required'),
    });

    useEffect(() => {
        console.log(user, 'user');
    }, []);

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
                    <MainHeader navigation={navigation} backButton={true} logo={false} heading={'Profile'} />
                </View>
                <View style={{ marginTop: moderateScale(20, 0.1), paddingHorizontal: moderateScale(30, 0.1) }}>
                    <View style={styles.ProfilePicture}>
                        <View style={{
                            borderRadius: moderateScale(100, 0.1),
                            overflow: 'hidden'
                        }}>
                            <Image source={selectedImage ? { uri: selectedImage } : { uri : user?.user_img }} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <TouchableOpacity style={styles.CameraIcon} onPress={() => RBSheetRef.current.open()}>
                            <View style={styles.IrisCameraIcon}>
                                <Icon3 name="camera" size={30} color={'#E52C2C'} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Formik
                        initialValues={{ name: user?.name || '', email: user?.email || '', contact_no: user?.contact_no || '', address: user?.address || '' }}
                        onSubmit={handleSubmitProfile}
                        validationSchema={ProfileValidationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
                                <Input
                                    placeholder='John Doe'
                                    style={styles.InputStyle}
                                    inputContainerStyle={styles.inputContainer}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                                {errors.name && touched.name ? (
                                    <View style={styles.errorContainer}>
                                        <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                        <Text style={styles.errorText}>{errors.name}</Text>
                                    </View>
                                ) : null}
                                <Input
                                    placeholder='john@yahoo.com'
                                    style={styles.InputStyle}
                                    inputContainerStyle={styles.inputContainer}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                {errors.email && touched.email ? (
                                    <View style={styles.errorContainer}>
                                        <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    </View>
                                ) : null}
                                <Input
                                    placeholder='Contact No'
                                    style={styles.InputStyle}
                                    inputContainerStyle={styles.inputContainer}
                                    value={values.contact_no}
                                    onChangeText={handleChange('contact_no')}
                                    onBlur={handleBlur('contact_no')}
                                />
                                {errors.contact_no && touched.contact_no ? (
                                    <View style={styles.errorContainer}>
                                        <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                        <Text style={styles.errorText}>{errors.contact_no}</Text>
                                    </View>
                                ) : null}
                                <Input
                                    placeholder='Address'
                                    style={styles.InputStyle}
                                    inputContainerStyle={styles.inputContainer}
                                    value={values.address}
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                />
                                {errors.address && touched.address ? (
                                    <View style={styles.errorContainer}>
                                        <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                        <Text style={styles.errorText}>{errors.address}</Text>
                                    </View>
                                ) : null}
                                <View style={{ marginTop: moderateScale(30, 0.1), alignItems: 'center' }}>
                                    <RoundButton
                                        label={'Update'}
                                        loading={false}
                                        disabled={false}
                                        onPress={handleSubmit}
                                    />
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
                <RBSheet
                    ref={RBSheetRef}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        draggableIcon: {
                            backgroundColor: "#003e6b"
                        }
                    }}
                    height={moderateScale(200, 0.1)}
                >
                    <View style={{ paddingHorizontal: moderateScale(20, 0.1) }}>
                        <View style={{ alignItems: 'center' }}>
                            {/* <CameraIcons name='camera' size={60} color={'#E52C2C'} /> */}
                        </View>
                        <TouchableOpacity onPress={OpenCamera}>
                            <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom:moderateScale(5,0.1),alignSelf:'center' ,marginRight:moderateScale(65,0.1),marginTop:moderateScale(15,0.1)}}>
                                <View style={{marginRight:moderateScale(0,0.1)}}>
                                <FontAwesome name='camera' size={30} color={'#0082C6'}/>
                                </View>
                                <Text style={{ fontSize: moderateScale(14, 0.1), marginLeft: moderateScale(20, 0.1),color:'black' ,fontFamily:'Poppins-Regular'}}>Take Photo</Text>
                            </View>
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: 'black', height: 1, marginVertical: moderateScale(20, 0.1) ,marginHorizontal:moderateScale(25,0.1)}} />
                        <TouchableOpacity onPress={pickImage}>
                            <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:moderateScale(5,0.1),alignSelf:'center'}}>
                                <FontAwesome name='photo' size={30} color={'#0082C6'}/>
                                <Text style={{ fontSize: moderateScale(14, 0.1), marginLeft: moderateScale(20, 0.1),color:'black' ,fontFamily:'Poppins-Regular'}}>Choose from Library</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    DescriptionStyle: {
        borderRadius: moderateScale(10, 0.1),
        backgroundColor: "#F3F3F3",
        paddingLeft: moderateScale(10, 0.1),
        fontSize: moderateScale(10, 0.1),
        fontFamily: 'Poppins-Medium',
        paddingBottom: moderateScale(30, 0.1),
        marginLeft: moderateScale(6, 0.1),
        marginRight: moderateScale(5, 0.1),
    },
    inputContainer: {
        borderBottomWidth: 0,
        // marginTop: moderateScale(25, 0.1)
    },
    textContainer: {
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
        maxHeight: '80%',
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
        height: moderateScale(46, 0.1),
        width: moderateScale(316, 0.1),
        paddingLeft: moderateScale(20, 0.1),
    },
    ProfilePicture: {
        backgroundColor: '#D9D9D9',
        marginLeft: moderateScale(120, 0.1),
        marginRight: moderateScale(100, 0.1),
        borderRadius: moderateScale(100, 0.1),
        alignSelf: 'center',
        height: moderateScale(100, 0.1),
        width: moderateScale(100, 0.1),
        marginBottom: moderateScale(30, 0.1),

    },
    CameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    CameraView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: moderateScale(200, 0.1),
        borderRadius: moderateScale(100, 0.1),
        marginTop: moderateScale(10, 0.1),
        marginBottom: moderateScale(10, 0.1)
    },
    galleryView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: moderateScale(200, 0.1),
        marginTop: moderateScale(10, 0.1),
        marginBottom: moderateScale(10, 0.1)
    },
    Divider: {
        height: 1,
        width: '80%',
        marginVertical: 10,
        backgroundColor: 'red',
    },
    CameraBottomText: {
        marginTop: moderateScale(15, 0.1),
        fontSize: 16,
        fontFamily: 'Poppins-Light',
        marginLeft: moderateScale(20, 0.1),
        color: '#646464'
    },
    galleryBottomText: {
        marginTop: moderateScale(10, 0.1),
        fontSize: 16,
        fontFamily: 'Poppins-Light',
        marginLeft: moderateScale(20, 0.1),
        color: '#646464'
    },
    IrisCameraIcon: {
        backgroundColor: 'white',
        width: moderateScale(30, 0.1),
        borderRadius: moderateScale(100, 0.1),
        justifyContent: 'center',
        alignItems: 'center',
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
});
