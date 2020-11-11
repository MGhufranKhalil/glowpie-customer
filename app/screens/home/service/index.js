import * as React from 'react';
import { View, Dimensions, ActivityIndicator, TouchableOpacity, Animated, Image } from 'react-native';
import {connect} from 'react-redux';
import {Screen} from '../../../components/screen';
import { Text } from '../../../components/text';
import { CategoryButton } from '../../../components/button';
import { Icon } from '../../../components/icon';

import {color, spacing, styles, imgLogo} from '../../../theme';
import { Header } from '../../../components/header';

import {doLogout} from '../../../store/actions/login';
import {style} from './style';

const stateProps = state => ({
  login: state.login,
  vendor: state.vendor,
});

const actionProps = (dispatch, ownProps) => ({
  onLogout: () => dispatch(doLogout()),
});

export const ChooseServiceScreen = connect(
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
                rightIconStyle={{width: 40, height: 40}}
                // rightLink={true}
              />
              <View style={style.CONTAINER}>
                <View style={style.ICON_BUTTON_CONTAINER}>
                  <CategoryButton 
                    icon='hair_cutting'
                    text='Hair'
                    onPress={() => this.props.navigation.navigate('chooseSaloon')}
                  />
                  <CategoryButton
                    icon='makeup'
                    text='Makeup'
                    onPress={() => this.props.navigation.navigate('chooseSaloon')}
                  />
                  <CategoryButton
                    icon='nail_art'
                    text='Nails'
                    onPress={() => this.props.navigation.navigate('chooseSaloon')}
                  />
                  <CategoryButton
                    icon='spa'
                    text='Spa'
                    onPress={() => this.props.navigation.navigate('chooseSaloon')}

                  />
                  <CategoryButton
                    icon='bridal'
                    text='Bridal'
                    onPress={() => this.props.navigation.navigate('chooseSaloon')}

                  />
                  <CategoryButton
                    icon='groom'
                    text='Groom'
                    onPress={() => this.props.navigation.navigate('chooseSaloon')}

                  />
                </View>

              </View>
            </View>
          </Screen>
        </View>
      );
    }
  },
);
