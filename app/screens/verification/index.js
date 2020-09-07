import * as React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {Button, ButtonFullWidth} from '../../components/button';
import {Checkbox} from '../../components/checkbox';
import {Header} from '../../components/header';
import {Icon} from '../../components/icon';
import {Link} from '../../components/link';
import {Text} from '../../components/text';
import {PhoneField} from '../../components/phone-field';
//import {CodeField} from '../../components/code-field';
import {Screen} from '../../components/screen';
import {color, styles, font, imgLogo, backgroundImages, typography} from '../../theme';

import {SM, XSM, sanitizeNumber} from '../../utils/helpers';
import Config from 'react-native-config';
import OtpInputs from 'react-native-otp-inputs';
import {style} from './style';
import {sendCode, verifyCode} from '../../store/actions/verification';
import {MIN_PASSWORD_LENGTH} from '../../store/constants';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {diags} from '../../utils/debug';
import {Switch} from '../../components/switch';

const stateProps = state => ({
  status: state.verification,
});

const actionProps = (dispatch, ownProps) => ({
  onSendCode: payload => dispatch(sendCode(payload)),
  onVerifyCode: payload => dispatch(verifyCode(payload)),
});

export const VerificationScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    componentWillReceiveProps(props) {
      console.tron.log(props);
      if (props.status.code_verified) {
        console.tron.log(
          'code verified, navigating to registration setup screen',
        );
        this.props.navigation.navigate('register');
      } else {
        if (props.status.error && !this.state.error) {
          console.tron.log('code error');
          this.setState({
            sending_code: false,
            verifying: false,
          });
          showMessage({
            message: props.status.error,
            backgroundColor: color.error_message,
            color: color.white,
          });
        } else if (props.status.last_code_sent) {
          this.setState({
            sending_code: false,
          });
        }
      }
    }
    componentDidMount(){
      this.interval = setInterval(
        () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
        1000
      );
    }
    componentDidUpdate(){
      if(this.state.timer === 1){ 
        clearInterval(this.interval);
      }
    }

    componentWillUnmount(){
      clearInterval(this.interval);
    }

    constructor(props) {
      super(props);

      this.state = {
        phone: '',
        code: '',
        sending_code: false,
        verifying: false,
        error: '',
        timer:50,
      };

      this.onChangePhone = value => this.setState({phone: value, error: ''});

      this.onChangeCode = value => this.setState({code: value, error: ''});

      this.sendCode = () => {
        this.setState({sending_code: true});
        // const {phone} = this.state;
        // const payload = {number: sanitizeNumber(phone)};
        const payload = {};
        this.props.onSendCode(payload);
      };

      this.verifyCode = () => {
        this.setState({sending_code: false, verifying: true});
        const {code} = this.state;
        const payload = {code};
        this.props.onVerifyCode(payload);
        // this.props.navigation.navigate('registerPending');
      };
      this.sendCode();

    }

    render() {
      const {phone, sending_code, verifying} = this.state;
      const {last_code_sent} = this.props.status;
      const preset = 'fixed';
      return (
        <View testID="VerificationScreen" style={styles.FULL}>
          <Screen style={styles.CONTAINER_PADDED} preset={preset}>
            <Image
              source={backgroundImages.SignIn}
              style={style.WELCOME_IMAGE}
            />

            <Header background={false} />
            <View style={style.VFLEX_PADDED}>
             
              {/* <Header /> */}
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
                <View style={style.OTP}>
                  <Text style={style.VERIFY_PIN} text="Verify Pin" />
                  <Text
                    style={styles.PAGE_HEADER_SUB}
                    text="Please enter the code you received in email."
                  />
                  <View style={style.OTP_CONTAINER}>
                    <OtpInputs
                      handleChange={this.onChangeCode}
                      numberOfInputs={6}
                      inputContainerStyles={style.OTP_TEXT_FIELD}
                      focusStyles={style.OTP_HIGHLIGHT}
                      keyboardType="phone-pad"
                    />

                    {/* <View>
                      <View>
                        <Button
                          style={{
                            // position: 'absolute',
                            top: 20,
                            right: 10,
                            justifyContent: 'center',
                            borderRadius: 30,
                            paddingVertical: 10,
                          
                            // color:color.secondary
                          }}
                          text="Sign in"
                          textStyleOverride={
                            styles.TOP_RIGHT_CORNER_BUTTON_TEXT
                          }
                          onPress={this.logIn}
                        />
                      </View>
                      <Text></Text>
                    </View> */}

                    <View style={style.ACCEPT_SWITCH}>
                      <Button
                        style={style.RESEND_BUTTON}
                        text="Resend Pin"
                        textStyle={style.RESEND_BUTTON_TEXT}
                        onPress={this.logIn}
                      />
                      <View style={style.SWITCH}>
                        <Text style={style.SWITCH_TEXT}>
                          00:{this.state.timer} Remain
                        </Text>
                      </View>
                    </View>

                    {/* <View style={style.ACCEPT_SWITCH}>
                      <View style={style.SWITCH}>
                        <Text style={style.SWITCH_TEXT}>I agree to the</Text>
                        <Link
                          url=""
                          text="Terms & Conditions"
                          labelStyle={style.TERMS_LINK}
                        />
                      </View>
                      <Switch />
                    </View> */}
                  </View>
                </View>

                <View>
                  <ButtonFullWidth
                    style={styles.NO_RADIUS}
                    preset="primary"
                    text="Next"
                    onPress={this.verifyCode}
                    disabled={sending_code || verifying}
                    loading={verifying}
                  />
                </View>
              </View>
              {/* <View style={style.CONTAINER}>
                <Text preset="message">
                  Please enter your phone number below for verification.
                </Text>
                <PhoneField
                  label={last_code_sent ? 'RESEND' : 'SEND'}
                  labelColor={last_code_sent ? color.secondary : color.primary}
                  onChangeText={this.onChangePhone}
                  onSubmit={this.sendCode}
                  maxLength={20}
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={phone}
                  keyboardType="phone-pad"
                  loading={sending_code}
                  disabled={sending_code}
                /> 
              </View>*/}
              {/* {last_code_sent && (  
              <View style={style.OTP}>
                <Text style={styles.PAGE_HEADER_HEADING} text="ENTER CODE" />
                <Text
                  style={styles.PAGE_HEADER_SUB}
                  text="Please enter the code you received."
                />
                <View style={style.OTP_CONTAINER}>
                  <OtpInputs
                    handleChange={this.onChangeCode}
                    numberOfInputs={6}
                    inputContainerStyles={style.OTP_TEXT_FIELD}
                    focusStyles={style.OTP_HIGHLIGHT}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            )} */}
              {/* {last_code_sent && (  
              <View style={styles.FOOTER_VIEW}>
                <Button
                  preset="primary"
                  text="Sign Up Now"
                  onPress={this.verifyCode}
                  icon="next"
                  disabled={sending_code || verifying}
                  loading={verifying}
                />
              </View>
              )} */}
            </View>
          </Screen>
        </View>
      );
    }
  },
);
