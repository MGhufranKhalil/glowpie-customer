import * as React from 'react';
import {connect} from 'react-redux';
import {View, Image} from 'react-native';
// import {DrawerItems} from 'react-navigation';
import {Link} from '../../components/link';
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
                  icon="cross"
                  onClick={this.closeDrawer}
                  style={style.CLOSE_BUTTON}
                />
              </View>
              <View style={style.NAV_LINKS}>
                <NavLink
                  text="My Mood"
                  onClick={this.goMyMood}
                  icon="mymood"
                  key="navlink-mymood"
                />
                <NavLink
                  text="My Cluster"
                  onClick={this.goCluster}
                  icon="mycluster"
                  key="navlink-mycluster"
                />
                <NavLink
                  text="Mood Map"
                  onClick={this.goHome}
                  icon="moodmap"
                  key="navlink-moodmap"
                />
                <NavLink
                  text="Notifications"
                  onClick={this.goNotifications}
                  icon="notifications"
                  key="navlink-notifications"
                />
                <NavLink
                  text="Settings"
                  onClick={this.goSettings}
                  icon="settings"
                  key="navlink-settings"
                />
                <NavLink
                  text="Logout"
                  onClick={this.goLogout}
                  icon="logout"
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
