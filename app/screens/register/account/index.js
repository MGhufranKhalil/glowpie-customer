import * as React from 'react';
import { View,  Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Button, ButtonFullWidth} from '../../../components/button';
import {Checkbox} from '../../../components/checkbox';
import {Header} from '../../../components/header';
import {Icon} from '../../../components/icon';
import {Link} from '../../../components/link';
import {Text} from '../../../components/text';
 
import { TextField, TextFieldBottom, TextFieldPassword } from '../../../components/text-field';

import {Switch} from '../../../components/switch';
import {Screen} from '../../../components/screen';
import {color, font, styles, backgroundImages, imgLogo} from '../../../theme';
import {SM, XSM} from '../../../utils/helpers';
import Config from 'react-native-config';
import {style} from './style';
import {registerAccount} from '../../../store/actions/registration';
import {MIN_PASSWORD_LENGTH} from '../../../store/constants';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {diags} from '../../../utils/debug';

const stateProps = state => ({
  account: state.registration,
});

const actionProps = (dispatch, ownProps) => ({
  onRegister: payload => dispatch(registerAccount(payload)),
});

export const RegisterAccountScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    componentWillReceiveProps(props) {
      if (props.account.registered) {
        this.props.navigation.navigate('verification');
        return;
      }
      if (props.account.error && !this.state.error) {
        this.setState({
          loading: false,
        });
        showMessage({
          message: props.account.error,
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
    }

    constructor(props) {
      super(props);

      this.state = {
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
        loading: false,
        error: '',
      };

       
      this.onChangeEmail = value => this.setState({email: value, error: ''});
      this.onChangePassword = value => this.setState({password: value, error: ''});
      this.onChangeConfirmPassword = value =>
        this.setState({confirmPassword: value, error: ''});

      this.onChangeAccept = value => {
        hideMessage();
        this.setState({agree: value, error: ''});
      };

      this.onRegister = () => {
        this.setState({loading: true});
        const {email, password, confirmPassword, agree} = this.state;
        const payload = {email, password, confirmPassword, agree};
        this.props.onRegister(payload);
        // this.props.navigation.navigate('verification');
      };
      this.logIn = () => this.props.navigation.navigate('login');
      this.onTermsAndCondition = () => {
        this.props.navigation.navigate('registerTermsAndCondition');
        return;
      };
    }

    render() {
      const {
        email,
        password,
        confirmPassword,
        agree,
        loading,
      } = this.state;
      const preset = 'scroll';
      return (
        <View testID="RegisterAccountScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset={preset}>
            <Image
              source={backgroundImages.SignIn}
              style={style.WELCOME_IMAGE}
            />
            <View style={style.VFLEX_PADDED}>
              <View style={styles.PAGE_HEADER_WITH_BUTTON}>
                <Header background={false} />
                <Button
                  style={styles.TOP_RIGHT_CORNER_BUTTON}
                  text="Sign in"
                  textStyle={styles.TOP_RIGHT_CORNER_BUTTON_TEXT}
                  onPress={this.logIn}
                />
              </View>

              <View style={style.CONTAINER}>
                <Image source={imgLogo} style={style.LOGO} />
                <Text text="SIGN UP AND" style={styles.TEXT_HEADER} />
                <Text>
                  <Text text="Book" style={style.TEXT_BOLD} />
                  <Text text="  " style={styles.SEP} />
                  <Text text="Your" style={style.TEXT_BOLD} />
                  <Text text="  " style={styles.SEP} />
                  <Text text="Station" style={style.TEXT_BOLD} />
                </Text>
              </View>

              <View style={styles.FOOTER_VIEW_FULL}>
                <View style={{padding: 15}}>
                  <Text text="Personal Information" style={style.PERSONAL} />

                  <TextFieldBottom
                    label="Email"
                    onChangeText={this.onChangeEmail}
                    maxLength={100}
                    autoCorrect={false}
                    autoCapitalize={false}
                    value={email}
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
                  <TextFieldPassword
                    label="Confirm Password"
                    onChangeText={this.onChangeConfirmPassword}
                    autoCorrect={false}
                    value={confirmPassword}
                    icon="show"
                  />

                  <View style={style.ACCEPT_SWITCH}>
                    <View style={style.SWITCH}>
                      <Text style={style.SWITCH_TEXT}>I agree to the</Text>
                      <TouchableOpacity onPress={this.onTermsAndCondition}>
                        <Text style={style.TERMS_LINK}>Terms & Conditions</Text>
                      </TouchableOpacity>
                    </View>
                    <Switch onToggle={this.onChangeAccept} value={agree} />
                  </View>
                </View>
                <View>
                  <ButtonFullWidth
                    style={styles.NO_RADIUS}
                    testID="start-button"
                    preset="primary"
                    text={'Sign up'}
                    onPress={this.onRegister}
                    // onPress={ () => this.props.navigation.navigate('verification')}
                    // onPress={ () => console.log('test')}
                    // icon="next"
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
