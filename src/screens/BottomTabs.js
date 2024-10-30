
import React from 'react';
import { StyleSheet ,View,Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import Home from './Home';
import Search from './Search';
import Notifications from './Notifications';
import Settings from './Settings';
import TermsandConditions from './SettingsScreen/TermsandConditions';
import PrivacyPolicy from './SettingsScreen/PrivacyPolicy';
import HelpandSupport from './SettingsScreen/HelpandSupport';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Settings') {
            iconName = focused ? 'gear' : 'gear';
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        showLabel: false, 
        style: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
        },
        activeTintColor: 'red', 
        inactiveTintColor: '#0082C6', 
      }}
    >
      <Tab.Screen name="Home" component={Home}  options={{headerShown:false}}/>
      <Tab.Screen name="Search" component={Search}  options={{headerShown:false}} />
      <Tab.Screen
        name="Add"
        component={Home}
        options={{
          headerShown:false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="add-circle" size={50} color={'#C11E1E'} style={{bottom:20}}
           />
          ),
        
        }}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Open the URL
            navigation.navigate('PostForm')
          },
        })}
      />
      <Tab.Screen name="Notifications" component={Notifications}  options={{headerShown:false}}/>
      <Tab.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
     
    </Tab.Navigator>
  );
};

const AddScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Add Screen</Text>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
