
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CaptureScreen from './src/screens/Capture_screen';
import SignInNow from './src/screens/SignInNow';
import SignIn from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUpScreen';
import PostForm from './src/screens/PostForm';
import Home from './src/screens/Home';
import BottomTabs from './src/screens/BottomTabs';
import TermsandConditions from './src/screens/SettingsScreen/TermsandConditions';
import PrivacyPolicy from './src/screens/SettingsScreen/PrivacyPolicy';
import HelpandSupport from './src/screens/SettingsScreen/HelpandSupport';
import SettingsHeader from './src/components/SettingsHeader';
import LoadingScreen from './src/screens/LoadingScreen';
import MainHeader from './src/components/MainHeader';
import BootSplash from "react-native-bootsplash";
import UploadPicture from './src/screens/UploadPicture';
import PersonalDetails from './src/screens/PersonalDetails';
import Profile from './src/screens/SettingsScreen/Profile';
import ChangePassword from './src/screens/SettingsScreen/ChangePassword';
import Forgetpassword from './src/screens/ChangePassword/Forgetpassword';
import OTPScreen from './src/screens/ChangePassword/OTPScreen';
import ChangePassLogin from './src/screens/ChangePassword/ChangePassLogin';
import FaqScreen from './src/screens/SettingsScreen/FaqScreen';
import InnerScreen from './src/screens/InnerScreen';
import Filters from './src/components/Filters';
import MapScreen from './src/components/Map';
import { Provider } from 'react-redux'
import { store } from './src/redux/store';
import { useSelector, useDispatch } from 'react-redux'
import { ToastProvider } from 'react-native-toast-notifications'
import { loadToken, setToken } from './src/redux/slicer'
import MyPostScreen from './src/screens/SettingsScreen/MyPosts';



function HomeScreen() {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();


function App() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)


  useEffect(() => {
    dispatch(loadToken()).then((result) => {
      const init = async () => {
        // …do multiple sync or async tasks
      };

      init().finally(async () => {
        await BootSplash.hide({ fade: true });
        console.log("BootSplash has been hidden successfully");
      });
    }).catch((err) => {

    });

  }, []);

  useEffect(() => {
    console.log(user, 'user')
  }, [user])


  return (
    <ToastProvider>
      {/* <Provider store={store}> */}
      <NavigationContainer>

        <Stack.Navigator>
          {/* <Stack.Screen 
        name="LoadingScreen" 
        component={LoadingScreen} 
        options={{headerShown:false}}
        /> */}

          {
            token ? (
              <>
              </>
            ) : (
              <>
                <Stack.Screen
                  name="CaptureScreen"
                  component={CaptureScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Sign_In_Now"
                  component={SignInNow}
                  options={{ headerShown: false }}
                />
              </>

            )
          }

          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostForm"
            component={PostForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UploadPicture"
            component={UploadPicture}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Filters"
            component={Filters}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TermsandConditions"
            component={TermsandConditions}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HelpandSupport"
            component={HelpandSupport}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FaqScreen"
            component={FaqScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InnerScreen"
            component={InnerScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Forgetpassword"
            component={Forgetpassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTPScreen"
            component={OTPScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassLogin"
            component={ChangePassLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingsHeader"
            component={SettingsHeader}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainHeader"
            component={MainHeader}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PersonalDetails"
            component={PersonalDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyPostScreen"
            component={MyPostScreen}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>

      </NavigationContainer>
      {/* </Provider> */}
    </ToastProvider>
  );
}

export default App;