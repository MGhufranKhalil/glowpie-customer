import * as React from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {Screen} from '../../../components/screen';
import {Header} from '../../../components/header';
import { Button, ButtonFullWidth, ButtonRadio} from '../../../components/button';
import {TextFieldBottom} from '../../../components/text-field';

import {Text} from '../../../components/text';
import ImagePicker from 'react-native-image-picker';
import {
  color,
  spacing,
  styles,
  icons,
  signupBusinessDetails,
  signupHoursDetails,
  signupServicesDetails,
  signupComplete,
  uploadImage,
  backgroundImages,
  femaleButtonUnactive,
  bigTick,
} from '../../../theme';
import {uploadVendorImage} from '../../../store/actions/vendor';
import {capitalizeFirstLetter, SW, imageUrl} from '../../../utils/helpers';
import {isVendorInfoComplete} from '../../../utils/app';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {style} from './style';
import {registerGeneral} from '../../../store/actions/registration';

import LinearGradient from 'react-native-linear-gradient';
/*
--- image selection response object ---
fileSize:3253337
fileName:IMG_0004.JPG
isVertical:true
latitude:64.752895
timestamp:2012-08-08T21:29:49Z
width:1668
data: ....
type: image/jpeg
origURL: assets-library://assets/.....
height:2500
uri: ...
longitude: -14.5362623626223
--------------------------------------
*/

const progressCallback = progressEvent => {
  console.tron.log('File upload progress', progressEvent);
  const percentFraction = progressEvent.loaded / progressEvent.total;
  const percent = Math.floor(percentFraction * 100);
};

const UploadButton = props => {
  const image = props.loading ? (
    <Image
      source={props.image}
      loadingIndicatorSource={uploadImage}
      style={props.style}
    />
  ) : (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
      <Image
        source={props.image}
        loadingIndicatorSource={uploadImage}
        style={props.style}
      />
    </TouchableOpacity>
  );
  return (
    <View style={style.UPLOAD_IMAGE_CONTAINER}>
      {image}
      {props.loading && (
        <Text text="Uploading..." style={style.UPLOAD_IMAGE_TEXT} />
      )}
      {!props.loading && (
        <View>
          <Text text="Upload image" style={style.UPLOAD_IMAGE_TEXT} />
          <Text text="Profile Photo" style={style.UPLOAD_IMAGE_SUBTEXT} />
        </View>
      )}
    </View>
  );
};
const stateProps = state => ({
  account: state.registration,
  vendor: state.vendor,
});
// const stateProps = state => ({
//   login: state.login,
//   vendor: state.vendor,
// });

const actionProps = (dispatch, ownProps) => ({
  onRegisterGeneral: payload => dispatch(registerGeneral(payload)),
  uploadImage: payload => dispatch(uploadVendorImage(payload)),
});

