import * as React from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {Screen} from '../../components/screen';
import {Text} from '../../components/text';
import {Button} from '../../components/button';
import {color, spacing, styles, imgLogo} from '../../theme';
import {doLogout} from '../../store/actions/login';
import {style} from './style';

const stateProps = state => ({
  login: state.login,
  vendor: state.vendor,
});

const actionProps = (dispatch, ownProps) => ({
  onLogout: () => dispatch(doLogout()),
});

export const HomeScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.logout = () => {
        this.props.onLogout();
        setTimeout(() => this.props.navigation.navigate('auth'), 500);
      };
    }

    componentWillReceiveProps() {
      // this.props.navigation.navigate('auth');
    }

    render() {
      console.tron.log('render home screen', this.props, this.state);
      return (
        <View testID="HomeScreen" style={styles.FULL}>
          <Screen
            style={styles.CONTAINER}
            preset="fixed"
            backgroundColor={color.transparent}>
            <View style={styles.VFLEX}>
              <Image source={imgLogo} style={style.LOGO} />
              <Text text="Welcome to GlowPie" style={style.welcome} />
              <Button
                text="Logout"
                preset="primary"
                onPress={() => this.logout()}
              />
            </View>
          </Screen>
        </View>
      );
    }
  },
);
