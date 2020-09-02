import * as React from 'react';
import {
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Picker,
  Dimensions,
  TouchableOpacity,
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
import {SelectInput, SelectField} from '../../../components/select-field';
import {Screen} from '../../../components/screen';
import {color, font, styles, icons, servicePlaceholder} from '../../../theme';
import {
  SM,
  XSM,
  sanitizeNumber,
  imageUrl,
  arrayToSelect,
} from '../../../utils/helpers';
import Config from 'react-native-config';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {addressValidator} from '../../../store/validators/registration';
import ImagePicker from 'react-native-image-picker';
import {style} from './style';
import {
  addService,
  updateService,
  uploadServiceImage,
} from '../../../store/actions/services';
import {doLogin} from '../../../store/actions/login';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {diags} from '../../../utils/debug';
import {serviceModel} from '../../../models';
import {SERVICE_TYPES, DURATIONS, CURRENCIES} from '../../../store/constants';

const serviceTypes = arrayToSelect(SERVICE_TYPES);
const durations = arrayToSelect(DURATIONS);
const currencies = arrayToSelect(CURRENCIES);

const progressCallback = progressEvent => {
  // console.tron.log('File upload progress', progressEvent);
  const percentFraction = progressEvent.loaded / progressEvent.total;
  const percent = Math.floor(percentFraction * 100);
};

const stateProps = state => ({
  services: state.vendor.services,
  error: state.vendor.error,
  lastUpdatedServiceId: state.vendor.lastUpdatedServiceId,
});

const actionProps = (dispatch, ownProps) => ({
  onAddService: payload => dispatch(addService(payload)),
  onUpdateService: (id, payload) => dispatch(updateService(id, payload)),
  uploadImage: payload => dispatch(uploadServiceImage(payload)),
});

export const EditServiceScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.serviceId = this.props.navigation.getParam('id', '');

      // adding or editing?
      this.state = {
        loading: false,
        uploading: false,
        newImage: null,
        ...serviceModel,
      };

      if (this.serviceId) {
        this.state = {
          ...this.state,
          ...props.services[this.serviceId],
        };
      }

      console.tron.log('edit service screen state', this.serviceId, this.state);

      this.handleBackButton = () => this.props.navigation.pop();

      this.pickImage = this.pickImage.bind(this);

      this.onChangeServiceType = value =>
        this.setState({industry_id: value, error: ''});
      this.onChangeServiceName = value =>
        this.setState({service_name: value, error: ''});
      this.onChangeDuration = value =>
        this.setState({duration: value, error: ''});
      this.onChangePrice = value => this.setState({price: value, error: ''});
      this.onChangeCurrency = value =>
        this.setState({currency: value, error: ''});

      this.updateService = () => {
        const {loading, uploading, vs_id, ...service} = this.state;
        // strip unwanted values from service payload
        const {
          vs_id: vsid,
          image,
          newImage,
          created_at,
          updated_at,
          vendor_id,
          created_by,
          status,
          ...payload
        } = service;
        this.setState({
          loading: true,
        });
        if (this.serviceId) {
          this.props.onUpdateService(this.serviceId, payload);
        } else {
          this.props.onAddService(payload);
        }
      };
    }

    componentWillReceiveProps(props) {
      // service saved/updated successufully
      if (
        this.state.loading &&
        Object.keys(props.services).length &&
        !props.error
      ) {
        // save newly saved service
        if (!this.serviceId) {
          this.serviceId = props.lastUpdatedServiceId;
        }
        this.setState({
          loading: false,
        });
        if (this.state.newImage) {
          // try to upload the selected image
          this.updateImageAfterSave();
        } else {
          // just show success message and return
          showMessage({
            message: this.serviceId
              ? 'Service updated'
              : 'New service successfully created',
            backgroundColor: color.notice,
            color: color.white,
          });
          // setTimeout(() => this.props.navigation.pop(), 100);
        }
      } else if (this.state.loading && props.error) {
        this.setState({
          loading: false,
          uploading: false,
        });
        showMessage({
          message: props.error,
          backgroundColor: color.error_message,
          color: color.white,
        });
      } else if (this.state.uploading && !props.error) {
        this.setState({
          uploading: false,
          image: props.services[this.serviceId].image,
        });
        // after new service is created, this.serviceId will get populated,
        // so we have to use route to figure out if we were creating new service
        const updatingService = this.props.navigation.getParam('id', '');
        showMessage({
          message: updatingService
            ? 'Service updated'
            : 'New service successfully created',
          backgroundColor: color.notice,
          color: color.white,
        });
        // setTimeout(() => this.props.navigation.pop(), 100);
      } else if (this.state.uploading && props.error) {
        this.setState({
          uploading: false,
          image: props.services[this.serviceId].image,
        });
        showMessage({
          message: props.error,
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
    }

    pickImage() {
      const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, response => {
        console.tron.log('Selected image', response.uri);

        if (response.didCancel) {
          console.tron.log('User cancelled image picker');
        } else if (response.error) {
          console.tron.log('ImagePicker Error: ', response.error);
          showMessage({
            message:
              response.error ||
              'Error occured while selecting image for upload',
            backgroundColor: color.error_message,
            color: color.white,
          });
        } else if (response.customButton) {
          // console.tron.log('User tapped custom button: ', response.customButton);
        } else {
          // const source = {uri: response.uri};
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          // @@TODO: validate the selected image here?
          // immediate image upload only works for existing service
          // if adding new services, first have to save service then upload image
          this.setState({
            newImage: {
              uri: response.uri,
              fileName: response.fileName,
            },
            image: {uri: response.uri, isStatic: true},
          });
        }
      });
    }

    updateImageAfterSave() {
      const {newImage} = this.state;
      this.setState({
        uploading: true,
      });
      this.props.uploadImage(
        {
          id: this.serviceId,
          image: newImage.uri,
          filename: newImage.fileName,
          callback: progressCallback,
        },
        {},
      );
    }

    renderForm(service) {
      const {
        industry_id,
        service_name,
        service_details,
        duration,
        price,
        currency,
        loading,
        uploading,
      } = this.state;
      console.tron.log('edit service form', this.state);
      let {image} = this.state;
      const imageStyle =
        image && !uploading ? style.REAL_IMAGE : style.PLACEHOLDER_IMAGE;
      const text = image ? null : (
        <Text
          text={uploading ? 'UPLOADING...' : 'UPLOAD YOUR SERVICE IMAGE'}
          style={style.SERVICE_IMAGE_TEXT}
        />
      );
      image = image && !uploading ? imageUrl(image) : servicePlaceholder;
      console.tron.log('edit service image', image);

      const ImageComponent =
        loading || uploading ? (
          <Image source={image} style={imageStyle} />
        ) : (
          <TouchableOpacity onPress={this.pickImage} activeOpacity={0.7}>
            <Image
              source={image}
              style={imageStyle}
              loadingIndicatorSource={servicePlaceholder}
            />
          </TouchableOpacity>
        );

      const Component = SM ? ScrollView : View;
      return (
        <Component style={style.SERVICE_FORM}>
          <View style={style.SERVICE_IMAGE}>
            {ImageComponent}
            {text}
          </View>
          <SelectField
            label="SELECT CATEGORY"
            options={serviceTypes}
            onChange={this.onChangeServiceType}
            value={industry_id ? `${industry_id}` : '1'}
          />
          <TextField
            label="SERVICE NAME"
            onChangeText={this.onChangeServiceName}
            maxLength={60}
            value={service_name}
          />
          <SelectField
            label="DURATION"
            options={durations}
            onChange={this.onChangeDuration}
            value={`${duration}`}
            number
          />
          <View style={style.DOUBLE_SELECT}>
            <SelectField
              label="CURRENCY"
              options={currencies}
              onChange={this.onChangeCurrency}
              value={currency}
              containerStyle={style.DOUBLE_SELECT_LIST}
            />
            <TextField
              label="PRICE"
              onChangeText={this.onChangePrice}
              value={`${price}`}
              containerStyle={style.DOUBLE_SELECT_INPUT}
              keyboardType="number-pad"
            />
          </View>
        </Component>
      );
    }

    render() {
      const {loading, uploading} = this.state;
      const preset = 'scroll';
      console.tron.log('render edit service screen', this.props, this.state);
      return (
        <View testID="RegisterServicesScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset={preset}>
            <View style={style.VFLEX}>
              <Header
                title="Service Detail"
                onBack={this.handleBackButton}
                shadow
              />
              {this.renderForm()}
              <View style={styles.FOOTER_VIEW}>
                <Button
                  testID="save-button"
                  preset="primary"
                  text="Done"
                  onPress={this.updateService}
                  icon="next"
                  disabled={loading || uploading}
                  loading={loading || uploading}
                />
              </View>
            </View>
          </Screen>
        </View>
      );
    }
  },
);
