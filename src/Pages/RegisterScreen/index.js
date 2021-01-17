import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import 'react-native-get-random-values';
import {connect} from 'react-redux';
import {iconLogo} from '../../Assets';
import {v4 as uuidv4} from 'uuid';
import {Button, Gap, Input, Link} from '../../Component';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {messageAlert} from '../../utils/Message';
import {colors, fonts} from '../../utils';
import messaging from '@react-native-firebase/messaging';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      user: '',
      email: '',
      password: '',
      confirm: '',
    };
  }
  _tempData(inputType, value) {
    this.setState({
      [inputType]: value,
    });
  }
  async _submitData() {
    if (
      this.state.name == '' ||
      this.state.user == '' ||
      this.state.email == '' ||
      this.state.password == '' ||
      this.state.confirm == ''
    ) {
      messageAlert('Alert', 'incomplete form', 'danger');
    } else {
      if (this.state.password != this.state.confirm) {
        messageAlert('Warning', 'Password must be same', 'warning');
      } else {
        auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(async (res) => {
            const user = res.user;
            user.providerData[0].displayName = this.state.user;
            user.providerData[0].uid = user.uid;
            this.props.addUser(this.state);
            firestore()
              .collection('Users')
              .doc(user.uid)
              .set(user.providerData[0])
              .then(async (res) => {
                messageAlert('Congrats!', 'Your account is created', 'success');
                const userToken = await messaging().getToken();
                userToken && this._saveTokenToDatabase(userToken);
              });
          })
          .catch((err) => {
            const error = err.message;
            messageAlert('Failed', error, 'danger');
          });
      }
    }
  }

  async _saveTokenToDatabase(token) {
    // Assume user is already signed in
    const userId = auth().currentUser.uid;
    console.log('userid', userId);
    // Add the token to the users datastore
    await firestore()
      .collection('Users')
      .doc(userId)
      .update({
        tokens: firestore.FieldValue.arrayUnion(token),
      });
  }
  render() {
    const {navigation} = this.props;

    const routeRegister = async () => {
      navigation.navigate('Login');
    };
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.topSide}>
              <Text style={styles.label}>K-onnect</Text>
              <Gap height={15} />
              <Text style={styles.subLabel}>
                Please register with valid data
              </Text>
            </View>
            <View>
              <Input
                icon="user"
                onChangeText={(e) => this._tempData('name', e)}
                sizeIcon={30}
                label="Fullname"
              />
              <Gap height={10} />
              <Input
                icon="user"
                onChangeText={(e) => this._tempData('user', e)}
                sizeIcon={30}
                label="Username"
              />
              <Gap height={10} />
              <Input
                icon="envelope"
                onChangeText={(e) => this._tempData('email', e)}
                sizeIcon={22}
                label="Email"
              />
              <Gap height={10} />
              <Input
                icon="key"
                sizeIcon={22}
                label="Password"
                onChangeText={(e) => this._tempData('password', e)}
                secure
                isPassword
              />
              <Gap height={10} />
              <Input
                icon="key"
                sizeIcon={22}
                label="Confirm Password"
                onChangeText={(e) => this._tempData('confirm', e)}
                secure
                isPassword
              />
              <Gap height={40} />
              <Button label="Register" onClick={() => this._submitData()} />
            </View>
            <View style={styles.linkSide}>
              <Link
                title="Already have an account ?"
                link=" Sign In"
                click={routeRegister}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.usersReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (value) => {
      console.log('as', uuidv4);
      const data = {
        id: uuidv4(),
        user: value.user,
        email: value.email,
        pass: value.password,
      };
      dispatch({
        type: 'REGISTER-USER',
        data: data,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
const styles = StyleSheet.create({
  label: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 45,
    letterSpacing: 0.5,
  },
  logoImg: {width: width * 0.25, height: height * 0.25},
  subLabel: {fontSize: 16, fontFamily: fonts.regular},
  topSide: {alignItems: 'center', paddingBottom: 25},
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginBottom: 40,
    paddingVertical: 80,
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  linkLabel: {color: '#2F3B8F', fontWeight: '600', fontSize: 16},
  linkMainLabel: {fontSize: 14},
  linkSide: {marginTop: 30},
});
