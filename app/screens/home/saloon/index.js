import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Animated, Image } from 'react-native';
import { connect } from 'react-redux';
import { Screen } from '../../../components/screen';
import { Text } from '../../../components/text';
import { CategoryButton } from '../../../components/button';
// import { Icon } from '../../../components/icon';
import { icons } from '../../../theme';

import { color, spacing, styles, imgLogo } from '../../../theme';
import { Header } from '../../../components/header';

import { doLogout } from '../../../store/actions/login';
import { style } from './style';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked'

const stateProps = state => ({
  login: state.login,
  vendor: state.vendor,
});

const actionProps = (dispatch, ownProps) => ({
  onLogout: () => dispatch(doLogout()),
});


export const ChooseSaloonScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    
    constructor(props) {
      super(props);
      
       
    }

    componentWillReceiveProps() {
      // this.props.navigation.navigate('auth');
    }
    
    render() {
      return (
        <View testID="RegisterAddressScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset='scroll'>
            <View style={style.VFLEX_PADDED}>
              <Header
                mode="big"
                heading="Choose Service"
                shadow={true}
                menu={true}
                noBack={true}
                rightIcon="notification"
                rightIconStyle={{ width: 40, height: 40 }}
              // rightLink={true}
              />
              {/* <View style={style.CONTAINER}> */}
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
                  initialPage={1}
                >

                <View key={'1'} tabLabel={'List'} tabIcon={icons['list']} tabActiveIcon={icons['list_x']}  style={{ flex: 1, backgroundColor: 'red' }} />
                <View key={'2'} tabLabel={'Map'} tabIcon={icons['map']} tabActiveIcon={icons['map_x']}  style={{ flex: 1, backgroundColor: 'blue' }} />
                </ScrollableTabView>
              {/* </View> */}
            </View>
          </Screen>
        </View>
      );
    }
  },
);
 