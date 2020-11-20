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
import { fetchDeals, fetchReview } from '../../../store/actions/salon';
import { style } from './style';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import SearchInput, { createFilter } from 'react-native-search-filter';
import { SH } from '../../../utils/helpers';
import { industry } from '../../../models'

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
  salonServices: state.salon.salonServices,
  salonDeals: state.salon.salonDeals,
  salonReviews: state.salon.salonReviews,
});

const actionProps = (dispatch, ownProps) => ({
  onfetchDeals: (payload) => dispatch(fetchDeals(payload)),
  onfetchReview: (payload) => dispatch(fetchReview(payload)),
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
        refreshing: true,

        allServices: {},
        hairServices: [],
        makeUpServices: [],
        nailsServices: [],
        spaServices: [],
        bridalServices: [],
        groomServices:[],

        filteredAllData: [],
        filteredHairData: [],
        filteredMakeUpData:[],
        filteredNailsData:[],
        filteredSpaData :[],
        filteredBridalData:[],
        filteredGroomData:[],

        deals:{},
        reviews:{},
        salon:{},
        searchKeys: ['business_name', 'service_details', 'service_name'],
        error:''
       } 
    }
    
    componentWillReceiveProps(props) {
      this.setState({ refreshing: true });

      console.tron.log('new props salon', props);

      if (Object.keys(props.salonServices).length > 0){
        this.state.allServices = props.salonServices;
        this.state.filteredAllData = props.salonServices;
        for (let service of props.salonServices) {
            if (industry.hair == service.industry_id) {

              this.state.hairServices.push(service);
              this.state.filteredHairData.push(service);

            } else if (industry.makeup == service.industry_id) {

              this.state.makeUpServices.push(service);
              this.state.filteredMakeUpData.push(service);

            } else if (industry.nails == service.industry_id) {

              this.state.nailsServices.push(service);
              this.state.filteredNailsData.push(service);

            } else if (industry.spa == service.industry_id) {

              this.state.spaServices.push(service);
              this.state.filteredSpaData.push(service);

            } else if (industry.bridal == service.industry_id) {

              this.state.bridalServices.push(service);
              this.state.filteredBridalData.push(service);

            } else if (industry.groom == service.industry_id) {

              this.state.groomServices.push(service);
              this.state.filteredGroomData.push(service);
            }

          }
        this.setState({ refreshing: false });
      } else {
        showMessage({
          message: 'Data Not Found',
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
      if (Object.keys(props.salonDeals).length > 0) {

        this.setState({ deals: props.salonDeals, refreshing: false });
        console.tron.log('salon deals', this.state);
      } else {
        showMessage({
          message: 'Data Not Found',
          backgroundColor: color.error_message,
          color: color.white,
        });
      } 
      if (Object.keys(props.salonReviews).length > 0) {

        this.setState({ reviews: props.salonReviews,refreshing: false });
      } else {
        showMessage({
          message: 'Data Not Found',
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
    }
    componentDidMount(){
      data = this.props.navigation.state.params;
      this.setState({
        salon: data.salon
      });
    }
    handleIndexChange = (index) => {
      const { salon } = this.state;
      this.setState({
        selectedIndex: index,
      });
      if(index == 1){
        this.setState({ refreshing: true });
        this.onDealPress(salon.vendor_id);
      }
      if (index == 2) {
        this.onReviewPress(salon.vendor_id);
      }
    }
    searchUpdated(term) {
      const { allServices, hairServices, makeUpServices, nailsServices, spaServices, bridalServices, groomServices, searchKeys } = this.state;
      this.setState({
        filteredAllData : Object.values(allServices).filter(createFilter(term, searchKeys)),
        filteredHairData : Object.values(hairServices).filter(createFilter(term, searchKeys)),
        filteredMakeUpData : Object.values(makeUpServices).filter(createFilter(term, searchKeys)),
        filteredNailsData : Object.values(nailsServices).filter(createFilter(term, searchKeys)),
        filteredSpaData : Object.values(spaServices).filter(createFilter(term, searchKeys)),
        filteredBridalData : Object.values(bridalServices).filter(createFilter(term, searchKeys)),
        filteredGroomData : Object.values(groomServices).filter(createFilter(term, searchKeys)),
      });
    }
    onRefresh() {
      this.setState({ refreshing: true, offset: 0  });
      setTimeout(() => { this.setState({ refreshing: false }) }, 1000)
    }
    onDealPress = (id) => {
      this.setState({ refreshing: true });
      const payload = { id: id, offset: 0 };
      this.props.onfetchDeals(payload);
    }
    onReviewPress = (id) => {
      this.setState({ refreshing: true });
      const payload = { id: id, offset: 0 };
      this.props.onfetchReview(payload);
    }
    renderTabOne(){
      const { 
        filteredAllData, filteredHairData, filteredMakeUpData, 
        filteredNailsData, filteredSpaData, filteredBridalData, filteredGroomData ,  refreshing} = this.state
      return (
        <View style={{ position: 'absolute', top: 70, left: 10, zIndex: 0, height: SH - 190 }}>
          <View style={{paddingVertical:10}}>
            <SearchInput
              style={style.SEARCH_CONTAINER}
              inputViewStyles={style.SEARCH_INPUT_CONTAINER}
              searchIcon={<Icon icon={'search'} style={style.SEARCH_ICON} />}
              clearIcon={<Icon icon={'cross'} style={style.SEARCH_CLOSE_ICON} />}
              onChangeText={(term) => { this.searchUpdated(term) }}
              placeholder="Search for services ..."
            />
          </View>
            <ScrollableTabView
              renderTabBar={() => (
                <ScrollableTabBar
                  tabStyle={{
                    flexDirection: 'row',
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
              }}
              initialPage={0}
            >
              {/* All Services */}
              <View key={'1'} tabLabel={'All'} style={{ flex:1 }}>
                <FlatList
                data={filteredAllData}
                keyExtractor={(allServices) => allServices.vs_id}
                  style={style.SERVICES_LIST}
                  renderItem={(allServices) => (<SmallList item={allServices.item} onPress={() => {} } />)}
                  refreshControl={<RefreshControl
                    colors={[color.primary, color.secondary]}
                    refreshing={refreshing}
                    onRefresh={() => this.onRefresh()} />}
                >
                  <View style={style.SERVICE_PADDING} />
                </FlatList>
              </View>
              {/* Hair Services */}
              <View key={'2'} tabLabel={'Hair'} style={{ flex: 1}}>
                <FlatList
                data={filteredHairData}
                keyExtractor={(hs) => hs.vs_id}
                  style={style.SERVICES_LIST}
                  renderItem={(hs) => (<SmallList item={hs.item} onPress={() => { }} />)}
                  refreshControl={<RefreshControl
                    colors={[color.primary, color.secondary]}
                    refreshing={refreshing}
                    onRefresh={() => this.onRefresh()} />}
                >
                  <View style={style.SERVICE_PADDING} />
                </FlatList>
              </View>
              {/* Make Up Services */}
              <View key={'3'} tabLabel={'Make Up'} style={{flex: 1}}>
                <FlatList
                data={filteredMakeUpData}
                  keyExtractor={(makeUpServices) => makeUpServices.vs_id}
                  style={style.SERVICES_LIST}
                  renderItem={(makeUpServices) => (<SmallList item={makeUpServices.item} onPress={() => { }} />)}
                  refreshControl={<RefreshControl
                    colors={[color.primary, color.secondary]}
                    refreshing={refreshing}
                    onRefresh={() => this.onRefresh()} />}
                >
                  <View style={style.SERVICE_PADDING} />
                </FlatList>
              </View>
              {/* Nails Services */}

              <View key={'4'} tabLabel={'Nails Art'} style={{flex: 1}}>
                <FlatList
                data={filteredNailsData}
                  keyExtractor={(nailsServices) => nailsServices.vs_id}
                  style={style.SERVICES_LIST}
                  renderItem={(nailsServices) => (<SmallList item={nailsServices.item} onPress={() => { }} />)}
                  refreshControl={<RefreshControl
                    colors={[color.primary, color.secondary]}
                    refreshing={refreshing}
                    onRefresh={() => this.onRefresh()} />}
                >
                  <View style={style.SERVICE_PADDING} />
                </FlatList>
              </View>
              {/* Spa Services */}

              <View key={'5'} tabLabel={'spa'} style={{flex: 1}}>
                <FlatList
                data={filteredSpaData}
                  keyExtractor={(spaServices) => spaServices.vs_id}
                  style={style.SERVICES_LIST}
                  renderItem={(spaServices) => (<SmallList item={spaServices.item} onPress={() => { }} />)}
                  refreshControl={<RefreshControl
                    colors={[color.primary, color.secondary]}
                    refreshing={refreshing}
                    onRefresh={() => this.onRefresh()} />}
                >
                  <View style={style.SERVICE_PADDING} />
                </FlatList>
              </View>
              {/* Bridal Services */}

              <View key={'6'} tabLabel={'Bridal'} style={{flex: 1}}>
                <FlatList
                data={filteredBridalData}
                  keyExtractor={(bridalServices) => bridalServices.vs_id}
                  style={style.SERVICES_LIST}
                  renderItem={(bridalServices) => (<SmallList item={bridalServices.item} onPress={() => { }} />)}
                  refreshControl={<RefreshControl
                    colors={[color.primary, color.secondary]}
                    refreshing={refreshing}
                    onRefresh={() => this.onRefresh()} />}
                >
                  <View style={style.SERVICE_PADDING} />
                </FlatList>
              </View>
              {/* Groom Services */}
              <View key={'7'} tabLabel={'Groom'} style={{flex: 1}}>
                <FlatList
                data={filteredGroomData}
                keyExtractor={(groomServices) => groomServices.vs_id}
                  style={style.SERVICES_LIST}
                renderItem={(groomServices) => (<SmallList item={groomServices.item} onPress={() => { }} />)}
                  refreshControl={<RefreshControl
                    colors={[color.primary, color.secondary]}
                    refreshing={refreshing}
                    onRefresh={() => this.onRefresh()} />}
                >
                  <View style={style.SERVICE_PADDING} />
                </FlatList>
              </View>
            </ScrollableTabView>
        </View>
      );
    }
    renderTabTwo() {
      const { refreshing, deals} = this.state;
      // this.onDealPress(salon.vendor_id);
      return (
        <View style={{ height: SH - 190 }}>
          {console.tron.log('deals tab', this.state)}
          <FlatList
            data={deals}
            keyExtractor={(d) => d.deal_id}
            style={style.SERVICES_LIST}
            renderItem={(d) => (<DealList item={d.item} onPress={() => { }} />)}
            refreshControl={<RefreshControl
              colors={[color.primary, color.secondary]}
              refreshing={refreshing}
              onRefresh={() => this.onRefresh()} />}
          >
            <View style={style.SERVICE_PADDING} />
          </FlatList>
        </View> 
      );
    }
    renderTabThree() {
      const { refreshing, reviews} = this.state;
      return (
        <View style={{ height: SH - 190 }}>
          {/* <ScrollView style={style.SERVICES_LIST} onEndReached={console.log('end')}>
            <ReviewList item={SERVICE} />
            <ReviewList item={SERVICE} />
            <ReviewList item={SERVICE} />
            <ReviewList item={SERVICE} />
            <ReviewList item={SERVICE} />
          </ScrollView> */}
          <FlatList
            data={reviews}
            keyExtractor={(r) => r.customer_id}
            style={style.SERVICES_LIST}
            renderItem={(r) => (<ReviewList item={r.item} onPress={() => { }} />)}
            refreshControl={<RefreshControl
              colors={[color.primary, color.secondary]}
              refreshing={refreshing}
              onRefresh={() => this.onRefresh()} />}
          >
            <View style={style.SERVICE_PADDING} />
          </FlatList>
        </View> 
      );
    }
    render() {
      const { selectedIndex, salon } = this.state;
      return (
        <View testID="RegisterAddressScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset='scroll'>
            <View style={style.VFLEX_PADDED}>
              <HeaderWithImage
                mode="big"
                noBack={false}
                shadow={false}
                menu={false}
                item={salon}
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
 