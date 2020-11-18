import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Animated, Image, ScrollView, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Screen } from '../../../components/screen';
import { Text } from '../../../components/text';
import { Button } from '../../../components/button';
import { Icon } from '../../../components/icon';
import { SmallList, LargeList, DealList, ReviewList } from '../../../components/lists';
import {showMessage, hideMessage} from 'react-native-flash-message';
import { color, spacing, styles, servicePlaceholder, icons, typography } from '../../../theme';
import { HeaderWithImage } from '../../../components/header';
import { fetchIndustryWithFilter } from '../../../store/actions/industry';
import { style } from './style';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import SearchInput, { createFilter } from 'react-native-search-filter';
import { SH } from '../../../utils/helpers';
const SERVICE = {
  'business_name':'test',
  'service_name':'test',
  'price': '50.5',
  'gender':'female',
  'duration':'30',
  'rating':'4.5',
  'description':'lorem ipsem lorem ipsem lorem ipsem lorem ipsem'
}
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
        selectedIndex: 0,
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
    handleIndexChange = (index) => {
      this.setState({
        // ...this.state,
        selectedIndex: index,
      });
    }
    searchUpdated(term) {
      console.log(term);
      /* const { searchData, searchKeys } = this.props;
      if (searchData) {
        filteredData = Object.values(searchData).filter(createFilter(term, searchKeys));
        this.props.callback({ 'filteredData': filteredData });
      } */
    };
    renderTabOne(){
      return (
        <View style={{ position: 'absolute', top: 70, left: 10, zIndex: 0, height: SH - 190 }}>
          <View style={{paddingVertical:10}}>
            <SearchInput
              style={{ zIndex: 1, paddingLeft: 15,fontFamily:typography.regular }}
              inputViewStyles={{ borderWidth: 1, borderColor: color.gray, borderRadius: 5, flexDirection: 'row', paddingLeft: 5 }}
              searchIcon={<Icon icon={'search'} style={{ width: 20, height: 20, paddingLeft: 5, justifyContent: 'center', flex: 1 }} />}
              clearIcon={<Icon icon={'cross'} style={{ width: 15, height: 15 }} />}
              onChangeText={(term) => { this.searchUpdated(term) }}
              placeholder="Search for services ..."
            />
          </View>
            <ScrollableTabView

              renderTabBar={() => (
                <ScrollableTabBar
                // style={{ width: "100%", backgroundColor: 'white' }}
                  tabStyle={{
                    flexDirection: 'row',
                    // borderWidth: 0.5,
                    borderColor: color.gray,
                  }}
                />
              )}
              tabBarTextStyle={{fontSize: 14,fontWeight: 'normal',fontFamily:typography.regular}}
              tabBarInactiveTextColor={color.gray }
              tabBarActiveTextColor={color.black}
              tabBarUnderlineStyle={{
                height: 3,
                backgroundColor: color.primary,
                borderRadius: 1,
                alignSelf: 'stretch',
                // textAlign: 'center',
              }}
              initialPage={0}
              // style={{ width: '100%'}}
        >
          
            
              <View key={'1'} tabLabel={'All'} style={{ flex:1 }}>
                <ScrollView style={style.SERVICES_LIST} onEndReached={console.log('end')}>
                  <SmallList item={SERVICE} ></SmallList>
                  <SmallList item={SERVICE} ></SmallList>
                  <SmallList item={SERVICE} ></SmallList>
                  <SmallList item={SERVICE} ></SmallList>
                  <SmallList item={SERVICE} ></SmallList>
                </ScrollView>
              </View>
              <View key={'2'} tabLabel={'Hair'} style={{ flex: 1,  backgroundColor: 'black' }}></View>
              <View key={'3'} tabLabel={'Make Up'} style={{   flex: 1, backgroundColor: 'blue' }}></View>
              <View key={'4'} tabLabel={'Nails Art'} style={{  flex: 1, backgroundColor: 'blue' }}></View>
              <View key={'5'} tabLabel={'spa'} style={{  flex: 1, backgroundColor: 'blue' }}></View>
              <View key={'6'} tabLabel={'Bridal'} style={{  flex: 1, backgroundColor: 'blue' }}></View>
              <View key={'7'} tabLabel={'Groom'} style={{  flex: 1, backgroundColor: 'blue' }}></View>
            </ScrollableTabView>
        </View>
      );
    }
    renderTabTwo() {
      return (
        <View style={{ height: SH - 190 }}>
          <ScrollView style={style.SERVICES_LIST} onEndReached={console.log('end')}>
            <DealList item={SERVICE} /> 
            <DealList item={SERVICE} /> 
            <DealList item={SERVICE} /> 
            <DealList item={SERVICE} /> 
            <DealList item={SERVICE} /> 
          </ScrollView>
        </View> 
      );
    }
    renderTabThree() {
      return (
        <View style={{ height: SH - 190 }}>
          <ScrollView style={style.SERVICES_LIST} onEndReached={console.log('end')}>
            <ReviewList item={SERVICE} />
            <ReviewList item={SERVICE} />
            <ReviewList item={SERVICE} />
            <ReviewList item={SERVICE} />
            <ReviewList item={SERVICE} />
          </ScrollView>
        </View> 
      );
    }
    render() {
      const { selectedIndex } = this.state;
      return (
        <View testID="RegisterAddressScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset='scroll'>
            <View style={style.VFLEX_PADDED}>
              <HeaderWithImage
                mode="big"
                // centerHeading="Choose Salon"
                noBack={false}
                shadow={false}
                menu={false}
                headingSize={25}
              />
                <View style={{ paddingHorizontal: 10, paddingVertical: 10}}>
                  <SegmentedControlTab
                    tabsContainerStyle={{ backgroundColor: color.gray, borderWidth: 2, borderColor: color.gray, borderRadius: 7 }}
                    tabStyle={{ backgroundColor: color.gray, borderWidth: 0, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 15 }}
                    firstTabStyle={{ borderColor: color.gray }}
                    tabTextStyle={{ fontSize: 12, color: color.dark,fontFamily:typography.regular }}
                    activeTabStyle={{ backgroundColor: color.white, fontFamily: typography.bold }}
                    activeTabTextStyle={{ color: color.secondary, fontFamily: typography.bold, fontSize: 16 }}
                    values={['Services', 'Deals', 'Reviews']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                  />
                  {selectedIndex === 0
                    && this.renderTabOne()}

                  {selectedIndex === 1
                    && this.renderTabTwo()}

                  {selectedIndex ===2
                    && this.renderTabThree()}

                </View>
            </View>
        </Screen>
      </View>
      );
    }
  },
);
 