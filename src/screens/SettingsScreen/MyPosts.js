
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import MainHeader from '../../components/MainHeader';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../Providers/axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import RBSheet from 'react-native-raw-bottom-sheet';
import { useToast } from 'react-native-toast-notifications';

const MyPostScreen = ({ navigation }) => {
    const [Items, setItems] = useState([]);
    const [selectedPet, setselectedPet] = useState(null);
    const [loader, setLoader] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const RBSheetRef = useRef();
    const toast = useToast();


    const getData = async () => {
        setLoader(true);

        try {
            const res = await config.get('/get-mypost', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API Response:', res.data);

            if (res && res.data) {
                setItems(res.data?.data)
                setLoader(false);
            }
        } catch (err) {
            setLoader(false);
            if (err.response) {
                console.error('API Response Error:', err.response.data);
                console.error('Status:', err.response.status);
                console.error('Headers:', err.response.headers);
            } else if (err.request) {
                console.error('No response received:', err.request);
            } else {
                console.error('Error:', err.message);
            }
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const NewsfeedCard = ({ item }) => {
        const imageUrl = item?.images?.[0]?.image_url || 'default_image_url'; // Provide a default image URL if none exists

        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('InnerScreen', { id: item.id })}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <TouchableOpacity
                        style={styles.penIcon}
                        // onPress={() => navigation.navigate('PostForm', { postData: item })}
                        onPress={() => {
                            RBSheetRef.current.open();
                            setselectedPet(item)
                        }}
                    >
                        <MaterialCommunityIcons name="dots-vertical" size={18} color="red" />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        {/* <Text style={styles.cardSubtitle}>Age: 02 Months</Text> */}
                    </View>
                    <Text numberOfLines={1} style={styles.cardDescription}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const editPost = () => {
        RBSheetRef.current.close();
        navigation.navigate('PostForm', { postData: selectedPet })
    }

    const deletePost = async () => {
        setLoader(true);
        try {
            const res = await config.post('/delete-post/'+selectedPet?.id, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data)
            if (res && res.data) {
                RBSheetRef.current.close();
                toast.show(res.data?.message, {
                    type: "success",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
                
                getData();
                // setLoader(false);
            }
        } catch (err) {
            setLoader(false);
            toast.show(err.response.data?.message, {
                type: "danger",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
            });
            console.error('API Error:', err.message);
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {loader && (
                <View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1, backgroundColor: '#0000009c', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )}
            <View style={styles.container}>
                <MainHeader navigation={navigation} backButton={true} logo={false} heading={'My Posts'} />

                <KeyboardAwareScrollView>
                    <View style={styles.cardListContainer}>
                        {Items.map((item) => (
                            <NewsfeedCard key={item.id} item={item} />
                        ))}
                    </View>
                </KeyboardAwareScrollView>

                <RBSheet
                    ref={RBSheetRef}
                    height={150}
                    openDuration={200}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            borderRadius: moderateScale(10, 0.1)
                        }
                    }}
                // onClose={() => setSheet(false)}
                >
                    <View style={{ padding: 10 }}>
                        <TouchableOpacity style={{ alignItems: 'center', padding: 10 }} onPress={() => editPost()}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: 'Poppins-Bold' }}>Edit</Text>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'red', height: 1, width: '70%', marginLeft: '15%' }}></View>
                        <TouchableOpacity style={{ alignItems: 'center', padding: 10 }} onPress={() => deletePost()}>
                            <Text style={{ color: "#000", fontSize: 18, fontFamily: 'Poppins-Bold' }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            </View>
        </SafeAreaView>
    );
};

export default MyPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    cardListContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(30, 0.1),
        paddingVertical: moderateScale(5, 0.1),
        flexWrap: 'wrap',
        marginTop: moderateScale(30, 0.1)
    },
    card: {
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
        overflow: 'hidden',
        width: '31%',
        marginBottom: 15,
    },
    imageContainer: {
        height: moderateScale(105, 0.1),
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        color: '#F15858',
        fontFamily: 'Poppins-Bold',
        fontSize: moderateScale(10, 0.1),
    },
    cardSubtitle: {
        color: '#F15858',
        fontFamily: 'Poppins-Regular',
        fontSize: moderateScale(6, 0.1),
    },
    cardDescription: {
        color: '#969696',
        fontFamily: 'Poppins-Regular',
        fontSize: moderateScale(8, 0.1),
    },
    penIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#fff',
        padding: 2,
        borderRadius: 100,
    },
});

