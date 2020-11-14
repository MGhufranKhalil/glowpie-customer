import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Animated, Image, ScrollView, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Screen } from '../../../components/screen';
import { Text } from '../../../components/text';
import { Button } from '../../../components/button';
import {TextField} from '../../../components/text-field';
import {showMessage, hideMessage} from 'react-native-flash-message';
import { color, spacing, styles, servicePlaceholder, icons } from '../../../theme';
import { HeaderWithImage } from '../../../components/header';
import { fetchIndustryWithFilter } from '../../../store/actions/industry';
import { style } from './style';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked';

const stateProps = state => ({
  login: state.login,
  vendor: state.vendor,
  service: state.industry.services,
});

const actionProps = (dispatch, ownProps) => ({
  onfetchIndustry: (payload) => dispatch(fetchIndustryWithFilter(payload)),
});


export const SalonScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        error:''
       } 
    }
     
      
    
    componentWillReceiveProps(props) {
      if (true){
         

      } else{
        showMessage({
          message: 'Data Not Found',
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
    } 
     
    
    render() {
      return (
        <View testID="RegisterAddressScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset='scroll'>
            <View style={style.VFLEX_PADDED}>
              <HeaderWithImage
                mode="big"
                // centerHeading="Choose Salon"
                noBack={true}
                shadow={false}
                menu={false}
                headingSize={25}
              />
              <View style={style.CONTAINER}>
                <TextField
                  label="Business Name"
                  // onChangeText={this.onChangeBusinessName}
                  maxLength={50}
                  // value={business_name}
                  icon="business"
                />
                <TextField
                  label="Business Number"
                  // onChangeText={this.onChangeBusinessNumber}
                  autoCorrect={false}
                  autoCapitalize={false}
                  // value={business_number}
                  icon="phone"
                  maxLength={14}
                  mask="(99)-9999-9999"
                  keyboardType="phone-pad"
                />
                <TextField
                  label="Contact Number"
                  // onChangeText={this.onChangeContactNumber}
                  autoCorrect={false}
                  autoCapitalize={false}
                  // value={contact_number}
                  icon="business"
                  maxLength={14}
                  mask="(99)-999-999-999"
                  keyboardType="phone-pad"
                />
                 
                 
              </View>
              <View style={styles.FOOTER_VIEW}>
                <Button
                  testID="save-button"
                  preset="primary"
                  text="Continue"
                  // onPress={this.handleBackButton}
                  icon="next"
                />
              </View>
            </View>
        </Screen>
      </View>
      );
    }
  },
);
 