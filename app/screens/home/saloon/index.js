import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Animated, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Screen } from '../../../components/screen';
import { Text } from '../../../components/text';
import { Button } from '../../../components/button';
import { Icon } from '../../../components/icon';
import {imageUrl} from '../../../utils/helpers';
import RBSheet from 'react-native-raw-bottom-sheet';

import { color, spacing, styles, servicePlaceholder, icons } from '../../../theme';
import { Header } from '../../../components/header';
import { fetchIndustryWithFilter } from '../../../store/actions/industry';
import { style } from './style';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked'

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
      this.state = {industry_id:0, order_by: '', order:'',offset:0, services: {}, filteredData: {} } 
    }
      
    
    componentWillReceiveProps(props) {
      /* console.tron.log('new props', props.navigation.state.params); */
      console.tron.log('render saloon With Filter', props.navigation.state.params);
      
      // return false;
      if (props.navigation.state.params.services){
        this.setState({
          services: props.navigation.state.params.services,
          filteredData: props.navigation.state.params.services,
          industry_id: props.navigation.state.params.services[Object.keys(props.navigation.state.params.services)[0]].industry_id
        });
      
        /* if (props.navigation.state.params.industry) {
          this.setState({
            industry_id: props.navigation.state.params.industry
          });
        } */
      } else{
        showMessage({
          message: 'Data Not Found',
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
    }
    filteredDataFn(result) {
      this.setState({
        filteredData: result.filteredData
      });
    }
    sortFilter(orderBy, sort) {
      const { offset, industry_id } = this.state;
      const payload = { id: industry_id, order_by: orderBy, order: sort, offset };
      this.props.onfetchIndustry(payload);
      this.RBSheet.close();

    };
    renderList(service){
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
      const { services, filteredData } = this.state;
      console.tron.log('render saloon screen ', this.props, this.state);
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
                  <ScrollView style={style.SERVICES_LIST}>
                    {Object.keys(filteredData).map(k =>
                      this.renderList(filteredData[k]) 

                    )}
                    <View style={style.SERVICE_PADDING} />
                  </ScrollView>
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
 