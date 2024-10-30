import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import SettingsHeader from '../../components/SettingsHeader'
import { moderateScale } from 'react-native-size-matters';
import MainHeader from '../../components/MainHeader';
import { useSelector, useDispatch } from 'react-redux'
import config from '../../Providers/axios'

const TermsandConditions = ({ navigation }) => {

  const [loader, setloader] = useState(false)
  const [responseData, setResponseData] = useState(null);

  const token = useSelector((state) => state.auth.token)
  console.log(token)
  const dispatch = useDispatch()

  const handleBack = () => {
    navigation.navigate('Settings')
    console.log('Go back');
  };

  const getData = async () => {
    setloader(true);
  
    try {
      const res = await config.get('/get-use', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API Response:', res.data);
  
      if (res && res.data) {
        setResponseData(res.data);
        setloader(false);
      }
    } catch (err) {
      setloader(false);
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


  return (
    <SafeAreaView style={styles.container}>
      <MainHeader navigation={navigation} backButton={true} logo={false} heading={'Terms and Condition'} />
      <View style={{ padding: moderateScale(5, 0.1),marginTop:moderateScale(40,0.1)}}>
        {responseData?.HowToUse?.description && (
          <Text style={styles.TextStyle}>
            {responseData.HowToUse.description}
          </Text>
        )}
      </View>
      {loader && (
        <View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1, backgroundColor: '#0000009c', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </SafeAreaView>
  )
}

export default TermsandConditions

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TextView: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.1),
    padding: moderateScale(10, 0.1)
  },
  TextStyle: {
    fontSize: moderateScale(12, 0.1),
    fontFamily: 'Poppins-Medium',
    color: '#434343',
    textAlign: 'center',
    paddingLeft: moderateScale(30, 0.1),
    paddingRight: moderateScale(30, 0.1)
  },
  header: {
    alignItems: 'center',
  }

})