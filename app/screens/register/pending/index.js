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
import {Button, ButtonFullWidth} from '../../../components/button';
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
  login: state.login,
  vendor: state.vendor,
});

const actionProps = (dispatch, ownProps) => ({
  uploadImage: payload => dispatch(uploadVendorImage(payload)),
});

export const RegisterPendingScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        uploading: false,
        isMale: true,
        isFemale: false,
      };

      this.pickImage = this.pickImage.bind(this);

      this.onGenderChange = (male,female) => {
        if(male == 1 ){
          this.setState({isMale: true,isFemale:false});
        }else if(female ==1){
          this.setState({isMale: false, isFemale: true});
        }
      };
    }

    componentWillReceiveProps(props) {
      // image uplaoded successfully
      const {vendor} = this.props;
      if (props.vendor.account.image) {
        if (!vendor || vendor.account.image !== props.vendor.account.image) {
          console.tron.log('Vendor image uploaded/changed successfully');
          this.setState({
            uploading: false,
          });
          showMessage({
            message: 'Image updated successfully',
            backgroundColor: color.notice,
            color: color.white,
          });
        }
      }
      // don't use else, because the previous image may already be there when error happens
      if (props.vendor.error) {
        this.setState({
          uploading: false,
        });
        showMessage({
          message: props.vendor.error,
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
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
      const {first_name} = this.props.vendor.account || {};
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

    
    renderGender(){
      const {isMale, isFemale } = this.state;
        return (
          <View style={style.ACCEPT_SWITCH}>

            <View style={{width: '30%'}}>
              <Text style={style.GENDER_TEXT}>Select Gender</Text>
            </View>
  
            <View style={{width: '30%'}}>
            {!isMale &&
              <Button
                testID="signup-button"
                preset="primary"
                text="Male"
                onPress={() => this.onGenderChange(1, 0)}
                // icon="next"
                // disabled={loading}
                // loading={loading}
                style={style.MALE_INACTIVE}
                textStyle={style.MALE_INACTIVE_TEXT}
              />
            }
            {isMale &&
              <Button
                testID="signup-button"
                preset="primary"
                text="Male"
                onPress={() => this.onGenderChange(1, 0)}
                // icon="next"
                // disabled={loading}
                // loading={loading}
                style={style.MALE_ACTIVE}
                textStyle={style.MALE_ACTIVE_TEXT}
              />
            }

            </View>
  
            <View style={{width: '30%'}}>
            {!isFemale &&
              <Button
                testID="signup-button"
                preset="primary"
                text="Female"
                onPress={() => this.onGenderChange(0, 1)}
                // icon="next"
                // disabled={loading}
                // loading={loading}
  
                style={style.FEMALE_INACTIVE}
                textStyle={style.FEMALE_INACTIVE_TEXT}
              />
            }

            {isFemale && 
              <Button
                testID="signup-button"
                preset="primary"
                text="Female"
                onPress={() => this.onGenderChange(0, 1)}
                // icon="next"
                // disabled={loading}
                // loading={loading}
  
                style={style.FEMALE_ACTIVE}
                textStyle={style.FEMALE_ACTIVE_TEXT}
              />
            }

            </View>
          </View>
        );
    }

    render() {
      const {vendor} = this.props;
      const infoComplete = isVendorInfoComplete(vendor);
      const {first_name} = vendor.account || {};
      const {business, address, hours, services} = vendor;
      let {image} = vendor.account;
      
      const {uploading} = this.state;
      const imageStyle =
        image && !uploading
          ? style.UPLOADED_IMAGE
          : uploading
          ? style.UPLOADING_IMAGE
          : style.UPLOAD_IMAGE;
      image = image && !uploading ? imageUrl(image) : uploadImage;
      let progressText = 20;
      if (
        business &&
        business.business_name &&
        address &&
        address.address_line1
      ) {
        progressText += 20;
      }
      if (hours && hours.break_hours_start) {
        progressText += 30;
      }
      if (services && Object.keys(services).length > 0) {
        progressText += 30;
      }
      // progress bar width is 0-85 (there is text besides it)
      const progress = ((SW - 70) / 100) * progressText;
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
                {/* {!infoComplete && this.renderBoxes()} */}
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

            <View style={style.VFLEX_PADDED}>

              {!infoComplete && (
                 
                <View style={styles.FOOTER_VIEW_FULL}>
                  <View style={{padding: 15}}>
                    {/* <Text text="General Information" style={style.PERSONAL} /> */}
                    <Text
                      style={styles.PAGE_HEADER_HEADING}
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
                          // onChangeText={this.onChangeId}
                          maxLength={40}
                          autoCorrect={false}
                          autoCapitalize="none"
                          // value={loginid}
                          // icon="email"
                          keyboardType="password"
                          secureTextEntry={true}
                        />
                      </View>

                      <View style={{width: '49%'}}>
                        <TextFieldBottom
                          label="Last Name"
                          // onChangeText={this.onChangeId}
                          maxLength={40}
                          autoCorrect={false}
                          autoCapitalize="none"
                          // value={loginid}
                          // icon="email"
                          keyboardType="password"
                          secureTextEntry={true}
                        />
                      </View>
                    </View>

                    <View style={style.ACCEPT_SWITCH}>
                      <View style={{width: '30%'}}>
                        <TextFieldBottom
                          label="Date of Birth"
                          // onChangeText={this.onChangeId}
                          maxLength={40}
                          autoCorrect={false}
                          autoCapitalize="none"
                          // value={loginid}
                          // icon="email"
                          keyboardType="password"
                          secureTextEntry={true}
                          inputPlaceholder="mm"
                        />
                      </View>

                      <View style={{width: '30%'}}>
                        <TextFieldBottom
                          // label="Last Name"
                          // onChangeText={this.onChangeId}
                          maxLength={40}
                          autoCorrect={false}
                          autoCapitalize="none"
                          // value={loginid}
                          // icon="email"
                          keyboardType="password"
                          secureTextEntry={true}
                          inputPlaceholder="dd"
                        />
                      </View>

                      <View style={{width: '30%'}}>
                        <TextFieldBottom
                          // label="Last Name"
                          // onChangeText={this.onChangeId}
                          maxLength={40}
                          autoCorrect={false}
                          autoCapitalize="none"
                          // value={loginid}
                          // icon="email"
                          keyboardType="password"
                          secureTextEntry={true}
                          inputPlaceholder="yyyy"
                        />
                      </View>
                    </View>
                    {this.renderGender()}
                    
                    
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
                      // disabled={loading}
                      // loading={loading}
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
