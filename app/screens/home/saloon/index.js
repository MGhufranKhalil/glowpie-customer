import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Animated, Image, ScrollView, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Screen } from '../../../components/screen';
import { Text } from '../../../components/text';
import { Button } from '../../../components/button';
import { Icon } from '../../../components/icon';
import {imageUrl} from '../../../utils/helpers';
import RBSheet from 'react-native-raw-bottom-sheet';
import {showMessage, hideMessage} from 'react-native-flash-message';
import { color, spacing, styles, servicePlaceholder, icons } from '../../../theme';
import { Header } from '../../../components/header';
import { fetchIndustryWithFilter } from '../../../store/actions/industry';
import { style } from './style';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked';
import { offsetIncrease, offsetDecrease} from '../../../store/constants';

const stateProps = state => ({
  login: state.login,
  vendor: state.vendor,
  service: state.industry.services,
});

const actionProps = (dispatch, ownProps) => ({
  onfetchIndustry: (payload) => dispatch(fetchIndustryWithFilter(payload)),
});


export const ChooseSaloonScreen = connect(
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
        offset:0, 
        services: {}, 
        filteredData: {},
        refreshing:false,
       } 
    }
    onRefresh() {
      console.tron.log('refresh',this.state.refreshing);
      this.setState({ refreshing: true, offset:0});
      this.paginationDecrease();
      setTimeout( () => { this.setState({ refreshing: false }) }, 1000)
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
      const { industry_id, offset } = this.state;
      this.setState({
        order_by: orderBy, order: sort, industry_id: industry_id
      });
      const payload = { id: industry_id, order_by: orderBy, order: sort, offset: offset };
      this.props.onfetchIndustry(payload);
      this.RBSheet.close();
    };
    paginationIncrease(){
      const { industry_id, order_by, order, offset } = this.state;
      const payload = { id: industry_id, order_by, order, offset: offsetIncrease(offset) };
      this.props.onfetchIndustry(payload);
    } 
    paginationDecrease() {
      const { industry_id, order_by, order, offset } = this.state;
      const payload = { id: industry_id, order_by, order, offset: 0 };
      this.props.onfetchIndustry(payload);
    }
    renderList(service){
        service = service.item;
        const imageStyle = service.image ? style.REAL_IMAGE : style.PLACEHOLDER_IMAGE;
        const image = service.image ? imageUrl(service.image) : servicePlaceholder;
        return (
          <View style={style.SERVICE_SMALL}>

            <View style={style.SERVICE_HEADER}> 
              <View style={style.SERVICE_HEADER_HEADING}>
                <Text text={service.business_name} style={{fontWeight:'bold'}} preset="h3" />
              </View>

              <View style={style.SERVICE_HEADER_RATING}>
                <Text text={' (' + service.rating+')'} style={{fontSize:10,color:color.gray}} preset="message"/>
                <Icon icon={'star_x'} style={{ width: 15, height: 15}} /> 
              </View>
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={style.SERVICE_SMALL_IMAGE_CONTENT}>
                  <View style={{ width: '40%' }}>
                    {service.image &&
                      <Image source={image} style={[imageStyle]} />
                    }
                    {!service.image &&
                      <View style={{ backgroundColor: color.gray, paddingTop: 10 }}>
                        <Image source={image} style={[imageStyle]} />
                      </View>
                    }
                  </View>
                  <View>
                    <Text text={service.service_name} style={style.SERVICE_NAME} />
                    <View style={style.ROW_SMALL}>
                      <Image source={icons.datetime} style={style.ICON} />
                      <Text
                        text={service.duration}
                        style={style.ICON_TEXT}
                      />
                    </View>
                    <View style={style.ROW_SMALL}>
                      <Image source={icons.currency} style={style.ICON} />
                      <Text text={service.price} style={style.ICON_TEXT} />
                    </View>
                    <View style={style.ROW_SMALL}>
                      <Image source={service.gender == 'female' ? icons.female : icons.male} style={style.ICON} />
                      <Text text={service.gender} style={style.ICON_TEXT} />
                    </View>
                  </View>
                </View>
              <View style={style.SERVICE_SMALL_ICON}>
                <View style={[style.ROW_SMALL,{height:50}]}></View>
                  <Button
                    testID="book-button"
                    preset="primary"
                    text="BOOK"
                    style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 0, paddingRight: 0, justifyContent : 'center'}}
                    textStyle={{fontSize:10}}
                    // onPress={this.updateService}
                    // icon="next"
                    /* disabled={loading || uploading}
                    loading={loading || uploading} */
                  />
               
              </View>
            </View>
          </View>
        )
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
                  {/* <ScrollView style={style.SERVICES_LIST} onEndReached={console.log('end')}>
                    {Object.keys(filteredData).map(k =>
                      this.renderList(filteredData[k]) 

                    )}
                    <View style={style.SERVICE_PADDING} />
                  </ScrollView> */}
                  
                  <FlatList 
                    data={filteredData} 
                    keyExtractor={(service) => service.vs_id}
                    style={style.SERVICES_LIST} 
                    renderItem={this.renderList}
                    onEndReached={() => this.paginationIncrease()}
                    onEndReachedThreshold={0.7}
                    onRefresh={() => this.onRefresh()}
                    refreshing={refreshing}
                    
                    
                    >
                    {/* {Object.keys(filteredData).map(k =>
                      this.renderList(filteredData[k])

                    )} */}
                    <View style={style.SERVICE_PADDING} />
                  </FlatList>
                  <View style={[styles.FOOTER_VIEW,{flexDirection:'row',justifyContent:'space-between'}]}>
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
                      height={288}
                      duration={250}
                      onClose={this.onCancel}

                    >
                    <View style={style.RBSHEET_CONTAINER}>
                      <View style={style.RBSHEET_MENU}>
                        <Text text="Sort your properties search" style={style.RBSHEET_MENU_TEXT_HEADER} />
                      </View>

                      <TouchableOpacity style={style.RBSHEET_MENU} 
                        onPress={() => this.sortFilter('Best Match','desc')}
                        >
                        <Text text="Best Match" style={style.RBSHEET_MENU_TEXT} />
                      </TouchableOpacity>

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
 