
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Input } from 'react-native-elements';
import RoundButton from '../../components/RoundButton';
import MainHeader from '../../components/MainHeader';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import config from '../../Providers/axios';
import { ToastProvider } from 'react-native-toast-notifications'
import { useToast } from "react-native-toast-notifications";

const HelpandSupport = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [description, setDescription] = useState('');
  const [settings, setSettings] = useState(null);
  const token = useSelector((state) => state.auth.token);
  // const user = useSelector((state) => state.auth.user);
  const toast = useToast();

  const handleBack = () => {
    navigation.navigate('Settings');
    console.log('Go back');
  };

  const PostHelp = async () => {
    setLoader(true);
    const data = { description };
    console.log(data);
    try {
      const res = await config.post('/create-help', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, 'res.data');
      if (res && res.data) {
        setLoader(false)
        toast.show(res.data?.message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
      });
        
        setDescription(res.data);
        console.log('data', res.data);
      }
    } catch (err) {
      toast.show(err.data?.message, {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
    });
      setLoader(false);
      console.error('API Error:', err.message);
    }
  };


  const getSettingsData = async () => {
    setLoader(true);

    try {
        const res = await config.get('/get-setting', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('API Response:', res.data);

        if (res && res.data) {
          console.log('data',res.data?.setting)
          setSettings(res.data?.setting)
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
  getSettingsData()
}, [])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loader && (
        <View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1, backgroundColor: '#0000009c', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
      <MainHeader navigation={navigation} backButton={true} logo={false} heading={'Help & Support'} />
      <View>
        <Input
          placeholder='Type your query here...'
          placeholderTextColor={'grey'}
          multiline={true}
          style={styles.DescriptionStyle}
          underlineColorAndroid='transparent'
          inputContainerStyle={styles.inputContainer}
          value={description}
          onChangeText={setDescription}
        />
        <View style={{ alignContent: 'center', alignItems: 'center', marginTop: moderateScale(10, 0.1) }}>
          <RoundButton label={"Send"} onPress={PostHelp} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>or contact us on direct email</Text>
          {settings && (
            <Text style={styles.text2}> {settings?.email}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HelpandSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  DescriptionStyle: {
    borderRadius: moderateScale(10, 0.1),
    backgroundColor: "lightgrey",
    paddingLeft: moderateScale(10, 0.1),
    fontSize: moderateScale(10, 0.1),
    paddingBottom: moderateScale(80, 0.1),
    fontFamily: 'Poppins-Medium',
    marginLeft: moderateScale(6, 0, 1),
    marginRight: moderateScale(5, 0, 1),
  },
  inputContainer: {
    borderBottomWidth: 0,
    marginTop: moderateScale(25, 0.1),
  },
  textContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: moderateScale(20, 0.1),
  },
  text1: {
    color: '#434343',
    fontSize: moderateScale(12, 0.1),
    fontFamily: 'Poppins-Medium',
  },
  text2: {
    color: '#FF1313',
    fontSize: moderateScale(12, 0.1),
    fontFamily: 'Poppins-Medium',
  },
});
