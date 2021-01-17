import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  LoginScreen,
  RegisterScreen,
  SplashScreen,
  DashboardScreen,
  ChattingScreen,
  ContactScreen,
  ProfileScreen,
} from '../Pages';
import {colors, fonts} from '../utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// const Tab = createMaterialTopTabNavigator();
import {Header} from '../Component';
import {People} from '../Assets';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const header = {headerShown: false};
export default class Router extends Component {
  MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Dashboard"
        activeColor="#fff"
        shifting="true"
        barStyle={{backgroundColor: colors.primary}}>
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#1F65FF',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="forum" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ContactScreen}
          options={{
            tabBarLabel: 'Contact',
            tabBarColor: '#D02760',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="book" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#1F65FF',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  render() {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={header}
          />
          <Stack.Screen name="Login" component={LoginScreen} options={header} />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={header}
          />
          <Stack.Screen
            name="Chatting"
            component={ChattingScreen}
            options={header}
          />
          <Stack.Screen
            name="mainApp"
            component={this.MyTabs}
            options={header}
          />
        </Stack.Navigator>
      </>
    );
  }
}
