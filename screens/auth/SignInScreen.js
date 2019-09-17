import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import $t from 'i18n';

import { login, facebookLogin, googleLogin } from '../../store/actions/UserActions';
import { SignInForm } from '../../components/auth/SignInForm';
import { signInErrorSelector } from '../../store/selectors/ErrorSelector';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: $t('auth.signIn'),
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  static propTypes = {
    navigation: PropTypes.object,
    login: PropTypes.func,
    facebookLogin: PropTypes.func,
    googleLogin: PropTypes.func,
    signInError: PropTypes.bool
  };

  onSubmit = signInData => {
    this.props.login(signInData);
  };

  goToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  goToForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  render() {
    const { signInError, facebookLogin, googleLogin } = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid>
          <Icon
            containerStyle={styles.containerStyle}
            size={75}
            name="heartbeat"
            type="font-awesome"
            color="#f50"
          />
          <SignInForm onSubmit={this.onSubmit} signInError={signInError} />

          <Button title="Sign in with Facebook!" onPress={facebookLogin} />
          <Button title="Sign in with Google!" onPress={googleLogin} />
          <Button title="Sign up!" onPress={this.goToSignUp} />
          <Button title="Forgot password" onPress={this.goToForgotPassword} />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    signInError: signInErrorSelector(state)
  };
};

const mapDispatchToProps = {
  login,
  facebookLogin,
  googleLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  containerStyle: {
    margin: 15
  }
});
