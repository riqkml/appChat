import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Button, Gap, Label} from '../../Component';
import {colors} from '../../utils';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {People} from '../../Assets';
class Profile extends Component {
  async _logOutUser() {
    // Assume user is already signed in
    const userId = auth().currentUser.uid;
    console.log('userid', userId);
    // Add the token to the users datastore
    await firestore().collection('Users').doc(userId).update({
      tokens: firestore.FieldValue.delete(),
    });
    auth().signOut();
    this.props.navigation.replace('Login');
  }
  render() {
    const {dataUser} = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: 'center',
        }}>
        <ScrollView>
          <View style={{paddingTop: 40}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={People} style={{width: 100, height: 100}} />
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <View style={{justifyContent: 'center'}}>
                <Label title="Name" content={dataUser.displayName} />
                <Label title="Email" content={dataUser.email} />
                <Label title="Phone" content={dataUser.phoneNumber} />
              </View>
            </View>
            <Gap height={80} />
            <Button
              label="Log Out"
              margin={20}
              onClick={() => this._logOutUser()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataUser: state.authReducer.userLoginData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    otherData: (value) =>
      dispatch({
        type: 'START-CHAT',
        otherData: value,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
const styles = StyleSheet.create({});
