import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {iconLogo} from '../../Assets';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {storeData} from '../../utils';
import {connect} from 'react-redux';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initializing: true,
      user: null,
    };
  }
  componentDidMount() {
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
          <View>
            <Image source={iconLogo} />
          </View>
          <View>
            <Text style={styles.label}>Salt Academy App</Text>
          </View>
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
  label: {fontSize: 18, letterSpacing: 1, fontWeight: 'bold'},
  page: {flex: 1, backgroundColor: 'white'},
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
