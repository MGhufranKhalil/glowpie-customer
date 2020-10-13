import * as React from 'react';
import {View, Image} from 'react-native';
import {connect} from 'react-redux';
import {Button, ButtonFullWidth} from '../../components/button'; 
import {Icon} from '../../components/icon';
import {Link} from '../../components/link'; 
import {Text} from '../../components/text';

import { TextFieldBottom, TextFieldPassword} from '../../components/text-field';
import {Screen} from '../../components/screen';
import {color, styles, backgroundImages, imgLogo} from '../../theme';

import {style} from './style';
import {doLogin} from '../../store/actions/login';
import {decideInitialScreen} from '../../utils/app';
import {showMessage} from 'react-native-flash-message'; 

const stateProps = state => ({
  login: state.login,
  vendor: state.vendor,
});

const actionProps = (dispatch, ownProps) => ({
  onLogin: payload => dispatch(doLogin(payload)),
});

export const LoginScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    componentWillReceiveProps(props) {
      if (props.login.success) {
        this.props.navigation.navigate(decideInitialScreen(props.vendor));
        return;
      }
      if (props.login.error && !this.state.loginError) {
        this.setState({
          loading: false,
        });
        showMessage({
          message: props.login.error,
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
    }

    constructor(props) {
      super(props);

      this.state = {
        loginid: '',
        password: '',
        loading: false,
        idError: '',
        passwordError: '',
        loginError: '',
        rememberMe: false,
      };

      this.onChangeId = value =>
        this.setState({loginid: value, loginError: ''});

      this.onChangePassword = value =>
        this.setState({password: value, loginError: ''});

      this.doLogin = () => {
        this.setState({loading: true});
        const {loginid, password, rememberMe} = this.state;
        const payload = {loginid, password, rememberMe};
        this.props.onLogin(payload);
      };

      this.forgotPassword = () => {
        console.log('test');
        this.props.navigation.navigate('forgotPassword');
      }

      this.signUp = () => this.props.navigation.navigate('signup');

      this.doFacebook = () => {};
      this.doGoogle = () => {};
    }

    render() {
      const {loginid, password, loading} = this.state;
      return (
        <View testID="LoginScreen" style={styles.FULL}>
          <Screen
            style={styles.SCREEN}
            preset='scroll'
            backgroundColor={color.transparent}>
            <Image
              source={backgroundImages.SignIn}
              style={style.WELCOME_IMAGE}
            />

            <View style={style.VFLEX_PADDED}>
              <Button
                style={styles.TOP_RIGHT_CORNER_BUTTON}
                text="Sign Up"
                textStyle={styles.TOP_RIGHT_CORNER_BUTTON_TEXT}
                onPress={this.signUp}
              />

              <View style={style.CONTAINER}>
                <Image source={imgLogo} style={style.LOGO} />
                <Text text="WELCOME." style={style.TEXT_HEADER} />

                <Text>
                  <Text text="To" style={style.TEXT_BOLD} />
                  <Text text="  " style={style.SEP} />
                  <Text text="Glow" style={style.TEXT_BOLD} />
                  <Text text="  " style={style.SEP} />
                  <Text text="Pie" style={style.TEXT_BOLD} />
                </Text>
              </View>

              <View style={styles.FOOTER_VIEW_FULL}>
                <View style={{padding: 15}}>
                  <Text text="Sign in with" style={style.SIGN_IN_TEXT} />
                  <View style={style.SOCIAL_BUTTONS}>
                    <Button onPress={this.doFacebook} style={style.BUTTON_FB}>
                      <Icon icon="facebook" style={style.SOCIAL_BUTTON_ICON} />
                      <Text text="Facebook" style={style.SOCIAL_BUTTON_TEXT} />
                    </Button>
                    <Button onPress={this.doGoogle} style={style.BUTTON_GOOGLE}>
                      <Icon icon="google" style={style.SOCIAL_BUTTON_ICON} />
                      <Text text="Google" style={style.SOCIAL_BUTTON_TEXT} />
                    </Button>
                  </View>
                  <TextFieldBottom
                    label="EMAIL ADDRESS"
                    onChangeText={this.onChangeId}
                    maxLength={40}
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={loginid}
                    // icon="email"
                    keyboardType="email-address"
                  />
                  <TextFieldPassword
                    label="Password"
                    onChangeText={this.onChangePassword}
                    autoCorrect={false}
                    value={password}
                    icon="show"
                  />

                  <Link
                    style={style.FORGOT_LINK}
                    labelStyle={style.FORGOT_LINK_TEXT}
                    text="Forgot Password?"
                    onClick={this.forgotPassword}
                  />

                </View>
                <View>
                  <ButtonFullWidth
                    style={styles.NO_RADIUS}
                    testID="start-button"
                    preset="primary"
                    text={'Sign In'}
                    onPress={this.doLogin}
                    disabled={loading}
                    loading={loading}
                  />
                </View>
              </View>
            </View>
          </Screen>
        </View>
      );
    }
  },
);
