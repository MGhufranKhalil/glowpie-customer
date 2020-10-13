import * as React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {Button, ButtonFullWidth} from '../../components/button'; 
import {Header} from '../../components/header'; 
import {Text} from '../../components/text'; 
//import {CodeField} from '../../components/code-field';
import {Screen} from '../../components/screen';
import {color, styles, font, imgLogo, backgroundImages, typography} from '../../theme';
  
import OtpInputs from 'react-native-otp-inputs';
import {style} from './style';
import {sendCode, verifyCode} from '../../store/actions/verification';
import { TIMER, twoDigits} from '../../store/constants';
import {showMessage, hideMessage} from 'react-native-flash-message'; 

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
    componentDidMount(){
      this.restartTimer();
      this.sendCode();
    }
    componentDidUpdate(){
      if(this.state.timer === 0){ 
        clearInterval(this.interval);
        this.sendCode;
      }
    }
    restartTimer() {
      this.interval = setInterval(
        () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
        1000
      );
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
        timer: TIMER,
      };

      this.onChangePhone = value => this.setState({phone: value, error: ''});

      this.onChangeCode = value => this.setState({code: value, error: ''});

      this.sendCode = () => {
        this.setState({ sending_code: true, timer: TIMER }); 
        const payload = {};
        this.props.onSendCode(payload);
      };
      this.resendButton = () => {
        if(this.state.timer == 0){
          this.sendCode();
          this.restartTimer();
        }
         
        
      }

      this.verifyCode = () => {
        this.setState({sending_code: false, verifying: true});
        const {code} = this.state;
        const payload = {code};
        this.props.onVerifyCode(payload);
        // this.props.navigation.navigate('registerPending');
      };
      this.resendBtnUI = () => {
        const {  timer } = this.state;
        
        return (
          <View>
            {
              timer > 0 &&
              <Button
                style={[style.RESEND_BUTTON_COLOR, { backgroundColor: color.gray }]}
                text="Resend Pin"
                textStyle={style.RESEND_BUTTON_TEXT}
                onPress={this.resendButton}
                disabled={timer == 0 ? false : true}
              />
            }

            {
              timer == 0 &&
              <Button
                style={[style.RESEND_BUTTON_COLOR, { backgroundColor: '#ffbadc' }]}
                text="Resend Pin"
                textStyle={style.RESEND_BUTTON_TEXT}
                onPress={this.resendButton}
                disabled={timer == 0 ? false : true}
              />
            }
          </View>
        )
         
      }
 
    }

    render() {
      const { phone, sending_code, verifying, timer } = this.state;
      const {last_code_sent} = this.props.status;
      const preset = 'scroll';

      return (
        <View testID="VerificationScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset={preset}>
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

                     

                    <View style={style.ACCEPT_SWITCH}>
                      {this.resendBtnUI()}
                      <View style={style.SWITCH}>
                        <Text style={style.SWITCH_TEXT}>
                          00:{twoDigits(timer)} Remain
                        </Text>
                      </View>
                    </View>

                    
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
               
            </View>
          </Screen>
        </View>
      );
    }
  },
);
