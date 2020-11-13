import * as React from 'react';
import { View, Dimensions, ActivityIndicator, TouchableOpacity, Animated, Image } from 'react-native';
import {connect} from 'react-redux';
import {Screen} from '../../../components/screen';
import { Text } from '../../../components/text';
import { CategoryButton } from '../../../components/button';
import { Icon } from '../../../components/icon';

import {color, spacing, styles, imgLogo} from '../../../theme';
import { Header } from '../../../components/header';
import { industry } from '../../../models/industry';
// import {doLogout} from '../../../store/actions/login';
import {style} from './style';
import { fetchIndustry } from '../../../store/actions/industry';

const stateProps = state => ({
  login: state.login,
  vendor: state.vendor,
  service: state.industry.services,
});

const actionProps = (dispatch, ownProps) => ({
  onfetchIndustry: (payload) => dispatch(fetchIndustry(payload)),
});

export const ChooseServiceScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: '', 
        offset: 0, 
        error: '',
      };
      /* this.logout = () => {
        this.props.onLogout();
        setTimeout(() => this.props.navigation.navigate('auth'), 500);
      }; */
    }

    componentWillReceiveProps(props) {
      if (props.service) {
        this.props.navigation.navigate('chooseSaloon', { services:props.service});
        return;
      }
    }
    getIndustry(industrySelected){
      const { offset } = this.state;
      const payload = { id: industrySelected,  offset };
      this.props.onfetchIndustry(payload);
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
                    // onPress={() => this.props.navigation.navigate('chooseSaloon', { industry: industry['hair'] })}
                    onPress={() => this.getIndustry(industry['hair'])}
                  />
                  <CategoryButton
                    icon='makeup'
                    text='Makeup'
                    onPress={() => this.getIndustry(industry['makeup'])}
                    // onPress={() => this.props.navigation.navigate('chooseSaloon', { industry: industry['makeup'] })}
                  />
                  <CategoryButton
                    icon='nail_art'
                    text='Nails'
                    onPress={() => this.getIndustry(industry['nails'])}
                    // onPress={() => this.props.navigation.navigate('chooseSaloon', { industry: industry['nails'] })}
                  />
                  <CategoryButton
                    icon='spa'
                    text='Spa'
                    // onPress={() => this.props.navigation.navigate('chooseSaloon', { industry: industry['spa'] })}
                    onPress={() => this.getIndustry(industry['spa'])}

                  />
                  <CategoryButton
                    icon='bridal'
                    text='Bridal'
                    // onPress={() => this.props.navigation.navigate('chooseSaloon', { industry: industry['bridal'] })}
                    onPress={() => this.getIndustry(industry['bridal'])}

                  />
                  <CategoryButton
                    icon='groom'
                    text='Groom'
                    onPress={() => this.getIndustry(industry['groom'])}
                    // onPress={() => this.props.navigation.navigate('chooseSaloon', { industry: industry['groom'] })}

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
