import * as React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Button, ButtonFullWidth} from '../../components/button'; 
import {Header} from '../../components/header'; 
import {Text} from '../../components/text'; 
import { Screen } from '../../components/screen';
import { CustomModal } from '../../components/modal';
import {color, styles, font, imgLogo, backgroundImages, typography} from '../../theme';
import { TextField, TextFieldPasswordOne } from '../../components/text-field';
import {decideInitialScreen} from '../../utils/app';

import {style} from './style';
import { sendNewPassword } from '../../store/actions/forgotpassword';
import {showMessage} from 'react-native-flash-message'; 

const stateProps = state => ({
  status: state,
  vendor: state.vendor,

});

const actionProps = (dispatch, ownProps) => ({
  onSendNewPassword: payload => dispatch(sendNewPassword(payload)),
});

export const ResetPasswordScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    
    componentWillReceiveProps(props) {

      if (props.status.forgotpassword.password_sent) {
        console.tron.log(
          'password sent, navigating to sucess screen screen', props
        );
        this.setState({
          inputDisabled: false,
          loading: false,
        });
        showMessage({
          message: 'Password has been Changed',
          backgroundColor: color.notice,
          color: color.white,
        });
        this.props.navigation.navigate(decideInitialScreen(props.vendor));
        return;
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
        password: '',
        new_password: '',
        password_sent: false,
        loading: false,
        inputDisabled: false,
        error: '', 
      };

      this.onChangePassword = value => this.setState({ password: value, error: '' });
      this.onChangeNewPassword = value => this.setState({ new_password: value, error: ''});

      this.sendNewPassword = () => {
        this.setState({ loading: true, inputDisabled: true });
        const { password, new_password  } = this.state;
        const payload = { password, new_password };
        this.props.onSendNewPassword(payload);
      };
       
    }
     
     
    render() {
      const { password, new_password, loading, inputDisabled } = this.state;
      const preset = 'scroll';

      return (
        <View testID="RegisterAddressScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset={preset}>
            <View style={style.VFLEX_PADDED}>
              <Header
                mode="big"
                heading="Reset Password"
                shadow={true}
              />
              <View style={style.CONTAINER}>
                <Text preset="h3" style={{ fontWeight: 'bold' }}>Reset Password </Text>
                <Text preset="message">
                  Please reset your password by adding new password.
                </Text>
                <TextFieldPasswordOne
                  label="Old Password"
                  onChangeText={this.onChangePassword}
                  value={password}

                  maxLength={20}
                  autoCorrect={false}

                />
                <TextFieldPasswordOne
                  label="New Password"
                  onChangeText={this.onChangeNewPassword}
                  maxLength={20}
                  autoCorrect={false}
                  value={new_password}


                />
                 
              </View>
              <View style={styles.FOOTER_VIEW}>
                <ButtonFullWidth
                  style={styles.NO_RADIUS}
                  preset="primary"
                  text="Change Password"
                  onPress={this.sendNewPassword}
                  disabled={inputDisabled}
                  loading={loading}
                />
              </View>
            </View>
          </Screen>
        </View>
      );
    }
  },
);
