import * as React from 'react';
import { View, Image} from 'react-native';
import {Link} from '../link';
import {Text} from '../text';
import { styles, color, headerImage2, typography } from '../../theme';
import { Icon } from '../icon';
import {withNavigation} from 'react-navigation';
import SearchInput, { createFilter } from 'react-native-search-filter';
import {SM, XL,SW} from '../../utils/helpers';

const RIGHT = {width: 32};
const PLACE_HOLDER = { width: 20, height: 20 }; //i changed it 40
const ICON_SIZE = { height: 15, width: 17 }; 
const TOP_HEADER = { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',paddingHorizontal:10 };
const IMAGE = {
  position: 'absolute',
  resizeMode: 'cover',
  height:120,
  top: 0,
  left: 0,
  width: SW > 400 ? 0 : SM ? '100%' : '110%',
};
const OVERRIDE_HEADER_STYLE =  {
  height: 120,
  paddingHorizontal: 0
};
const BOTTOM_HEADER = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 10,
  paddingVertical: 10,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  position: 'absolute',
  bottom: 0,
  width: '100%'
};

const KM_BUTTON = {
  backgroundColor: color.darkgray,
  borderRadius: 20,
  color: color.white,
  width: 40,
  // paddingHorizontal: 9,
  paddingVertical: 2,
  fontSize: 10, 
  textAlign: 'center',
  fontFamily: typography.regular
};
export const HeaderWithImage = withNavigation(
  class extends React.Component {
    constructor(props) {
      super(props);
      const {progress} = props;
      this.progressStyle = {
        ...styles.PAGE_HEADER_PROGRESS,
        backgroundColor: color.secondary,
        width: `${progress}%`,
      };
      this.state = {
        searchTerm: ''
      };
    }
     

    render() {
      const {
        rightComponent,
        heading,
        centerHeading,
        sub,
        title,
        mode,
        progress,
        shadow,
        noBack,
        onBack,
        search, 
        searchData,
        menu,
        headingSize,
        background,
        rightIcon,
        rightIconStyle,
        rating
      } = this.props;
      const onGoBack = onBack ? onBack : this.props.navigation.goBack;
      const headingStyle = headingSize ? {...styles.PAGE_HEADER_HEADING, fontSize: headingSize} : styles.PAGE_HEADER_HEADING;
      const ratingUI = [];
      for (let i = 0; i < 5; i++){
        if (i < Math.floor(4.5) ){
          ratingUI.push(
            <Icon icon="star_x" style={ICON_SIZE} />
          )
        }else{
          ratingUI.push(
            <Icon icon="star" style={ICON_SIZE} />
          )
        }
      }
      return (
        <View
          style={
            shadow ? [styles.PAGE_HEADER_BIG_SHADOW,  OVERRIDE_HEADER_STYLE ] : [styles.PAGE_HEADER_BIG, OVERRIDE_HEADER_STYLE] 
          }>
          <Image
            source={headerImage2}
            style={IMAGE}
          />
          {/* TOP_HEADER */}
          <View style={TOP_HEADER} >
            <View>
              {!noBack && <Link onClick={onGoBack} icon="back_white" />}
              {noBack && <View style={PLACE_HOLDER} />}
            </View>

            <View >
              {rightIcon && (
                <Link
                  icon={rightIcon}
                  iconStyle={rightIconStyle}
                  style={styles.PAGE_HEADER_TITLE_LINK}
                />
              )}
              {rightIcon && <View style={PLACE_HOLDER} />}
            </View>
          </View>
          {/* header bottom */}
          <View style={BOTTOM_HEADER}>
              
            <View style={styles.FLEX_COL}>
              <View>
                <Text preset="h3" style={{color:color.white,fontFamily:typography.bold}}>Style Station</Text>
              </View>

              <View style={styles.FLEX_ROW}>
                <Icon icon="map_pin" style={ICON_SIZE} />
                <Text preset="h5" style={{ color: color.white, fontFamily: typography.regular}}>591 Geor Street, Paris, 75150, France</Text>
              </View>

            </View>

            <View style={styles.FLEX_COL}>

              <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                {ratingUI}
                <Text preset="h6" style={{color:color.white }}>4.5</Text>
              </View>

              <View style={{position:'absolute',bottom:0,right:0}}>
                <Text preset="h6" style={KM_BUTTON}>5 km</Text>
              </View>
            </View>
          </View>
        </View>
      );
       
    }
  },
);
