import * as React from 'react';
import {View, Image, ActivityIndicator, Picker} from 'react-native';
import {connect} from 'react-redux';
import {Button} from '../../../components/button';
import {Checkbox} from '../../../components/checkbox';
import {Header} from '../../../components/header';
import {Icon} from '../../../components/icon';
import {Link} from '../../../components/link';
import {Text} from '../../../components/text';
import {TextField} from '../../../components/text-field';
import {SelectInput} from '../../../components/select-field';
import {Screen} from '../../../components/screen';
import {color, font, styles} from '../../../theme';
import {SM, XSM, sanitizeNumber} from '../../../utils/helpers';
import Config from 'react-native-config';
import {style} from './style';
import {
  verificationComplete,
  registerBusiness,
} from '../../../store/actions/registration';
import {doLogin} from '../../../store/actions/login';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {diags} from '../../../utils/debug';

const numbers = [...Array(20).keys()].map(n => {
  return {
    value: `${n + 1}`,
    label: `${n + 1}`,
  };
});

const stateProps = state => ({
  account: state.registration,
  vendor: state.vendor,
});

const actionProps = (dispatch, ownProps) => ({
  onRegisterBusiness: payload => dispatch(registerBusiness(payload)),
  verificationComplete: () => dispatch(verificationComplete()),
  autoLogin: payload => dispatch(doLogin(payload)),
});

export const RegisterBusinessScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        ...props.vendor.business,
        loading: false,
        error: '',
      };

      this.onChangeBusinessName = value =>
        this.setState({business_name: value, error: ''});
      this.onChangeBusinessNumber = value =>
        this.setState({business_number: value, error: ''});
      this.onChangeAuNumber = value =>
        this.setState({australian_business_number: value, error: ''});
      this.onChangeCompanyNumber = value =>
        this.setState({company_number: value, error: ''});
      this.onChangeNumStations = value =>
        this.setState({no_of_seats: value, error: ''});
      this.onRegister = () => {
        this.setState({loading: true});
        const {
          business_name,
          business_number,
          company_number,
          australian_business_number,
          no_of_seats,
        } = this.state;
        const payload = {
          business_name,
          business_number: sanitizeNumber(business_number),
          company_number: sanitizeNumber(company_number),
          australian_business_number: sanitizeNumber(
            australian_business_number,
          ),
          no_of_seats: Number(no_of_seats) > 0 ? no_of_seats : 1,
        };
        this.props.onRegisterBusiness(payload);
      };
    }

    componentWillReceiveProps(props) {
      console.tron.log('business screen received props', props);
      if (props.account.registered_business && this.state.loading) {
        this.setState({
          loading: false,
        });
        this.props.navigation.push('registerAddress');
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

    componentDidMount() {
      this.props.verificationComplete();
      this.props.autoLogin({
        loginid: this.props.account.loginid,
        password: this.props.account.password,
      });
    }

    render() {
      const {
        business_name,
        business_number,
        company_number,
        australian_business_number,
        no_of_seats,
        loading,
      } = this.state;
      const preset = 'scroll';
      return (
        <View testID="RegisterBusinessScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset={preset}>
            <View style={style.VFLEX_PADDED}>
              <Header
                mode="big"
                heading="Let's Talk About Your Business"
                sub="Enter business information below"
                progress="60"
                headingSize={SM ? font.h2 - 6 : font.h2 - 4}
              />
              <View style={style.CONTAINER}>
                <TextField
                  label="Business Name"
                  onChangeText={this.onChangeBusinessName}
                  maxLength={50}
                  value={business_name}
                  icon="business"
                />
                <TextField
                  label="Business Number"
                  onChangeText={this.onChangeBusinessNumber}
                  autoCorrect={false}
                  autoCapitalize={false}
                  value={business_number}
                  icon="phone"
                  maxLength={14}
                  mask="(99)-9999-9999"
                  keyboardType="phone-pad"
                />
                <TextField
                  label="Australian Business Number"
                  onChangeText={this.onChangeAuNumber}
                  autoCorrect={false}
                  autoCapitalize={false}
                  value={australian_business_number}
                  icon="business"
                  maxLength={14}
                  mask="99-999-999-999"
                  keyboardType="phone-pad"
                />
                <TextField
                  label="Australian Company Number"
                  onChangeText={this.onChangeCompanyNumber}
                  autoCorrect={false}
                  autoCapitalize={false}
                  value={company_number}
                  icon="business"
                  maxLength={14}
                  mask="99-999-999-999"
                  keyboardType="phone-pad"
                />
                <View style={style.NUM_STATIONS}>
                  <Text
                    text="Select Number of Service Stations"
                    style={style.NUM_STATIONS_TEXT}
                  />
                  <SelectInput
                    options={numbers}
                    value={Number(no_of_seats) > 0 ? `${no_of_seats}` : '1'}
                    onChange={this.onChangeNumStations}
                    placeholder=""
                    title="Service stations"
                  />
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
