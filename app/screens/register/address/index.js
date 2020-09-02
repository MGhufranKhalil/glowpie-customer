import * as React from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Picker,
  Dimensions,
  BackHandler,
} from 'react-native';
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
import {color, font, styles, imgMapMarker} from '../../../theme';
import {SM, XSM, sanitizeNumber} from '../../../utils/helpers';
import Config from 'react-native-config';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {addressValidator} from '../../../store/validators/registration';
import {style} from './style';
import {registerAddress} from '../../../store/actions/registration';
import {doLogin} from '../../../store/actions/login';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {diags} from '../../../utils/debug';

const stateProps = state => ({
  account: state.registration,
  vendor: state.vendor,
});

const actionProps = (dispatch, ownProps) => ({
  onRegisterAddress: payload => dispatch(registerAddress(payload)),
});

export const RegisterAddressScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        ...props.vendor.address,
        latitude: 0,
        longitude: 0,
        loading: false,
        error: '',
        show_map: false,
        tip_shown: false,
      };

      this.onChangeStreet = value =>
        this.setState({address_line1: value, error: ''});
      this.onChangeShopNo = value =>
        this.setState({address_line2: value, error: ''});
      this.onChangeCity = value => this.setState({city: value, error: ''});
      this.onChangeZipCode = value =>
        this.setState({postal_code: value, error: ''});
      this.onRegister = () => {
        this.setState({loading: true});
        const {
          address_line1,
          address_line2,
          city,
          postal_code,
          latitude,
          longitude,
        } = this.state;
        const payload = {
          address_line1,
          address_line2,
          city,
          postal_code,
          latitude,
          longitude,
        };
				console.tron.log(payload);
        this.props.onRegisterAddress(payload);
      };
      this.onShowMap = this.onShowMap.bind(this);
      this.onMapMarkerChanged = this.onMapMarkerChanged.bind(this);

      this.onConfirm = () => {
        const {show_map} = this.state;
        console.tron.log('address confirm', show_map);
        if (show_map) {
          this.onRegister();
        } else {
          this.onShowMap();
        }
      };

      // when viewing map, pressing back should bring back to the form
      this.handleBackButton = () => {
        this.setState({show_map: false, loading: false});
        /*if (this.props.navigation.isFocused()) {
          this.setState({show_map: false, loading: false});
          return true;
        }
        return false;*/
      };

      Geocoder.init(Config.GOOGLE_MAPS_API_KEY);
    }

    /*componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButton,
      );
    }*/

    componentWillReceiveProps(props) {
      if (props.account.registered_address && this.state.loading) {
        this.setState({
          loading: false,
        });
        setTimeout(() => this.props.navigation.pop(2), 500);
        return;
      } else if (props.account.error && !this.state.error) {
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

    onShowMap() {
      const {
        address_line1,
        address_line2,
        city,
        postal_code,
        latitude,
        longitude,
        tip_shown,
      } = this.state;
      const payload = {
        address_line1,
        address_line2,
        city,
        postal_code,
        latitude,
        longitude,
      };
      const errors = addressValidator(payload);
      if (errors && errors.length) {
        showMessage({
          message: errors[0],
          backgroundColor: color.error_message,
          color: color.white,
        });
      } else {
        this.setState({loading: true, error: ''});
        const address = `${address_line1} ${address_line2} ${city} ${postal_code}`;
        console.tron.log('Showing map for address', address);
        Geocoder.from(address)
          .then(json => {
            const location = json.results[0].geometry.location;
            console.tron.log('Got map co-ordinates from geolocation', location);
            this.setState({
              latitude: location.lat,
              longitude: location.lng,
              show_map: true,
              loading: false,
              error: '',
              tip_shown: true,
            });

            // show a tip first time map is shown
            if (!tip_shown) {
              setTimeout(
                () =>
                  showMessage({
                    message:
                      'Drag the marker to select exact shop location on map',
                    backgroundColor: color.notice,
                    color: color.white,
                    duration: 3000,
                  }),
                1000,
              );
            }
          })
          .catch(error => {
            console.tron.log(error);
            this.setState({
              loading: false,
            });
            showMessage({
              message: 'Map could not be shown, address not found',
              backgroundColor: color.error_message,
              color: color.white,
            });
          });
      }
    }

    onMapMarkerChanged(ev) {
      console.tron.log('map marker changed');
      const {nativeEvent} = ev;
      this.setState({
        latitude: nativeEvent.coordinate.latitude,
        longitude: nativeEvent.coordinate.longitude,
      });
    }

    renderForm() {
      const {address_line1, address_line2, city, postal_code} = this.state;
      return (
        <View style={style.CONTAINER}>
          <TextField
            label="STREET"
            onChangeText={this.onChangeStreet}
            maxLength={120}
            value={`${address_line1}`}
            icon="map_pin"
          />
          <TextField
            label="SHOP NUMBER"
            onChangeText={this.onChangeShopNo}
            autoCorrect={false}
            value={`${address_line2}`}
            icon="business"
            maxLength={100}
          />
          <TextField
            label="CITY"
            onChangeText={this.onChangeCity}
            autoCorrect={false}
            value={`${city}`}
            icon="map_pin"
            maxLength={50}
          />
          <TextField
            label="ZIP CODE"
            onChangeText={this.onChangeZipCode}
            autoCorrect={false}
            autoCapitalize={false}
            value={`${postal_code}`}
            icon="zipcode"
            maxLength={20}
          />
        </View>
      );
    }

    renderMap() {
      const {business} = this.props.vendor;
      const {
        address_line1,
        address_line2,
        city,
        postal_code,
        latitude,
        longitude,
      } = this.state;
      const address = `${address_line1} ${address_line2} ${city} ${postal_code}`;
      const coords = {latitude, longitude};
      const camera = {
        center: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
        pitch: 0,
        heading: 0,
        //latitudeDelta: Number(Config.MAP_DEFAULT_LATITUDE_DELTA),
        //longitudeDelta: Number(LONGITUDE_DELTA),
        altitude: 400,
        zoom: 12,
      };
      return (
        <View style={style.MAP_CONTAINER}>
          <MapView
            ref={ref => (this.map = ref)}
            style={style.MAP}
            initialCamera={camera}
            zoomEnabled={true}
            zoomTapEnabled={false}
            zoomControlEnabled={true}
            rotateEnabled={true}
            cacheEnable={true}>
            <Marker
              coordinate={coords}
              image={imgMapMarker}
              draggable
              style={style.MAP_MARKER}
              onDragEnd={this.onMapMarkerChanged}
            />
          </MapView>
          <View style={style.MAP_INFO}>
            <Text text={business.business_name} style={style.MAP_INFO_TITLE} />
            <Text text={address} />
          </View>
        </View>
      );
    }

    render() {
      const {loading, show_map} = this.state;
      const preset = 'scroll';
      return (
        <View testID="RegisterAddressScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset={preset}>
            <View style={style.VFLEX_PADDED}>
              <Header
                mode="big"
                heading="Your business Address"
                sub={
                  show_map
                    ? 'Select Geographical Location'
                    : 'Enter address information below'
                }
                progress="70"
                onBack={show_map ? this.handleBackButton : null}
              />
              {!show_map && this.renderForm()}
              {show_map && this.renderMap()}
              <View style={styles.FOOTER_VIEW}>
                <Button
                  testID="signup-button"
                  preset="primary"
                  text="Confirm"
                  onPress={this.onConfirm}
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
