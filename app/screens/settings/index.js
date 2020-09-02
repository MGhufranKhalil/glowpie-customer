import * as React from 'react';
import {connect} from 'react-redux';
import {
  View,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Text} from '../../components/text';
import {Screen} from '../../components/screen';
import {Icon} from '../../components/icon';
import {Header} from '../../components/header';
import {color, styles} from '../../theme';
import {style} from './style';

const mapStateToProps = state => ({
  login: state.login,
});

const DATA = [
  {
    id: 'account',
    title: 'Account Settings',
  },
  {
    id: 'notifications',
    title: 'Manage Notifications',
  },
  {
    id: 'blockedUsers',
    title: 'Blocked Users',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
  },
  {
    id: 'terms',
    title: 'Terms of Service',
  },
  {
    id: 'help',
    title: 'Help',
  },
  {
    id: 'logout',
    title: 'Logout',
  },
];

function Item({id, title, selected, onSelect}) {
  return (
    <TouchableOpacity onPress={() => onSelect(id)} style={style.item}>
      <Text style={style.title}>{title}</Text>
    </TouchableOpacity>
  );
}

export const SettingsScreen = connect(
  mapStateToProps,
  null,
)(
  class extends React.Component {
    static navigationOptions = {
      title: 'Settings',
    };

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <View testID="SettingsScreen" style={styles.FULL}>
          <Screen
            style={styles.CONTAINER}
            preset="fixed"
            backgroundColor={color.transparent}>
            <View style={styles.VFLEX_PADDED}>
              <Header
                leftComponent={
                  <Icon
                    icon="menu"
                    onClick={this.props.navigation.openDrawer}
                  />
                }
                rightComponent={() => {}}
                containerStyle={styles.PAGE_HEADER}
              />
              <View style={style.item}>
                <Text style={style.title}>Settings</Text>
              </View>
              <FlatList
                data={DATA}
                renderItem={({item}) => (
                  <Item id={item.id} title={item.title} onSelect={() => {}} />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </Screen>
        </View>
      );
    }
  },
);
