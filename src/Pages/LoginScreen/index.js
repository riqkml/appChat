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
import auth from '@react-native-firebase/auth';
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
    const {dataLogin, navigation} = this.props;
    if (email == '' || password == '') {
      messageAlert('Alert', 'incomplete form', 'danger');
    } else {
      const loginUser = dataLogin.filter((data) => data.email == email);
      if (password == loginUser[0].pass) {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then((res) => {
            const userData = res.user.providerData[0];
            this.setState({providerData: userData});
            messageAlert('Login', `welcome, ${email}`, 'success');
            const data = loginUser[0];
            this.props.loginUser({
              id: data.id,
              user: data.user,
              ...userData,
            });
            navigation.replace('Dashboard');
          })
          .catch((err) => {
            console.log('error', err);
          });
      } else {
        messageAlert('Alert', 'Wrong Password', 'danger');
      }
    }
  }
  componentDidMount() {
    const subcriber = auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? 'Dashboard' : 'Login');
    });
    return subcriber;
  }
  render() {
    const {navigation} = this.props;
    const routeLogin = () => {
      navigation.navigate('Register');
    };
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.topSide}>
              <Image source={iconLogo} style={styles.logoImg} />
              <Text style={styles.label}>Salt Academy App</Text>
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
              <Gap height={20} />
              <Button
                label="Login"
                margin={20}
                onClick={() => this._submitData()}
              />
            </View>
            <View style={styles.linkSide}>
              <Link title="Forgot Password ? " link="Reset Password" />
              <Link
                title="Don't have an account ? "
                link="Sign Up"
                click={routeLogin}
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
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  logoImg: {width: width * 0.3, height: height * 0.3},
  label: {fontSize: 16, fontWeight: 'bold'},
  subLabel: {fontSize: 16},
  linkSide: {
    marginVertical: 60,
  },
});
