import * as React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Button, ButtonFullWidth} from '../../components/button'; 
import {Header} from '../../components/header'; 
import {Text} from '../../components/text'; 
import { Screen } from '../../components/screen';
import { CustomModal } from '../../components/modal';
import {color, styles, font, imgLogo, backgroundImages, typography} from '../../theme';
import { TextFieldBottom } from '../../components/text-field';

import {style} from './style';
import { sendPassword } from '../../store/actions/forgotpassword';
import {showMessage} from 'react-native-flash-message'; 

const stateProps = state => ({
  status: state,
});

const actionProps = (dispatch, ownProps) => ({
  onSendPassword: payload => dispatch(sendPassword(payload)),
  onVerifyCode: payload => dispatch(verifyCode(payload)),
});

export const ResetPasswordScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    
    componentWillReceiveProps(props) {
      if (props.status.forgotpassword.password_sent) {
        console.tron.log(
          'password sent, navigating to sucess screen screen',
        );
        this.setState({
          inputDisabled: false,
          loading: false,
        });
        /* showMessage({
          message: 'Password has been sent on your email',
          backgroundColor: color.notice,
          color: color.white,
        });
        this.props.navigation.navigate('forgotPasswordSucess'); */
        this.setModalVisible(true);
      } else {


        if (props.status.forgotpassword.error && !this.state.error) {
          console.tron.log('code error');
          this.setState({
            inputDisabled: false,
            loading: false,
          });
          showMessage({
            message: props.status.forgotpassword.error,
            backgroundColor: color.error_message,
            color: color.white,
          });
        }
      }
    }
     

    constructor(props) {
      super(props);

      this.state = {
        email: '',
        password_sent: false,
        loading: false,
        inputDisabled: false,
        modalVisible: false,
        error: '', 
      };

      this.onChangeEmail = value => this.setState({ email: value, error: ''});

      this.sendPassword = () => {
        this.setState({ loading: true, inputDisabled: true });
        const { email } = this.state;
        const payload = { email };
        this.props.onSendPassword(payload);
      };

      this.verifyCode = () => {
        this.setState({sending_code: false, verifying: true});
        const {code} = this.state;
        const payload = {code};
        this.props.onVerifyCode(payload);
      };
       
    }
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }
    getResponse = (result) => {
      if(result.button1){
        this.props.navigation.navigate('login');
      }
      this.setState({ modalVisible: result.modal });

    }
     
    render() {
      const { modalVisible, loading, inputDisabled } = this.state;
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
                <Text text="IF YOUR" style={styles.TEXT_HEADER} />
                <Text>
                  <Text text="Forgot" style={style.TEXT_BOLD} />
                  <Text text="  " style={styles.SEP} />
                  <Text text="Password" style={style.TEXT_BOLD} /> 
                </Text>
              </View>
              <View style={styles.FOOTER_VIEW_FULL}>
                <View style={style.OTP}>
                  <Text style={style.VERIFY_PIN} text="Enter Email" />
                 
                  <TextFieldBottom
                    label="EMAIL"
                    onChangeText={this.onChangeEmail}
                    maxLength={40}
                    autoCorrect={false}
                    autoCapitalize="none"
                    // icon="email"
                    keyboardType="email-address"
                  />
                   
                </View>

                <View>

                  

                    <CustomModal 
                      modalVisible={modalVisible} 
                      callback={this.getResponse.bind(this)}
                      icon="reset_pw"
                      title="Password Reset Successful"
                      message="You have successfully reset your password. new password has been sent on your Email Address. Please use your new password when logging in."
                      button1Label="Let's Sign in"
                    /> 
                  <ButtonFullWidth
                    style={styles.NO_RADIUS}
                    preset="primary"
                    text="Submit"
                    onPress={this.sendPassword}
                    disabled={inputDisabled}
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
