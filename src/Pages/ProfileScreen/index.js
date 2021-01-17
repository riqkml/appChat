import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Button} from '../../Component';
import {colors} from '../../utils';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Text> profile </Text>
        <Button
          label="Log Out"
          margin={20}
          onClick={() => this._logOutUser()}
        />
      </View>
    );
  }
}

export default connect()(Profile);
const styles = StyleSheet.create({});
