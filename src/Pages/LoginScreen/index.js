import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {iconLogo} from '../../Assets';
import {Button, Gap, Input, Link} from '../../Component';
import {messageAlert} from '../../utils/Message';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {colors, fonts} from '../../utils';
import messaging from '@react-native-firebase/messaging';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      providerData: {},
    };
  }

  _tempData(inputType, value) {
    this.setState({
      [inputType]: value,
    });
  }
  _submitData() {
    const {email, password} = this.state;
    const {navigation} = this.props;
    if (email == '' || password == '') {
      messageAlert('Alert', 'incomplete form', 'danger');
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          const userData = res.user.providerData[0];
          this.setState({providerData: userData});
          messageAlert('Login', `welcome, ${email}`, 'success');
          this.props.loginUser({
            user: {
              ...userData,
            },
          });
          const auths = auth().currentUser.uid;
          firestore().collection('Users').doc(auths).update({
            isOnline: true,
          });
          const userToken = await messaging().getToken();
          userToken && this._saveTokenToDatabase(userToken);
          navigation.replace('mainApp');
        })
        .catch((error) => {
          const errorMessage = error.message;
          messageAlert('Alert', errorMessage, 'danger');
        });
    }
  }
  async _saveTokenToDatabase(token) {
    // Assume user is already signed in
    const userId = auth().currentUser.uid;
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
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.topSide}>
              <Text style={styles.label}>K-onnect</Text>
              <Gap height={15} />
              <Text style={styles.subLabel}>
                Please login with a registered account
              </Text>
            </View>
            <View style={styles.bottomSide}>
              <Input
                icon="envelope"
                onChangeText={(e) => this._tempData('email', e)}
                sizeIcon={25}
                label="Email"
              />
              <Gap height={height * 0.01} />
              <Input
                icon="key"
                label="Password"
                onChangeText={(e) => this._tempData('password', e)}
                sizeIcon={25}
                secure
                isPassword
              />
              <Gap height={60} />
              <Button
                label="Login"
                margin={20}
                onClick={() => this._submitData()}
              />
            </View>
            <View style={styles.linkSide}>
              <Link
                title="Don't have an account ? "
                link="Sign Up"
                click={() => navigation.navigate('Register')}
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
    dataLogin: state.usersReducer.user,
    isLogin: state.authReducer.userLoginData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (value) => {
      const data = {
        ...value,
      };
      dispatch({
        type: 'LOGIN-USER',
        userLogin: data,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
const styles = StyleSheet.create({
  bottomSide: {flex: 1, paddingVertical: 20},
  linkMainLabel: {fontSize: 14},
  page: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  topSide: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 80,
    paddingBottom: 40,
  },
  logoImg: {width: width * 0.3, height: height * 0.3},
  label: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 45,
    letterSpacing: 0.5,
  },
  subLabel: {fontSize: 16},
  linkSide: {
    flex: 1,
    marginVertical: 60,
  },
});
