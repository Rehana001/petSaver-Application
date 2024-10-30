import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity ,SafeAreaView} from 'react-native'
import React from 'react'
import SettingsHeader from '../components/SettingsHeader'
import { Divider } from 'react-native-elements';
import { moderateScale } from 'react-native-size-matters';
import MainHeader from '../components/MainHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Notifications = ({ navigation }) => {


  const Today = [{
    id: 1,
    read: false
  },
  {
    id: 2,
    read: false
  },
  {
    id: 3,
    read: false
  }];
  const Yesterday = [{
    id: 1,
    read: true
  },
  {
    id: 2,
    read: true
  },
  {
    id: 3,
    read: true
  }];

  const handleBack = () => {
    navigation.navigate('Home')
    console.log('Go back');
  };

  const Noticard = ({item}) => {
    console.log(item, 'item')
    return (
      <SafeAreaView>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: '80%' }}>

            {
              !item?.read ? (
                <>
                  <Image source={require('../../assets/Images/red_dot.png')} style={{}} />
                </>
              ) : null
            }

            <View style={{ height: moderateScale(40, 0.1), width: moderateScale(40, 0.1), marginLeft: 10 }}>
              <Image source={require('../../assets/Images/notification_image.png')} style={{ height: '100%', width: '100%' }} />
            </View>
            <View style={{ paddingHorizontal: moderateScale(10, 0.1), width: '84%' }}>
              <Text style={{ color: '#808080', fontFamily: 'Poppins-medium', fontSize: moderateScale(9, 0.1) }}>Lorem ipsum dolor sit amet consectetur. Tincidunt sit nulla proin purus  </Text>
            </View>
          </View>

          <View style={{ height: moderateScale(35, 0.1), width: moderateScale(63, 0.1), marginLeft: 10, borderRadius: 8, overflow: 'hidden', maxWidth: '20%', }}>
            <Image source={require('../../assets/Images/notification_pic2.png')} style={{ height: '100%', width: '100%' }} />
          </View>

        </View>
        <View style={{ height: 1, width: '90%', backgroundColor: '#BBBBBB', marginVertical: moderateScale(15, 0.1), marginLeft: '5%' }}></View>
      </SafeAreaView>
    )
  }



  return (
    <SafeAreaView style={{flex:1}}>
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
        <View >
        <MainHeader navigation={navigation} backButton={true} logo={false} heading={'Notifications'} />
        </View>
        {/* <SettingsHeader backButton={{ onPress: handleBack, label: 'Back' }} heading=" Notifications" style={styles.header}/> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: moderateScale(20, 0.1) }}>
          <View >
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: moderateScale(10, 0.1), color: '#949494' }}>you have</Text>
          </View>
          <View>
            <Text style={styles.notificationsText}> 4 Notifications </Text>
          </View>
          <View>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: moderateScale(10, 0.1), color: '#949494' }}>today! </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: moderateScale(20, 0.1) }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontFamily: 'Poppins-Bold', 
              color: '#0082C6', 
              marginTop: moderateScale(10, 0.1), 
              fontSize: moderateScale(11, 0.1) }}>
              Today</Text>
          </View>

          <FlatList
            data={Today}
            renderItem={({ item }) => <Noticard item={item} />}
            keyExtractor={item => item.id}
          />

          <View style={{ marginBottom: 20 }}>
            <Text style={{
               fontFamily: 'Poppins-Bold',
             color: '#0082C6', 
             marginTop: moderateScale(10, 0.1), 
             fontSize: moderateScale(11, 0.1) }}>
              Yesterday</Text>
          </View>

          <FlatList
            data={Yesterday}
            renderItem={({ item }) => <Noticard item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Notifications

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    // alignItems:'center',
    
  },
  notificationsText: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(10, 0.1),
    color: '#0082C6',
  }
})

