import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Animated, Image, ScrollView, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Screen } from '../../../components/screen';
import { Text } from '../../../components/text';
import { Button } from '../../../components/button';
import { Icon } from '../../../components/icon';
import { LargeList } from '../../../components/lists';
import { imageUrl, SH} from '../../../utils/helpers';
import RBSheet from 'react-native-raw-bottom-sheet';
import {showMessage, hideMessage} from 'react-native-flash-message';
import { color, spacing, styles, servicePlaceholder, icons } from '../../../theme';
import { Header } from '../../../components/header';
import { fetchIndustryWithFilter } from '../../../store/actions/industry';
import { fetchSalonServices } from '../../../store/actions/salon';
import { style } from './style';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked';
import { offsetLimitIncrease, offsetDecrease, OFFSET_LIMIT} from '../../../store/constants';

const stateProps = state => ({
  login: state.login,
  vendor: state.vendor,
  service: state.industry.services,
  salonServices: state.salon.salonServices,
});

const actionProps = (dispatch, ownProps) => ({
  onfetchIndustry: (payload) => dispatch(fetchIndustryWithFilter(payload)),
  onfetchSalonServices: (payload) => dispatch(fetchSalonServices(payload)),
});


export const ChooseSalonScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        industry_id:0, 
        order: 'desc',
        order_by: 'rating',
        limit: OFFSET_LIMIT,
        offset:0, 
        services: {},
        filteredData: {},
        salonServices: {}, 
        refreshing:false,
       } 
    }
    
      
    
    componentWillReceiveProps(props) {
      data = props.navigation.state.params.services;
      console.tron.log('new props', props);
      console.tron.log('render saloon With Filter', data);
      // return false;
      if (Object.keys(data).length > 0){
        this.setState({
          services: data,
          filteredData: data,
          industry_id: data[Object.keys(data)[0]].industry_id
        });
      this.setState({ refreshing: false});

      } else{
        showMessage({
          message: 'Data Not Found',
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
    }
    componentDidMount(){
      data = this.props.navigation.state.params.services;
      console.tron.log('did mount', data);
      if (Object.keys(data).length > 0){
        this.setState({
          services: data,
          filteredData: data,
          industry_id: data[Object.keys(data)[0]].industry_id
        });
      }

    }
    filteredDataFn(result) {
      console.tron.log('callback',result);
      this.setState({
        filteredData: result.filteredData
      });
    }
    sortFilter(orderBy, sort) {
      const { industry_id, offset, limit } = this.state;
      this.setState({
        order_by: orderBy, order: sort, industry_id: industry_id
      });
      const payload = { id: industry_id, order_by: orderBy, order: sort, offset, limit};
      this.props.onfetchIndustry(payload);
      this.RBSheet.close();
    };
    paginationIncrease(){
      
      this.setState({ refreshing: true});
      const { industry_id, order_by, order, offset, limit } = this.state;
      const payload = { id: industry_id, order_by, order, offset: offset, limit: offsetLimitIncrease(limit)  };
      console.tron.log('inc pagitaion', payload);
      this.props.onfetchIndustry(payload);
    } 
    paginationDecrease() {
      const { industry_id, order_by, order, offset,limit } = this.state;
      const payload = { id: industry_id, order_by, order, offset: 0, limit };
      this.props.onfetchIndustry(payload);
    }
    onRefresh() {
      console.tron.log('refresh', this.state.refreshing);
      this.setState({ refreshing: true, offset: 0, limit: OFFSET_LIMIT });
      this.paginationDecrease();
      setTimeout(() => { this.setState({ refreshing: false }) }, 1000)
    }

    onServicePress = (item) => {
      const payload = { id: item.vendor_id, offset:0};
      this.props.onfetchSalonServices(payload);

      this.props.navigation.navigate('saloon', { 
        vendor_id: item.vendor_id, 
        salon: { 
          'vendor_id': item.vendor_id, 
          'business_name': item.business_name, 
          'address': item.address, 
          'rating': item.rating 
        } 
      })
    }
    
    render() {
      const { services, filteredData, refreshing } = this.state;
      console.tron.log('FilteredData', filteredData);
      console.tron.log('services', services);
 
      return (
        <View testID="RegisterAddressScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset='scroll'>
            <View style={style.VFLEX_PADDED}>
              <Header
                mode="big"
                centerHeading="Choose Salon"
                shadow={true}
                menu={false}
                headingSize={25}
                search={true}
                searchData={services}
                searchKeys={['business_name', 'service_details','service_name']}
                callback={this.filteredDataFn.bind(this)}
              />
              <ScrollableTabView
                renderTabBar={() => (
                <DefaultTabBar
                    style={style.scrollStyle}
                    tabStyle={style.tabStyle} />
                
                )}
                tabBarTextStyle={style.tabBarTextStyle}
                tabBarInactiveTextColor={color.dark}
                tabBarActiveTextColor={color.secondary}
                tabBarUnderlineStyle={style.underlineStyle}
                initialPage={0}
                
              >
                <View key={'1'} tabLabel={'List'} tabIcon={icons['list']} tabActiveIcon={icons['list_x']}  style={{ flex: 1}}>
                   
                  
                  <FlatList 
                    data={filteredData} 
                    keyExtractor={(service) => service.vs_id}
                    style={style.SERVICES_LIST} 
                    renderItem={(service) => (<LargeList item={service.item} onPress={() => this.onServicePress(service.item) } />) }
                    onEndReached={() => this.paginationIncrease()}
                    onEndReachedThreshold={0.1}
                    refreshControl={<RefreshControl
                      colors={[color.primary, color.secondary]}
                      refreshing={refreshing}
                      onRefresh={() => this.onRefresh()} />}
                    >
                     
                    <View style={style.SERVICE_PADDING} />
                  </FlatList>
                  <View style={[styles.FOOTER_VIEW,styles.FLEX_ROW]}>
                      <View></View>
                      <TouchableOpacity
                        style={{right:0}}
                        onPress={() => this.RBSheet.open()}
                        >
                        <Image
                          source={icons.sort_btn}
                          style={{justifyContent:'space-between'}}
                        />
                      </TouchableOpacity>
                    </View>
                    <RBSheet
                      ref={ref => {
                        this.RBSheet = ref;
                      }}
                      height={240}
                      duration={250}
                      onClose={this.onCancel}

                    >
                    <View style={style.RBSHEET_CONTAINER}>
                      <View style={style.RBSHEET_MENU}>
                        <Text text="Sort your properties search" style={style.RBSHEET_MENU_TEXT_HEADER} />
                      </View>

                      {/* <TouchableOpacity style={style.RBSHEET_MENU} 
                        onPress={() => this.sortFilter('Best Match','desc')}
                        >
                        <Text text="Best Match" style={style.RBSHEET_MENU_TEXT} />
                      </TouchableOpacity> */}

                      <TouchableOpacity style={style.RBSHEET_MENU}
                        onPress={() => this.sortFilter('price','desc')}
                      >
                        <Text text="Highest Price" style={style.RBSHEET_MENU_TEXT} />
                      </TouchableOpacity>

                      <TouchableOpacity style={style.RBSHEET_MENU} 
                        onPress={() => this.sortFilter('price', 'asc')}
                      >
                        <Text text="Lowest Price" style={style.RBSHEET_MENU_TEXT} />
                      </TouchableOpacity>

                      <TouchableOpacity style={style.RBSHEET_MENU}
                        onPress={() =>this.sortFilter('rating', 'desc')}
                      >
                        <Text text="Top Rated" style={style.RBSHEET_MENU_TEXT} />
                      </TouchableOpacity>
                    
                      <TouchableOpacity style={style.RBSHEET_MENU}>
                        <Text text="Nearest to the location" style={style.RBSHEET_MENU_TEXT} />
                      </TouchableOpacity>
                 
                    </View>
                  </RBSheet>
                </View>
                <View key={'2'} tabLabel={'Map'} tabIcon={icons['map']} tabActiveIcon={icons['map_x']}  style={{ flex: 1, backgroundColor: color.gray }}>
                </View>
              </ScrollableTabView>
            </View>
        </Screen>
      </View>
      );
    }
  },
);
 