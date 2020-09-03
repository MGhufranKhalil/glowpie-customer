import * as React from 'react';
import {View, ScrollView, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {Button, ButtonFullWidth} from '../../../components/button';
import {Checkbox} from '../../../components/checkbox';
import {Header} from '../../../components/header';
import {Icon} from '../../../components/icon';
import {Link} from '../../../components/link';
import {Text} from '../../../components/text';

import {TextField, TextFieldBottom} from '../../../components/text-field';
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
        confirm_password: '',
        agree: false,
        loading: false,
        error: '',
      };

      // this.onChangeFirstName = value => this.setState({first_name: value, error: ''});
      // this.onChangeLastName = value => this.setState({last_name: value, error: ''});
      this.onChangeEmail = value => this.setState({email: value, error: ''});
      this.onChangePassword = value => this.setState({password: value, error: ''});
      this.onChangeConfirmPassword = value =>
        this.setState({confirm_password: value, error: ''});

      this.onChangeAccept = value => {
        hideMessage();
        this.setState({agree: value, error: ''});
      };

      this.onRegister = () => {
        // this.setState({loading: true});
        // const {email, password, confirm_password, agree} = this.state;
        // const payload = {email, password, confirm_password, agree};
        // this.props.onRegister(payload);
        this.props.navigation.navigate('verification');
      };
      this.logIn = () => this.props.navigation.navigate('login');

    }

    render() {
      const {
        email,
        password,
        confirm_password,
        agree,
        loading,
      } = this.state;
      const preset = 'fixed';
      return (
        <View testID="RegisterAccountScreen" style={styles.FULL}>
          <Screen style={styles.CONTAINER_PADDED} preset={preset}>
            <Image
              source={backgroundImages.SignIn}
              style={style.WELCOME_IMAGE}
            />
            <View style={style.VFLEX_PADDED}>
              {/*  */}
              {/* <Header /> */}

              <Button
                style={styles.TOP_RIGHT_CORNER_BUTTON}
                text="Sign in"
                textStyleOverride={styles.TOP_RIGHT_CORNER_BUTTON_TEXT}
                onPress={this.logIn}
              />

              <View style={style.CONTAINER}>
                <Image source={imgLogo} style={style.LOGO} />
                <Text text="WELCOME." style={styles.TEXT_HEADER} />
                <Text>
                  <Text text="To" style={styles.TEXT_BOLD} />
                  <Text text="  " style={styles.SEP} />
                  <Text text="Glow" style={styles.TEXT_BOLD} />
                  <Text text="  " style={styles.SEP} />
                  <Text text="Pie" style={styles.TEXT_BOLD} />
                </Text>
              </View>

              <View style={styles.FOOTER_VIEW_FULL}>
                <View style={{padding: 15}}>
                  <Text text="Personal" style={style.PERSONAL} />

                  <TextFieldBottom
                    label="EMAIL"
                    // onChangeText={this.onChangeId}
                    maxLength={40}
                    autoCorrect={false}
                    autoCapitalize="none"
                    // value={loginid}
                    // icon="email"
                    keyboardType="email-address"
                  />
                  <TextFieldBottom
                    label="PASSWORD"
                    // onChangeText={this.onChangeId}
                    maxLength={40}
                    autoCorrect={false}
                    autoCapitalize="none"
                    // value={loginid}
                    // icon="email"
                    keyboardType="password"
                    secureTextEntry={true}
                  />
                  <TextFieldBottom
                    label="Confirm Password"
                    // onChangeText={this.onChangeId}
                    maxLength={40}
                    autoCorrect={false}
                    autoCapitalize="none"
                    // value={loginid}
                    // icon="email"
                    keyboardType="password"
                    secureTextEntry={true}
                  />
                  <View style={style.ACCEPT_SWITCH}>
                    <View style={style.SWITCH}>
                      <Text style={style.SWITCH_TEXT}>I agree to the</Text>
                      <Link
                        url=""
                        text="Terms & Conditions"
                        labelStyle={style.TERMS_LINK}
                      />
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
                    // disabled={loading}
                    // loading={loading}
                  />
                </View>
              </View>
              {/* <View style={style.CONTAINER}>
                <TextField
                  label="First Name"
                  onChangeText={this.onChangeFirstName}
                  maxLength={30}
                  autoCorrect={false}
                  value={first_name}
                  icon="user"
                />
                <TextField
                  label="Last Name"
                  onChangeText={this.onChangeLastName}
                  maxLength={30}
                  autoCorrect={false}
                  value={last_name}
                  icon="user"
                />
                <TextField
                  label="Email"
                  onChangeText={this.onChangeEmail}
                  maxLength={100}
                  autoCorrect={false}
                  autoCapitalize={false}
                  value={email}
                  icon="email"
                  keyboardType="email-address"
                />
                <TextField
                  label="Password"
                  onChangeText={this.onChangePassword}
                  maxLength={20}
                  autoCorrect={false}
                  secureTextEntry={true}
                  value={password}
                  icon="lock"
                />
                <View style={style.ACCEPT_SWITCH}>
                  <View style={style.SWITCH}>
                    <Text style={style.SWITCH_TEXT}>I agree to the</Text>
                    <Link
                      url=""
                      text="Terms & Conditions"
                      labelStyle={style.TERMS_LINK}
                    />
                  </View>
                  <Switch onToggle={this.onChangeAccept} value={agree} />
                </View>
              </View> */}
              {/* <View style={styles.FOOTER_VIEW}>
                <Button
                  testID="signup-button"
                  preset="primary"
                  text="Continue"
                  onPress={this.onRegister}
                  icon="next"
                  disabled={loading}
                  loading={loading}
                />
              </View> */}
            </View>
          </Screen>
        </View>
      );
    }
  },
);