export const RegisterPendingScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    /* componentWillReceiveProps(props) {
      if (props.account.registered_general && this.state.loading) {
        this.setState({
          loading: false,
        });
        console.log('test');
        // setTimeout(() => this.props.navigation.pop(2), 500);
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
    } */
    constructor(props) {
      super(props);

      this.state = {
        uploading: false,
        loading: false,
        first_name: '',
        last_name: '',
        mm: '',
        dd: '',
        yyyy: '',
        date_of_birth: '',
        gender: 'male',
        infoComplete:false,
      };

      this.pickImage = this.pickImage.bind(this);

      this.onGenderChange = (male,female) => {
        if(male == 1 ){
          this.setState({gender: 'male'});
        }else if(female ==1){
          this.setState({gender: 'female'});
        }
      };
      this.onChangeFirstName = value => this.setState({first_name: value, error: ''});
      this.onChangeLastName = value => this.setState({last_name: value, error: ''});

      this.onChangeDobDD = value => this.setState({dd: value, error: ''});
      this.onChangeDobMM = value => this.setState({mm: value, error: ''});

      this.onChangeDobYYYY = (value) => {

        this.setState({yyyy: value, error: ''});

        this.setState({
          date_of_birth: value + '-' + this.state.mm + '-' + this.state.dd,
        });
      };

      this.onRegister = () => {
        const {first_name, last_name, date_of_birth, gender} = this.state;
        const payload = {first_name, last_name, date_of_birth, gender};
        this.state.loading = true;
        this.props.onRegisterGeneral(payload);
      };
    }

    componentWillReceiveProps(props) {
      console.log(this.state.loading);
      // image uplaoded successfully
      const {vendor} = this.props;
      console.log(props);
      console.log(vendor);
      
      if (props.vendor.account.image) {

        if (!vendor || vendor.account.image !== props.vendor.account.image) {
          console.tron.log('Vendor image uploaded/changed successfully');
          this.setState({
            uploading: false,
            loading: false,
          });
          showMessage({
            message: 'Image updated successfully',
            backgroundColor: color.notice,
            color: color.white,
          });
        }
        
      }

      if (props.account.registered_general && !props.account.error) {
        this.setState({
          loading: false,
          uploading: false,
          infoComplete:true
        });
        showMessage({
          message: 'General Information updated successfully',
          backgroundColor: color.notice,
          color: color.white,
        });
        // setTimeout(() => this.props.navigation.pop(), 100);
      } 
      
      if (props.account.error && this.state.loading) {
        this.setState({
          loading: false,
          uploading: false,
        });
        showMessage({
          message: props.account.error,
          backgroundColor: color.error_message,
          color: color.white,
        });
      }

      /* if (props.account.error) {
        this.setState({
          uploading: false,
          loading: false,
        });
        showMessage({
          message: props.account.error,
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
      
      if (!props.account.error) {
        // if (!vendor || vendor.account.image !== props.vendor.account.image) {
          console.tron.log('Customer general Information save successfully');
          this.setState({
            uploading: false,
            loading: false,
            // infoComplete:true
          });
          showMessage({
            message: 'General Information updated successfully',
            backgroundColor: color.notice,
            color: color.white,
          });
        // }
      } */
      // don't use else, because the previous image may already be there when error happens
      
    }

    pickImage() {
      const options = {
        title: 'Select Image',
        // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
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
          this.props.uploadImage(
            {
              image: response.uri,
              filename: response.fileName,
              callback: progressCallback,
            },
            {},
          );
          this.setState({
            // image: source,
            uploading: true,
          });
        }
      });
    }

    renderInfoComplete() {
      const {first_name} = this.props.account.general || {};
      const progressStyle = {
        ...style.PROGRESS,
        backgroundColor: color.primary,
      };
      return (
        <View style={style.SIGNUP_COMPLETE}>
          <Image source={signupComplete} style={style.IMAGE_TICK} />
          <Text
            style={styles.PAGE_HEADER_HEADING}
            text={`Hi ${capitalizeFirstLetter(first_name)},`}
          />
          <Text
            style={styles.PAGE_HEADER_SUB}
            text="Thank you for completing your profile."
          />
          <Text
            text="Click on the Continue button to start growing your business."
            style={style.CONTINUE_TEXT}
          />
          <View style={style.PROGRESS_CONTAINER}>
            <View style={style.PROGRESS} />
            <View style={progressStyle} />
            <Text style={style.PROGRESS_TEXT} text="100%" />
          </View>
          <Button
            testID="continue-button"
            preset="primary"
            text="Continue"
            onPress={() => this.props.navigation.navigate('home')}
            icon="next"
            style={style.CONTINUE_BUTTON}
          />
        </View>
      );
    }

    
     
    getResponse(result) {
      if (result.option1 == 1) {
        this.setState({ gender: 'male' });
      } else if (result.option2 == 1) {
        this.setState({ gender: 'female' });
      }
    }

    render() {
      const {first_name, last_name, mm, dd, yyyy, gender, loading} = this.state;
      const {vendor} = this.props; 
      const infoComplete = this.state.infoComplete; 
      let {image} = vendor.account;
      
      const {uploading} = this.state;
      const imageStyle =
        image && !uploading
          ? style.UPLOADED_IMAGE
          : uploading
          ? style.UPLOADING_IMAGE
          : style.UPLOAD_IMAGE;
      image = image && !uploading ? imageUrl(image) : uploadImage;
      
      const progress = 100;

      const progressStyle = {
        ...style.PROGRESS,
        backgroundColor: color.primary,
        width: progress,
      };
      if (infoComplete && this.renderInfoComplete()) {
        return (
          <View testID="RegPendingScreen" style={styles.FULL}>
            <Screen
              style={styles.CONTAINER}
              preset="fixed"
              backgroundColor={color.transparent}>
              <View style={style.VFLEX}>
                {infoComplete && this.renderInfoComplete()}
                {!infoComplete && (
                  <View style={style.PAGE_HEADER}>
                    <UploadButton
                      image={image}
                      loading={uploading}
                      onPress={this.pickImage}
                      style={imageStyle}
                    />
                    <Text
                      style={style.PAGE_HEADER_HEADING}
                      text={`Hi ${capitalizeFirstLetter(first_name)},`}
                    />
                    <Text
                      style={style.PAGE_HEADER_SUB}
                      text="To start offering your services to clients, please complete your profile details."
                    />
                    <View style={style.PROGRESS_CONTAINER}>
                      <View style={style.PROGRESS} />
                      <View style={progressStyle} />
                      <Text
                        style={style.PROGRESS_TEXT}
                        text={`${progressText}%`}
                      />
                    </View>
                  </View>
                )}
              </View>
            </Screen>
          </View>
        );
      }
      return (
        <View testID="RegPendingScreen" style={styles.FULL}>
          <Screen
            style={styles.CONTAINER_PADDED}
            preset="fixed"
            backgroundColor={color.transparent}>
            <Image
              source={backgroundImages.SignIn}
              style={style.WELCOME_IMAGE}
            />

                <Header background={false} />
            <View style={style.VFLEX_PADDED}>
              <View style={styles.PAGE_HEADER_WITH_BUTTON}>
              </View>
              {!infoComplete && (
                <View style={styles.FOOTER_VIEW_FULL}>
                  <View style={{padding: 15}}>
                    {/* <Text text="General Information" style={style.PERSONAL} /> */}
                    <Text
                      style={style.GENERAL_INFORMATION}
                      text="General Information"
                    />
                    <UploadButton
                      image={image}
                      loading={uploading}
                      onPress={this.pickImage}
                      style={imageStyle}
                    />
                    <View style={style.ACCEPT_SWITCH}>
                      <View style={{width: '49%'}}>
                        <TextFieldBottom
                          label="First Name"
                          onChangeText={this.onChangeFirstName}
                          maxLength={30}
                          autoCorrect={false}
                          value={first_name}
                          // icon="user"
                        />
                      </View>

                      <View style={{width: '49%'}}>
                        <TextFieldBottom
                          label="Last Name"
                          onChangeText={this.onChangeLastName}
                          maxLength={30}
                          autoCorrect={false}
                          value={last_name}
                          // icon="user"
                        />
                      </View>
                    </View>

                    <View style={style.ACCEPT_SWITCH}>
                      <View style={{width: '30%'}}>
                        <TextFieldBottom
                          label="Date of Birth"
                          onChangeText={this.onChangeDobMM}
                          maxLength={2}
                          autoCorrect={false}
                          autoCapitalize="none"
                          value={mm}
                          keyboardType="password"
                          inputPlaceholder="mm"
                          keyboardType="number-pad"

                        />
                      </View>

                      <View style={{width: '30%'}}>
                        <TextFieldBottom
                          onChangeText={this.onChangeDobDD}
                          maxLength={2}
                          autoCorrect={false}
                          autoCapitalize="none"
                          value={dd}
                          keyboardType="password"
                          inputPlaceholder="dd"
                          keyboardType="number-pad"

                        />
                      </View>

                      <View style={{width: '30%'}}>
                        <TextFieldBottom
                          // label="Last Name"
                          onChangeText={this.onChangeDobYYYY}
                          maxLength={4}
                          autoCorrect={false}
                          autoCapitalize="none"
                          value={yyyy}
                          // icon="email"
                          keyboardType="password"
                          inputPlaceholder="yyyy"
                          keyboardType="number-pad"

                        />
                      </View>
                    </View>

                    <ButtonRadio
                      lable="Select Gender"

                      option1="Male"
                      option1Value="male"
                      option1BtnColor={color.primary}

                      option2="Female"
                      option2Value="female"
                      option2BtnColor={color.secondary}

                      defaultValue={gender}
                      callback={this.getResponse.bind(this)}
                    >
                    </ButtonRadio>
                  </View>
                  <View>
                    <ButtonFullWidth
                      style={styles.NO_RADIUS}
                      testID="start-button"
                      preset="primary"
                      text={'Sign up'}
                      onPress={this.onRegister}
                      // onPress={ () => this.props.navigation.navigate('verification')}
                      // onPress={ () => console.log('test')}
                      // icon="next"
                      disabled={loading}
                      loading={loading}
                    />
                  </View>
                </View>
              )}
            </View>
          </Screen>
        </View>
      );
    }
  },
);
