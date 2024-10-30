
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, Button } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Input } from 'react-native-elements'
import RoundButton from '../components/RoundButton'
import MainHeader from '../components/MainHeader'
import { moderateScale } from 'react-native-size-matters'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/Ionicons'
import UploadPicture from './UploadPicture'
import config from '../Providers/axios'
import { useToast } from "react-native-toast-notifications";
import GooglePlaces from '../components/GooglePlaces'
import { useSelector } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select';
import RBSheet from 'react-native-raw-bottom-sheet';


const PostForm = ({ navigation, route }) => {

    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [location, setLocation] = useState(null)
    const [submit, setSubmit] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [type, setType] = useState([])
    const [colors, setColors] = useState([])
    const [breeds, setBreeds] = useState([])

    const [colorGet, setColorGet] = useState(null)
    const [typeGet, setTypeGet] = useState(null)
    const [breedGet, setBreedGet] = useState(null)
    const [petStatus, setpetStatus] = useState(null)
    const [sheetType, setsheetType] = useState(null)

    const toast = useToast();
    const ref = useRef()
    const user = useSelector((state) => state.auth.user)
    const [loader, setloader] = useState(false)
    const [initialVals, setInitialVals] = useState({
        name: '',
        email: '',
        contact_no: '',
        collar_no: '',
        location: '',
        description: '',
        breed: '',
        type: '',
        color: ''
    });



    const PostForm = async (data) => {
        // setloader(true)
        data['lat'] = lat
        data['lng'] = long
        data['location'] = location
        data['user_id'] = user?.id
        data['color'] = colorGet?.id
        data['type'] = typeGet?.id
        data['breed'] = breedGet?.id
        data['pet_status'] = petStatus

        if (route?.params?.postData) {
            data['images'] = route?.params?.postData?.images
            data['id'] = route?.params?.postData?.id
        }
        console.log(data)
        if (
            location != "" && location != null && 
            colorGet?.id && typeGet?.id && breedGet?.id &&
            petStatus != "" && petStatus != null
        ) {
            navigation.navigate('UploadPicture', { data: data })
        }

    };

    const refRBSheet = useRef();


    const getData = async () => {
        setloader(true);
        try {
            const res = await config.get('/get-pet-details', {
            });
            if (res && res.data) {
                console.log('Response Data', res.data)
                setBreeds(res.data?.breeds)
                setColors(res.data?.colors)
                setType(res.data?.types)
                setloader(false);
            }
        } catch (err) {
            setloader(false);
            console.error('API Error:', err.message);
        }
    };

    useEffect(() => {
        getData()

        console.log('Post Data: ', route?.params)
        if (route?.params?.postData) {
            setColorGet(route?.params?.postData?.color_obj)
            setTypeGet(route?.params?.postData?.type_obj)
            setBreedGet(route?.params?.postData?.breed_obj)
            setLat(route?.params?.postData?.lat)
            setLong(route?.params?.postData?.lng)
            setLocation(route?.params?.postData?.location)
            setpetStatus(route?.params?.postData?.pet_status)

            setInitialVals({
                name: route?.params?.postData?.name,
                email: route?.params?.postData?.email,
                contact_no: route?.params?.postData?.contact_no,
                collar_no: route?.params?.postData?.collar_no,
                location: route?.params?.postData?.location,
                description: route?.params?.postData?.description,
                breed: route?.params?.postData?.breed,
                type: route?.params?.postData?.type,
                color: route?.params?.postData?.color,
            });
            setShowForm(true)
        } else {
            setShowForm(true)
        }
    }, [route])

    useEffect(() => {
        console.log(initialVals, 'initialVals')
    }, [initialVals])

    const PostFormSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        contact_no: Yup.number().required('Required'),
        collar_no: Yup.number().required('Required'),
        description: Yup.string().required('Required'),
        // breed: Yup.string().required('Required'),
        // type: Yup.string().required('Required'),
        // color: Yup.string().required('Required'),
    });

    const openSheet = (v) => {
        setsheetType(v)
        refRBSheet.current.open()
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#C3F4FF' }}>
            {
                loader && <>
                    <View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1, backgroundColor: '#0000009c', alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="red" />
                    </View>
                </>
            }

            <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
                <LinearGradient
                    colors={['rgba(195, 244, 255, 0)', '#C3F4FF']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.mainView}
                >

                    <View>
                        <MainHeader navigation={navigation} backButton={true} logo={true} heading={''} />
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Text style={{ color: '#0D8CCD', textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: moderateScale(16, 0.1) }}>Post</Text> */}
                            <View style={{ flexDirection: 'row', marginTop: moderateScale(20, 0.1) }}>
                                <Text style={{ color: '#FF1313', fontFamily: 'Poppins-Regular', fontSize: 16 }}>Fill this form to </Text>
                                <View>
                                    <Text style={{ color: '#0E92CA', fontFamily: 'Poppins-Bold', fontSize: 16 }}>Post</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: moderateScale(-10, 0.1) }}>
                                <Text style={{ color: '#0E92CA', fontFamily: 'Poppins-Bold', fontSize: 16 }}>on community</Text>
                            </View>
                        </View>

                        {
                            showForm && <Formik
                                initialValues={initialVals}
                                onSubmit={values => PostForm(values)}
                                validationSchema={PostFormSchema}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <View style={{ marginTop: moderateScale(20, 0.1), paddingLeft: moderateScale(10, 0.1) }}>
                                        <Input
                                            placeholder='Name'
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

                                        <View style={{ position: 'relative', flex: 1 }}>
                                            <GooglePlaces setLat={setLat} setLong={setLong} setLocation={setLocation} location={location} color={"white"} />
                                        </View>
                                        {(location == "" || location == null) && submit ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>Required</Text>
                                            </View>
                                        ) : null}

                                        <TouchableOpacity
                                            style={{ ...styles.InputStyle, ...styles.inputContainer, marginLeft: moderateScale(10, 0.1), justifyContent: 'center', paddingLeft: moderateScale(15, 0.1), marginBottom: moderateScale(25, 0.1) }}
                                            onPress={() => openSheet('color')}
                                        >

                                            <Text style={{color: colorGet == "" || colorGet == null ? 'grey' : '#000'}}> {colorGet == "" || colorGet == null ? 'Select the Color' : colorGet?.label}</Text>

                                        </TouchableOpacity>
                                        {(colorGet == "" || colorGet == null) && submit ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>Required</Text>
                                            </View>
                                        ) : null}



                                        <TouchableOpacity
                                            style={{ ...styles.InputStyle, ...styles.inputContainer, marginLeft: moderateScale(10, 0.1), justifyContent: 'center', paddingLeft: moderateScale(15, 0.1), marginBottom: moderateScale(25, 0.1) }}
                                            onPress={() => openSheet('breed')}
                                        >
                                            <Text style={{color: breedGet == "" || breedGet == null ? 'grey' : '#000'}}>
                                                {breedGet == "" || breedGet == null ? 'Select the Breed' : breedGet?.label}
                                            </Text>

                                        </TouchableOpacity>
                                        {(breedGet == "" || breedGet == null) && submit ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>Required</Text>
                                            </View>
                                        ) : null}



                                        <TouchableOpacity
                                            style={{ ...styles.InputStyle, ...styles.inputContainer, marginLeft: moderateScale(10, 0.1), justifyContent: 'center', paddingLeft: moderateScale(15, 0.1), marginBottom: moderateScale(25, 0.1) }}
                                            onPress={() => openSheet('type')}
                                        >
                                            <Text style={{color:typeGet == "" || typeGet == null ? 'grey' : '#000'}}> 
                                            {typeGet == "" || typeGet == null ? 'Select the Type' : typeGet?.label}
                                            </Text>

                                        </TouchableOpacity>
                                        {(typeGet == "" || typeGet == null) && submit ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>Required</Text>
                                            </View>
                                        ) : null}


                                        <TouchableOpacity
                                            style={{ ...styles.InputStyle, ...styles.inputContainer, marginLeft: moderateScale(10, 0.1), justifyContent: 'center', paddingLeft: moderateScale(15, 0.1), marginBottom: moderateScale(25, 0.1) }}
                                            onPress={() => openSheet('status')}
                                        >
                                            <Text style={{color:petStatus == "" || petStatus == null ? 'grey' : '#000'}}>
                                                {petStatus == "" || petStatus == null ? 'Select the Status' : petStatus}
                                            </Text>

                                        </TouchableOpacity>
                                        {(petStatus == "" || petStatus == null) && submit ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>Required</Text>
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
                                        <Input
                                            placeholder='Contact No'
                                            keyboardType='numeric'
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
                                        ) : null}
                                        <Input
                                            placeholder='Collar No.'
                                            keyboardType='numeric'
                                            style={styles.InputStyle}
                                            inputContainerStyle={styles.inputContainer}
                                            onChangeText={handleChange('collar_no')}
                                            onBlur={handleBlur('collar_no')}
                                            value={values.collar_no}
                                        />
                                        {errors.collar_no && touched.collar_no ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>{errors.collar_no}</Text>
                                            </View>
                                        ) : null}


                                        <Input
                                            placeholder='Description'
                                            style={styles.DescriptionStyle}
                                            inputContainerStyle={styles.inputContainer}
                                            onChangeText={handleChange('description')}
                                            onBlur={handleBlur('description')}
                                            value={values.description}
                                        />
                                        {errors.description && touched.description ? (
                                            <View style={styles.errorContainer}>
                                                <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                                                <Text style={styles.errorPassword}>{errors.description}</Text>
                                            </View>
                                        ) : null}
                                        <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                            <RoundButton label={"Next"} onPress={() => { handleSubmit(); setSubmit(true) }} />
                                        </View>

                                    </View>
                                )}
                            </Formik>
                        }


                    </View>

                </LinearGradient>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: '#0000009e',
                        },
                        draggableIcon: {
                            backgroundColor: '#E6E6E6',
                        },
                        container: {
                            backgroundColor: '#fff',
                            borderTopEndRadius: 20,
                            borderTopStartRadius: 20,
                        },
                    }}>
                    <ScrollView>
                        <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 20 }}>
                            {
                                sheetType == 'color' ? (
                                    <>
                                        {colors.map((color, index) => (

                                            <><TouchableOpacity key={index} onPress={() => { setColorGet(color); refRBSheet.current.close() }}>
                                                <Text style={{ paddingVertical: 15, fontSize: moderateScale(18, 0.1), color: 'black', textAlign: 'center' }}>{color.label}</Text>
                                            </TouchableOpacity>
                                                <View style={{ height: 1, width: '70%', marginLeft: '15%', backgroundColor: 'red' }}>

                                                </View>
                                            </>
                                        ))}
                                    </>
                                ) : sheetType == 'type' ? (
                                    <>
                                        {type.map((color, index) => (
                                            <>
                                                <TouchableOpacity key={index} onPress={() => { setTypeGet(color); refRBSheet.current.close() }}>
                                                    <Text style={{ paddingVertical: 15, fontSize: moderateScale(18, 0.1), color: 'black', textAlign: 'center' }}>{color.label}</Text>
                                                </TouchableOpacity>
                                                <View style={{ height: 1, width: '70%', marginLeft: '15%', backgroundColor: 'red' }}>

                                                </View>
                                            </>
                                        ))}
                                    </>
                                ) : sheetType == 'breed' ? (
                                    <>
                                        {breeds.map((color, index) => (
                                            <>
                                                <TouchableOpacity key={index} onPress={() => { setBreedGet(color); refRBSheet.current.close() }}>
                                                    <Text style={{ paddingVertical: 15, fontSize: moderateScale(18, 0.1), color: 'black', textAlign: 'center' }}>{color.label}</Text>
                                                </TouchableOpacity>
                                                <View style={{ height: 1, width: '70%', marginLeft: '15%', backgroundColor: 'red' }}>

                                                </View>
                                            </>
                                        ))}
                                    </>
                                ) : sheetType == 'status' ? (
                                    <>
                                        <TouchableOpacity onPress={() => { setpetStatus('I Found'); refRBSheet.current.close() }}>
                                            <Text style={{ paddingVertical: 15, fontSize: moderateScale(18, 0.1), color: 'black', textAlign: 'center' }}>I Found</Text>
                                        </TouchableOpacity>
                                        <View style={{ height: 1, width: '70%', marginLeft: '15%', backgroundColor: 'red' }}>

                                        </View>

                                        <TouchableOpacity onPress={() => { setpetStatus('Lost'); refRBSheet.current.close() }}>
                                            <Text style={{ paddingVertical: 15, fontSize: moderateScale(18, 0.1), color: 'black', textAlign: 'center' }}>Lost</Text>
                                        </TouchableOpacity>

                                    </>
                                ) : null
                            }
                        </View>
                    </ScrollView>
                </RBSheet>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default PostForm

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 20,

    },
    logoContainer: {
        alignItems: 'center',
    },
    InputStyle: {
        borderRadius: 20,
        backgroundColor: "white",
        fontSize: moderateScale(14, 0.1),
        height: moderateScale(46, 0.1),
        // width: moderateScale(316, 0.1),
        paddingLeft: moderateScale(20, 0.1),
    },
    inputContainer: {
        borderBottomWidth: 0,
        width: moderateScale(width - 40, 0.1),
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
    DescriptionStyle: {
        borderRadius: 10,
        backgroundColor: "white",
        fontSize: moderateScale(14, 0.1),
        height: moderateScale(110, 0.1),
        width: moderateScale(316, 0.1),
        paddingLeft: moderateScale(20, 0.1),
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
    },
    UploadPicText: {
        color: '#FF1313',
        fontFamily: 'Poppins-Bold',
        fontSize: moderateScale(12, 0.1),
        marginRight: moderateScale(10, 0.1)
    },
    UploadPictureStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: moderateScale(0, 0.1),
        marginBottom: moderateScale(30, 0.1)
    },
    InputStyleDropDown: {
        borderRadius: moderateScale(30, 0.1),
        backgroundColor: "white",
        fontSize: moderateScale(14, 0.1),
        height: moderateScale(46, 0.1),
        width: moderateScale(200, 0.1),
        paddingLeft: moderateScale(20, 0.1),
        paddingTop: moderateScale(10, 0.1)
    }
})
