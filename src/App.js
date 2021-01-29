import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './Router';
import {connect, Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Store, Persistor} from './Redux/store';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import Firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {colors, getData, messageAlert} from './utils';
import NetInfo from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class App extends Component {
  componentDidMount() {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const {title, body} = remoteMessage.notification;
      console.log('ada', remoteMessage);
      messageAlert(title, body, 'info', 'top', colors.white, colors.chat.text);
    });
    unsubscribe;

    const unsubscribeNet = NetInfo.addEventListener(async (state) => {
      const isLogin = await getData('uDetail');
      console.log('isLogin', state);
      if (state.isConnected && isLogin) {
        firestore().collection('Users').doc(isLogin.uid).update({
          isOnline: true,
        });
      } else if (state.isConnected == false && isLogin) {
        firestore().collection('Users').doc(isLogin.uid).update({
          isOnline: false,
        });
      }
    });
    unsubscribeNet;
  }
  render() {
    return (
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <NavigationContainer>
            <Router />
            <FlashMessage position="bottom" />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
