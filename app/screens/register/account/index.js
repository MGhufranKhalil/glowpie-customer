import * as React from 'react';
import {View, ScrollView, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {Button} from '../../../components/button';
import {Checkbox} from '../../../components/checkbox';
import {Header} from '../../../components/header';
import {Icon} from '../../../components/icon';
import {Link} from '../../../components/link';
import {Text} from '../../../components/text';
import {TextField} from '../../../components/text-field';
import {Switch} from '../../../components/switch';
import {Screen} from '../../../components/screen';
import {color, font, styles} from '../../../theme';
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
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        agree: false,
        loading: false,
        error: '',
      };

      this.onChangeFirstName = value =>
        this.setState({first_name: value, error: ''});
      this.onChangeLastName = value =>
        this.setState({last_name: value, error: ''});
      this.onChangeEmail = value => this.setState({email: value, error: ''});
      this.onChangePassword = value =>
        this.setState({password: value, error: ''});
      this.onChangeAccept = value => {
        hideMessage();
        this.setState({agree: value, error: ''});
      };

      this.onRegister = () => {
        this.setState({loading: true});
        const {first_name, last_name, email, password, agree} = this.state;
        const payload = {first_name, last_name, email, password, agree};
        this.props.onRegister(payload);
      };
    }

    render() {
      const {
        first_name,
        last_name,
        email,
        password,
        agree,
        loading,
      } = this.state;
      const preset = 'scroll';
      return (
        <View testID="RegisterAccountScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset={preset}>
            <View style={style.VFLEX_PADDED}>
              <Header
                mode="big"
                heading="Let's Sign Up Now"
                sub="Enter your account information below"
                progress="20"
              />
              <View style={style.CONTAINER}>
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
              </View>
              <View style={styles.FOOTER_VIEW}>
                <Button
                  testID="signup-button"
                  preset="primary"
                  text="Continue"
                  onPress={this.onRegister}
                  icon="next"
                  disabled={loading}
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
