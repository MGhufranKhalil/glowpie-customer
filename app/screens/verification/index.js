import * as React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {Button} from '../../components/button';
import {Checkbox} from '../../components/checkbox';
import {Header} from '../../components/header';
import {Icon} from '../../components/icon';
import {Link} from '../../components/link';
import {Text} from '../../components/text';
import {PhoneField} from '../../components/phone-field';
//import {CodeField} from '../../components/code-field';
import {Screen} from '../../components/screen';
import {color, styles, font, imgLogo} from '../../theme';
import {SM, XSM, sanitizeNumber} from '../../utils/helpers';
import Config from 'react-native-config';
import OtpInputs from 'react-native-otp-inputs';
import {style} from './style';
import {sendCode, verifyCode} from '../../store/actions/verification';
import {MIN_PASSWORD_LENGTH} from '../../store/constants';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {diags} from '../../utils/debug';

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
        this.props.navigation.navigate('loading');
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

    constructor(props) {
      super(props);

      this.state = {
        phone: '',
        code: '',
        sending_code: false,
        verifying: false,
        error: '',
      };

      this.onChangePhone = value => this.setState({phone: value, error: ''});

      this.onChangeCode = value => this.setState({code: value, error: ''});

      this.sendCode = () => {
        this.setState({sending_code: true});
        const {phone} = this.state;
        const payload = {number: sanitizeNumber(phone)};
        this.props.onSendCode(payload);
      };

      this.verifyCode = () => {
        this.setState({sending_code: false, verifying: true});
        const {code} = this.state;
        const payload = {code};
        this.props.onVerifyCode(payload);
      };
    }

    render() {
      const {phone, sending_code, verifying} = this.state;
      const {last_code_sent} = this.props.status;
      const preset = 'scroll';
      return (
        <View testID="VerificationScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset={preset}>
            <View style={style.VFLEX_PADDED}>
              <Header
                mode="big"
                heading="Let's Verify Your Number"
                sub="Enter required information below to complete verification"
                progress="40"
                headingSize={SM ? font.h2 - 4 : font.h2 - 2}
                noBack
              />
              <View style={style.CONTAINER}>
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
              </View>
              {last_code_sent && (
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
              )}
              {last_code_sent && (
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
              )}
            </View>
          </Screen>
        </View>
      );
    }
  },
);
