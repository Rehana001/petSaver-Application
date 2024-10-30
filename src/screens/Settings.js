import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/EvilIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import RoundButton from '../components/RoundButton';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import SettingsHeader from '../components/SettingsHeader';
import { moderateScale } from 'react-native-size-matters';
import MainHeader from '../components/MainHeader';
import { useSelector, useDispatch } from 'react-redux';
import { removeTokenAsync, loadToken } from '../redux/slicer'



const Settings = ({ navigation }) => {

  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token);



  return (
    <SafeAreaView style={styles.container}>
      <MainHeader navigation={navigation} backButton={true} logo={false} heading={'Settings'} />
      <View style={{ paddingHorizontal: moderateScale(30, 0.1), justifyContent: 'space-between', flex: 1 }}>
        <View style={{ marginTop: moderateScale(50, 0.1) }}>

          <TouchableOpacity style={styles.searchBarStyle} onPress={() => navigation.navigate('TermsandConditions')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: moderateScale(40, 0.1) }}>
                <Icon name="profile" size={20} color="#0082C6" style={styles.searchIcon} />
              </View>
              <Text style={styles.termsText}>Terms and Condition</Text>
            </View>
            <Icon2 name="arrow-forward-ios" size={15} color={'black'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchBarStyle} onPress={() => navigation.navigate('PrivacyPolicy')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: moderateScale(40, 0.1) }}>
                <Icon2 name="policy" size={20} color="#0082C6" style={styles.searchIcon} />
              </View>
              <Text style={styles.termsText}>Privacy Policy</Text>
            </View>
            <Icon2 name="arrow-forward-ios" size={15} color={'black'} />
          </TouchableOpacity>



          {
            token ? (
              <>
                <TouchableOpacity style={styles.searchBarStyle} onPress={() => navigation.navigate('HelpandSupport')}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: moderateScale(40, 0.1) }}>
                      <EntypoIcon name="help-with-circle" size={20} color="#0082C6" style={styles.searchIcon} />
                    </View>
                    <Text style={styles.termsText}>Help & Support</Text>
                  </View>
                  <Icon2 name="arrow-forward-ios" size={15} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchBarStyle} onPress={() => navigation.navigate('Profile')}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: moderateScale(40, 0.1) }}>
                      <Icon name="user" size={20} color="#0082C6" style={styles.searchIcon} />
                    </View>
                    <Text style={styles.termsText}>Profile</Text>
                  </View>
                  <Icon2 name="arrow-forward-ios" size={15} color={'black'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.searchBarStyle} onPress={() => navigation.navigate('MyPostScreen')}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: moderateScale(40, 0.1) }}>
                      <Icon2 name="post-add" size={20} color="#0082C6" style={styles.searchIcon} />
                    </View>
                    <Text style={styles.termsText}>My Posts</Text>
                  </View>
                  <Icon2 name="arrow-forward-ios" size={15} color={'black'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.searchBarStyle} onPress={() => navigation.navigate('ChangePassword')}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: moderateScale(40, 0.1) }}>
                      <Icon3 name="key-outline" size={20} color="#0082C6" style={styles.searchIcon} />
                    </View>
                    <Text style={styles.termsText}>Change Password</Text>
                  </View>
                  <Icon2 name="arrow-forward-ios" size={15} color={'black'} />
                </TouchableOpacity>


                <TouchableOpacity style={styles.searchBarStyle} >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: moderateScale(40, 0.1) }}>
                      <Icon4 name="trash" size={30} color="#0082C6" style={styles.searchIcon} />
                    </View>
                    <Text style={styles.termsText}>Delete Account</Text>
                  </View>
                  <Icon2 name="arrow-forward-ios" size={15} color={'black'} />
                </TouchableOpacity>

              </>
            ) : null
          }


          <TouchableOpacity style={styles.searchBarStyle} onPress={() => navigation.navigate('FaqScreen')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: moderateScale(40, 0.1) }}>
                <FontAwesome6 name="clipboard-question" size={20} color="#0082C6" style={styles.searchIcon} />
              </View>
              <Text style={styles.termsText}>FAQs</Text>
            </View>
            <Icon2 name="arrow-forward-ios" size={15} color={'black'} />
          </TouchableOpacity>


        </View>

        {
          token ? (
            <>
              <View style={styles.ButtonViewStyle}>
                <TouchableOpacity style={styles.ButtonStyle} onPress={() => {
                  dispatch(removeTokenAsync()).then((res) => {
                    navigation.navigate('CaptureScreen')
                  })
                }}>
                  <SimpleLineIcon name="logout" size={15} color={"white"} style={{ marginRight: moderateScale(10, 0.1) }} />
                  <Text style={styles.ButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </>
          ) :
            (
              <>
                <View style={styles.ButtonViewStyle}>
                  <TouchableOpacity style={styles.ButtonStyle} onPress={() => {
                    dispatch(removeTokenAsync()).then((res) => {
                      navigation.navigate('SignIn')
                    })
                  }}>
                    <SimpleLineIcon name="logout" size={15} color={"white"} style={{ marginRight: moderateScale(10, 0.1) }} />
                    <Text style={styles.ButtonText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </>
            )
        }



      </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  searchBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F2',
    borderRadius: moderateScale(20, 0.1),
    paddingVertical: moderateScale(10, 0.1),
    paddingHorizontal: moderateScale(15, 0.1),
    // height: moderateScale(34, 0.1),
    marginBottom: moderateScale(10, 0.1),
  },
  searchIcon: {
    marginRight: 0,
    marginBottom: moderateScale(4, 0.1),
    paddingRight: moderateScale(10, 0.1)
  },
  inputContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    marginLeft: 0,
    flex: 1
  },
  termsText: {
    color: '#0082C6',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12, 0.1)
  },
  ButtonStyle: {
    flexDirection: 'row',
    backgroundColor: '#FF1313',
    padding: moderateScale(10, 0.1),
    paddingRight: moderateScale(20, 0.1),
    // justifyContent: 'flex-end',
    borderRadius: moderateScale(25, 0.1),
    width: moderateScale(100, 0.1),
    // marginLeft:moderateScale(250,0.1)

  },
  ButtonText: {
    alignItems: 'center',
    color: "white"
  },
  ButtonViewStyle: {
    marginBottom: moderateScale(40, 0.1),
    // marginLeft: moderateScale(210, 0.1)
  },


})