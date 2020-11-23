import * as React from 'react';
import { View, Dimensions, ActivityIndicator, TouchableOpacity, Animated, Image } from 'react-native';
import {connect} from 'react-redux';
import {Screen} from '../../../components/screen';
import { Text } from '../../../components/text';
import { CategoryButton } from '../../../components/button';
import { Icon } from '../../../components/icon';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { color, spacing, styles, typography} from '../../../theme';
import { HeaderWithImage } from '../../../components/header';
import { industry } from '../../../models/industry';
// import {doLogout} from '../../../store/actions/login';
import {style} from './style';
import { fetchIndustry } from '../../../store/actions/industry';
import { OFFSET_LIMIT } from '../../../store/constants';


const stateProps = state => ({
  login: state.login,
  vendor: state.vendor,
  service: state.industry.services,
});

const actionProps = (dispatch, ownProps) => ({
  onfetchIndustry: (payload) => dispatch(fetchIndustry(payload)),
});

export const DealScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        deal:{},
        limit: OFFSET_LIMIT,
        error: '',
      };
      /* this.logout = () => {
        this.props.onLogout();
        setTimeout(() => this.props.navigation.navigate('auth'), 500);
      }; */
    }

    componentWillReceiveProps(props) {
      if (Object.keys(props.service).length > 0 ) {
        /* if (props.service.length > 0){
          this.props.navigation.navigate('chooseSaloon', { industry: props.service[1].industry_id, services: props.service });
          return;
        }else{ */
        this.props.navigation.navigate('chooseSalon', { key: Math.random() * 10000, services: props.service } /* { services:props.service} */);
          return;
        // }
      }else{
        showMessage({
          message: 'Data Not Found',
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
    }
    componentDidMount(){
      data = this.props.navigation.state.params;
      this.setState({
        deal: data.deal
      });
    }
    /* getIndustry(industrySelected){
      const { offset, order, order_by,limit } = this.state;
      const payload = { id: industrySelected, offset, order, order_by, limit };
      this.props.onfetchIndustry(payload);
    }  */

    headerRightComponent(item) {
      return (
        <View style={styles.FLEX_ROW}>
          <View style={style.DEAL_DISCOUNT}>
            <View style={style.DEAL_DISCOUNT_STICKER}>
              <Text text={item.discount_rate + "%"} style={style.DEAL_DISCOUNT_PERCENT} />
              <Text text=" OFF" style={style.DEAL_DISCOUNT_OFF} />
            </View>
          </View>

          <View style={style.DEAL_DISCOUNT_AMOUNT}>
            <Text text={"$" + item.discount_price} style={style.DEAL_DISCOUNT_AMOUNT_PRICE} />
          </View>
        </View>
      );
    }
    headerLeftComponent(item) {
      return (
        <View style={[styles.FLEX_COL, { flex: 1 }]}>
          <View>
            <Text preset="h3" style={{ color: color.white, fontFamily: typography.bold }} text={item.deal_name} />
          </View>
        </View>
      );
    }
    render() {
      console.tron.log('render Deal screen', this.props, this.state);
      const {deal } = this.state;
      return (
        <View testID="RegisterAddressScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset='scroll'>
            <View style={style.VFLEX_PADDED}>
              <HeaderWithImage
                noBack={false}
                shadow={false}
                menu={false}
                headingSize={25}
                leftComponent={this.headerLeftComponent(deal)}
                rightComponent={this.headerRightComponent(deal)}
              />
              <View style={style.CONTAINER}>
                <View style={style.ICON_BUTTON_CONTAINER}>
                 {/*  <CategoryButton 
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

                  /> */}
                </View>

              </View>
            </View>
          </Screen>
        </View>
      );
    }
  },
);
