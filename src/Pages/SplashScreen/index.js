import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {iconLogo} from '../../Assets';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {colors, fonts, storeData} from '../../utils';
import {connect} from 'react-redux';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    storeData('uDetail', false);
    auth().onAuthStateChanged(async (user) => {
      if (user) {
        const id = user.uid;
        const request = await firestore()
          .collection('Users')
          .where('uid', '==', id)
          .get();
        if (request) {
          const detail = request._docs[0]._data;
          this.props.userDetail(detail);
          storeData('uDetail', detail);
          setTimeout(() => {
            this.props.navigation.replace('mainApp');
          }, 3000);
        }
      } else {
        setTimeout(() => {
          this.props.navigation.replace('Login');
        }, 3000);
      }
    });
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.label}>K-onnect</Text>
          <Text style={styles.subLabel}>Simple App Messaging</Text>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    userDetail: (value) => {
      dispatch({
        type: 'LOGIN-USER',
        userLogin: value,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
const styles = StyleSheet.create({
  label: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 45,
    letterSpacing: 0.5,
  },
  subLabel: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  page: {flex: 1, backgroundColor: colors.primary},
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
