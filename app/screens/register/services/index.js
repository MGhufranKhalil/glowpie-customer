import * as React from 'react';
import {
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Picker,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Button} from '../../../components/button';
import {Checkbox} from '../../../components/checkbox';
import {Header} from '../../../components/header';
import {Icon} from '../../../components/icon';
import {Link} from '../../../components/link';
import {Text} from '../../../components/text';
import {TextField} from '../../../components/text-field';
import {SelectInput} from '../../../components/select-field';
import {Screen} from '../../../components/screen';
import {color, font, styles, icons, servicePlaceholder} from '../../../theme';
import {SM, XSM, sanitizeNumber, imageUrl} from '../../../utils/helpers';
import {minutesToHours} from '../../../utils/app';
import Config from 'react-native-config';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {addressValidator} from '../../../store/validators/registration';
import {style} from './style';
import {deleteService} from '../../../store/actions/services';
import {doLogin} from '../../../store/actions/login';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {diags} from '../../../utils/debug';
import {serviceModel} from '../../../models';
import {SERVICE_TYPES} from '../../../store/constants';

const stateProps = state => ({
  services: state.vendor.services,
});

const actionProps = (dispatch, ownProps) => ({
  onDeleteService: id => dispatch(deleteService(id)),
});

export const RegisterServicesScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    constructor(props) {
      super(props);

      // don't need to use state here
      this.selectedService = null;

      this.handleBackButton = () => this.props.navigation.pop();
      this.addService = () => this.props.navigation.push('editService');
      this.deleteService = () => {
        this.props.onDeleteService(this.selectedService);
        this.RBSheet.close();
      };
      this.onCancel = () => {
        this.selectedService = null;
      };
    }

    renderService(id, service) {
      // console.tron.log(service, SERVICE_TYPES[service.industry_id]);
      const param = {id};
      const editService = () =>
        this.props.navigation.push('editService', param);
      const deleteFn = () => {
        this.selectedService = id;
        this.RBSheet.open();
      };
      const imageStyle = service.image
        ? style.REAL_IMAGE
        : style.PLACEHOLDER_IMAGE;
      const image = service.image
        ? imageUrl(service.image)
        : servicePlaceholder;
      return (
        <View style={style.SERVICE}>
          <View style={style.SERVICE_IMAGE}>
            <Image source={image} style={imageStyle} />
          </View>
          <View style={style.CATEGORY}>
            <Text text="Category:" />
            <View style={style.CATEGORY_SEP} />
            <Text
              text={SERVICE_TYPES[service.industry_id]}
              style={style.CATEGORY_NAME}
            />
          </View>
          <Text text={service.service_name} style={style.SERVICE_NAME} />
          <View style={style.ICONS}>
            <View style={style.ROW}>
              <Image source={icons.datetime} style={style.ICON} />
              <Text
                text={minutesToHours(service.duration)}
                style={style.ICON_TEXT}
              />
            </View>
            <View style={style.ROW}>
              <Image source={icons.currency} style={style.ICON} />
              <Text
                text={`${service.currency} ${service.price}`}
                style={style.ICON_TEXT}
              />
            </View>
            <View style={style.ROW}>
              <Icon
                icon="delete_service"
                style={style.ACTION_ICON}
                onClick={deleteFn}
              />
              <Icon
                icon="edit_service"
                style={style.ACTION_ICON}
                onClick={editService}
              />
            </View>
          </View>
        </View>
      );
    }

    render() {
      const {services} = this.props;
      const preset = 'fixed';
      console.tron.log(
        'render register services screen',
        this.props,
        this.state,
      );
      return (
        <View testID="RegisterServicesScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset={preset}>
            <View style={style.VFLEX}>
              <Header
                mode="big"
                heading="Business Services"
                sub="You can edit your services anytime"
                onBack={this.handleBackButton}
                shadow
              />
              <ScrollView style={style.SERVICES_LIST}>
                {Object.keys(services).map(k =>
                  this.renderService(k, services[k]),
                )}
                <View style={style.SERVICE_PADDING} />
              </ScrollView>
              <Button
                style={style.ADD_SERVICE_BUTTON}
                onPress={this.addService}>
                <Image
                  source={icons.add_service}
                  style={style.ADD_SERVICE_ICON}
                />
              </Button>
              <View style={styles.FOOTER_VIEW}>
                <Button
                  testID="save-button"
                  preset="primary"
                  text="Done"
                  onPress={this.handleBackButton}
                  icon="next"
                />
              </View>
              <RBSheet
                ref={ref => {
                  this.RBSheet = ref;
                }}
                height={120}
                duration={250}
                onClose={this.onCancel}>
                <View style={style.RBSHEET_CONTAINER}>
                  <Icon icon={icons.confirm} />
                  <Text
                    text="Are you sure you want to delete this service?"
                    style={style.DELETE_CONFIRM_TEXT}
                  />
                  <Button
                    style={style.DELETE_CONFIRM_BUTTON}
                    testID="delete-button"
                    text="Confirm"
                    onPress={this.deleteService}
                  />
                </View>
              </RBSheet>
            </View>
          </Screen>
        </View>
      );
    }
  },
);
