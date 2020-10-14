import * as React from 'react';
import {connect} from 'react-redux';
import {View, Image} from 'react-native';
// import {DrawerItems} from 'react-navigation';
import Config from 'react-native-config';

import { Link} from '../../components/link';
import {Icon} from '../../components/icon';
import {Text} from '../../components/text';
import {Screen} from '../../components/screen';
import {color, styles} from '../../theme';
import {style} from './style';
import {doLogout} from '../../store/actions/login';

const actionProps = (dispatch, ownProps) => ({
  onLogout: payload => dispatch(doLogout()),
});

const NavLink = props => (
  <Link
    text={props.text}
    onClick={props.onClick}
    style={style.NAV_LINK}
    labelStyle={style.NAV_TEXT}
    iconStyle={style.NAV_LINK_ICON}
    icon={props.icon}
  />
);

export const Drawer = connect(
  null,
  actionProps,
)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.closeDrawer = () => {
        this.props.navigation.toggleDrawer();
      };

      this.goMyMood = () => this.props.navigation.navigate('myMood');
      this.goCluster = () => this.props.navigation.navigate('myCluster');
      this.goHome = () => this.props.navigation.navigate('home');
      this.goSettings = () => this.props.navigation.navigate('settings');
      this.goNotifications = () =>
        this.props.navigation.navigate('notifications');
      this.goLogout = () => this.props.navigation.navigate('logout');
    }
    render() {
      return (
        <View style={styles.FULL}>
          <Screen
            style={style.DRAWER_CONTAINER}
            preset="fixed"
            backgroundColor={color.transparent}>
            <View style={style.DRAWER} key="app-drawer">

              <View style={style.HEADER}>
                <Icon
                  icon="app"
                  onClick={this.closeDrawer}
                  style={style.APP_ICON} 
                />
                <Text text={Config.APP_NAME} style={style.TEXT_HEADER} />
              </View>

              
              <View style={style.NAV_LINKS}>
                <NavLink
                  text="Profile"
                  onClick={this.goMyMood}
                  icon="user"
                  key="navlink-mymood"
                />
                <NavLink
                  text="My Booking"
                  onClick={this.goCluster}
                  icon="round_booking"
                  key="navlink-mycluster"
                />
                <NavLink
                  text="Messages"
                  onClick={this.goHome}
                  icon="round_message"
                  key="navlink-moodmap"
                />
                <NavLink
                  text="Payment"
                  onClick={this.goNotifications}
                  icon="round_payment"
                  key="navlink-notifications"
                />
                <NavLink
                  text=" "
                  icon=" "
                />
                <NavLink
                  text="Sign Out"
                  onClick={this.goLogout}
                  icon="round_logout"
                  key="navlink-logout"
                />
              </View>
            </View>
          </Screen>
        </View>
      );
    }
  },
);
