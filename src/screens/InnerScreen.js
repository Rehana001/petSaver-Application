import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';
import ImageView from "react-native-image-viewing";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import config from '../Providers/axios';
import MainHeader from '../components/MainHeader';
import { moderateScale } from 'react-native-size-matters';

const InnerScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const token = useSelector((state) => state.auth.token);
  const [postData, setPostData] = useState({});
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);

  const getData = async () => {
    console.log(id)
    setLoader(true);
    try {
      const res = await config.get(`/getPost/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res && res.data) {
        console.log(res.data.post, 'res.data.post')
        setPostData(res.data.post);
        setImages(res.data.post.images.map((img) => ({ uri: img.image_url })));
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      console.error('API Error:', err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const previewImg = (index) => {
    setVisibleIndex(index);
    setIsVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#C3F4FF' }}>
      {loader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
      <KeyboardAwareScrollView>
        <LinearGradient
          colors={['rgba(195, 244, 255, 0)', '#C3F4FF']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.mainView}
        >
          <MainHeader navigation={navigation} backButton={true} logo={true} heading={''} />
          <View style={{ paddingHorizontal: moderateScale(30, 0.1), marginBottom: moderateScale(35, 0.1) }}>
            <View style={styles.InfoHeading}>
              <Text style={styles.PetInfoTextStyle}>Pet Info</Text>
            </View>

            <Card style={styles.MainCardStyle}>
              <Card.Content>
                <View style={styles.InnerCardView}>
                  <Text variant="titleLarge" style={styles.CardText1}>Breed :</Text>
                  <Text variant="bodyMedium" style={styles.CardText2}>{postData.breed_obj?.label}</Text>
                </View>
                <View style={styles.InnerCardView}>
                  <Text variant="titleLarge" style={styles.CardText1}>Type :</Text>
                  <Text variant="bodyMedium" style={styles.CardText2}>{postData.type_obj?.label}</Text>
                </View>
                <View style={styles.InnerCardView}>
                  <Text variant="titleLarge" style={styles.CardText1}>Color :</Text>
                  <Text variant="bodyMedium" style={styles.CardText2}>{postData.color_obj?.label}</Text>
                </View>
                <View style={styles.InnerCardView}>
                  <Text variant="titleLarge" style={styles.CardText1}>Collar No./Pet Name :</Text>
                  <Text variant="bodyMedium" style={styles.CardText2}>{postData.collar_no}</Text>
                </View>
                <View style={styles.InnerCardView}>
                  <Text variant="titleLarge" style={styles.CardText1}>Location :</Text>
                  <Text variant="bodyMedium" style={styles.CardText2}>{postData.location}</Text>
                </View>
                <View style={styles.InnerCardView}>
                  <Text variant="titleLarge" style={styles.CardText1}>Description :</Text>
                  <Text variant="bodyMedium" style={styles.CardText2}>{postData.description}</Text>
                </View>
              </Card.Content>
            </Card>

            <View style={styles.InfoHeading}>
              <Text style={styles.UserInfoTextStyle}>User Info</Text>
            </View>
            <Card style={styles.MainCardStyle}>
              <Card.Content>
                <View style={styles.InnerCardView}>
                  <Text variant="titleLarge" style={styles.CardText1}>Name :</Text>
                  <Text variant="bodyMedium" style={styles.CardText2}>{postData.name}</Text>
                </View>
                <View style={styles.InnerCardView}>
                  <Text variant="titleLarge" style={styles.CardText1}>Phone: </Text>
                  <Text variant="bodyMedium" style={styles.CardText2}>{postData.contact_no}</Text>
                </View>
                <View style={styles.InnerCardView}>
                  <Text variant="titleLarge" style={styles.CardText1}>Email : </Text>
                  <Text variant="bodyMedium" style={styles.CardText2}>{postData.email}</Text>
                </View>
              </Card.Content>
            </Card>

            <View style={styles.InfoHeading}>
              <Text style={styles.UserInfoTextStyle}>Images/Videos</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {images?.map((image, index) => (
                <TouchableOpacity key={index} style={styles.Image1} onPress={() => previewImg(index)}>
                  <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </LinearGradient>
        <ImageView
          images={images}
          imageIndex={visibleIndex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default InnerScreen;

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  InfoHeading: {
    marginBottom: moderateScale(5, 0.1),
    marginTop: moderateScale(15, 0.1),
  },
  PetInfoTextStyle: {
    fontFamily: 'Poppins-Bold',
    color: '#0082C6',
    fontSize: moderateScale(14, 0.1),
  },
  UserInfoTextStyle: {
    fontFamily: 'Poppins-Bold',
    color: '#0082C6',
    fontSize: moderateScale(14, 0.1),
  },
  CardText1: {
    color: '#E52C2C',
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(15, 0.1),
  },
  CardText2: {
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(15, 0.1),
    marginLeft: moderateScale(15, 0.1),
    marginRight: moderateScale(50, 0.1),
    // backgroundColor:'#000',
    maxWidth:moderateScale(200, 0.1)
  },
  MainCardStyle: {
    backgroundColor: '#FFFFFF',
  },
  InnerCardView: {
    flexDirection: 'row',
    padding: moderateScale(2, 0.1),
  },
  Image1: {
    width: '48%',
    height: moderateScale(90, 0.1),
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#0000009c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

