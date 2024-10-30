import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import { moderateScale } from 'react-native-size-matters';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
import RoundButton from '../components/RoundButton';
import MainHeader from '../components/MainHeader';
import config from '../Providers/axios';
import { useToast } from "react-native-toast-notifications";
import RNFetchBlob from 'rn-fetch-blob';
import { useSelector, useDispatch } from 'react-redux';

const UploadPicture = ({ navigation, route }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [oldImages, setOldImages] = useState([]) 

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 0,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const images = response.assets.map(asset => asset.uri);
        setSelectedImages(prevImages => {
          const updatedImages = [...prevImages, ...images];
          console.log('Updated images array: ', updatedImages);
          return updatedImages;
        });
      }
    });
  };

  const removeImage = (index) => {
    setSelectedImages(prevImages => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      console.log('Images after removal: ', updatedImages);
      return updatedImages;
    });
  };

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setSelectedFile(res.uri);
      console.log('Selected file: ', res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker Error: ', err);
      }
    }
  };

  useEffect(() => {
    console.log(route?.params?.data, 'kjhjkhkjhkj');
    if(route?.params?.data){
      setOldImages(route?.params?.data?.images)
    }

    return () => {
      setOldImages([])
    }
  }, [route]);
  

  const submit = async () => {
    const data = route.params.data;
    data.images = selectedImages;
    setLoader(true);
    const formData = new FormData();

    // Convert the entire data object into FormData
    for (const key in data) {
      if (Array.isArray(data[key])) {
        // Handle images separately
        await Promise.all(data[key].map(async (item, index) => {
          const imageBinary = await RNFetchBlob.fs.readFile(item, 'base64');
          formData.append(`${key}[${index}]`, {
            uri: item,
            type: 'image/jpeg',
            name: `image${index}.jpg`,
            data: imageBinary
          });
        }));
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };
      const res = await config.post('/create-post', formData, { headers });
      if (res && res.data) {
        console.log("Response: ", res);
        setLoader(false);
        toast.show("Post Created Successfully", {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        navigation.navigate('BottomTabs', { screen: 'Home' });
      }

      
    } catch (err) {
      setLoader(false);
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

  const deleteImage = async(id) => {
    setLoader(true);

    try{
      const res = await config.get('/image-delete/'+id);
      if (res && res.data) {
        console.log("Response: ", res);
        setLoader(false);
        
        setOldImages(prevImages => prevImages.filter(image => image.id !== id));

        toast.show(res.data?.message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
      }
    }catch (err) {
      setLoader(false);
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#C3F4FF' }}>
      {loader && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
      <LinearGradient
        colors={['rgba(195, 244, 255, 0)', '#C3F4FF']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.mainView}
      >
        <View>
          <MainHeader navigation={navigation} backButton={true} logo={true} heading={''} />
          <View style={styles.header}>
            <Text style={styles.headerText}>Upload Picture</Text>
          </View>
          <View style={styles.uploadContainer}>
            <TouchableOpacity style={styles.uploadIcon} onPress={pickImage}>
              <EntypoIcon name="upload-to-cloud" size={50} color={'#0D8CCD'} />
              <Text style={styles.uploadText}>Upload Image</Text>
            </TouchableOpacity>
          </View>

          {oldImages?.length > 0 && (
            <>
              <View style={styles.header}>
                <Text style={styles.headerText}>Old Pictures</Text>
              </View>
              <View style={styles.previewContainer}>
                {oldImages.map((imageUri, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri: imageUri?.image_url }} style={styles.previewImage} />
                    <TouchableOpacity style={styles.removeIcon} onPress={() => deleteImage(imageUri?.id)}>
                      <EntypoIcon name="cross" size={25} color={'#ff0000'} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </>
          )}

          {
            oldImages?.length > 0 && selectedImages?.length > 0 ? (
              <>
                <View style={styles.header}>
                  <Text style={styles.headerText}>New Pictures</Text>
                </View>
              </>
            ) : null
          }

          <View style={styles.previewContainer}>
            {selectedImages.map((imageUri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
                <TouchableOpacity style={styles.removeIcon} onPress={() => removeImage(index)}>
                  <EntypoIcon name="cross" size={25} color={'#ff0000'} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.submitButtonContainer}>
            <RoundButton label={"Save"} onPress={submit} />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default UploadPicture;

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  loader: {
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
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(25, 0.1),
  },
  headerText: {
    color: '#0D8CCD',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(16, 0.1),
  },
  uploadContainer: {
    borderStyle: 'dotted',
    borderWidth: 1,
    height: moderateScale(180, 0.1),
    alignContent: 'center',
    margin: moderateScale(50, 0.1),
    borderRadius: moderateScale(15, 0.1),
    backgroundColor: '#faf0f6',
    alignItems:'center',
    justifyContent:'center'
  },
  uploadIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: moderateScale(10, 0.1),
  },
  uploadText: {
    paddingTop: moderateScale(5, 0.1),
    paddingBottom: moderateScale(15, 0.1),
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: moderateScale(10, 0.1),
  },
  imageWrapper: {
    position: 'relative',
    margin: moderateScale(5, 0.1),
  },
  previewImage: {
    width: moderateScale(80, 0.1),
    height: moderateScale(80, 0.1),
    borderRadius: moderateScale(10, 0.1),
  },
  removeIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: moderateScale(15, 0.1),
    padding: moderateScale(0, 0.1),
  },
  submitButtonContainer: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop:30
  },
});
