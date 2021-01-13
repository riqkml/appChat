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
  _submitData() {
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
          .then((res) => {
            const user = res.user;
            this.props.addUser(this.state);
            firestore()
              .collection('Users')
              .doc(user.uid)
              .set(user.providerData[0])
              .then((response) => {
                messageAlert('Congrats!', 'Your account is created', 'success');
                this.props.navigation.navigate('Login');
              });
          })
          .catch((err) => {
            const error = err.message;
            messageAlert('Failed', error, 'danger');
          });
      }
    }
  }
  render() {
    const {navigation} = this.props;
    const routeRegister = () => {
      navigation.navigate('Login');
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
                Please register with valid data
              </Text>
            </View>
            <View>
              <Input
                icon="user"
                onChangeText={(e) => this._tempData('name', e)}
                sizeIcon={30}
                label="Fullname"
                isBorder
              />
              <Input
                icon="user"
                onChangeText={(e) => this._tempData('user', e)}
                sizeIcon={30}
                label="Username"
                isBorder
              />
              <Input
                icon="envelope"
                onChangeText={(e) => this._tempData('email', e)}
                sizeIcon={22}
                label="Email"
                isBorder
              />
              <Input
                icon="key"
                sizeIcon={22}
                label="Password"
                onChangeText={(e) => this._tempData('password', e)}
                secure
                isPassword
                isBorder
              />
              <Input
                icon="key"
                sizeIcon={22}
                label="Confirm Password"
                onChangeText={(e) => this._tempData('confirm', e)}
                secure
                isPassword
                isBorder
              />
              <Gap height={20} />
              <Button label="Register" onClick={() => this._submitData()} />
            </View>
            <View style={styles.linkSide}>
              <Link title="Forgot Password ? " link="Reset Password" />
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
  label: {fontSize: 16, fontWeight: 'bold'},
  logoImg: {width: width * 0.25, height: height * 0.25},
  subLabel: {fontSize: 16},
  topSide: {alignItems: 'center', paddingBottom: 15},
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  linkLabel: {color: '#2F3B8F', fontWeight: '600', fontSize: 16},
  linkMainLabel: {fontSize: 14},
  linkSide: {marginTop: 30},
});
