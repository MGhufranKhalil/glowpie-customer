import * as React from 'react';
import { View, Image} from 'react-native';
import {Link} from '../link';
import {Text} from '../text';
import { styles, color, headerImage1 } from '../../theme';
import { Icon } from '../icon';
import {withNavigation} from 'react-navigation';
import SearchInput, { createFilter } from 'react-native-search-filter';
import {SM, XL} from '../../utils/helpers';

const RIGHT = {width: 32};
const PLACE_HOLDER = { width: 20, height: 20 }; //i changed it 40
const TOP_HEADER = { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' };
const IMAGE = {
  position: 'absolute',
  resizeMode: 'cover',
  // height: XL || SM ? '100%' : '65%',
  height:'100%',
  top: 0,
  left: 0,
  // marginLeft: SW > 400 ? 0 : SM ? -230 : -180,
  width: '100%',
};

const KEYS_TO_FILTERS = ['business_name', 'service_details','service_name'];
 
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
      this.searchUpdated = this.searchUpdated.bind(this);
    }
    searchUpdated(term){
      const { searchData } = this.props;
      if (searchData) {
        // const filteredData = Object.values(searchData).filter(createFilter(term, KEYS_TO_FILTERS));
        // console.log(this.props.callback = { 'test': 'test1' });
        filteredData = Object.values(searchData).filter(createFilter(term, KEYS_TO_FILTERS)) ;
        this.props.callback({ 'filteredData': filteredData});
      }
    };

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
        rightIconStyle
      } = this.props;
      const onGoBack = onBack ? onBack : this.props.navigation.goBack;
      const headingStyle = headingSize ? {...styles.PAGE_HEADER_HEADING, fontSize: headingSize} : styles.PAGE_HEADER_HEADING;

      // if (mode === 'big') {
        
        return (
          <View
            style={
              shadow ? styles.PAGE_HEADER_BIG_SHADOW :  styles.PAGE_HEADER_BIG
            }>
            <Image
              source={headerImage1}
              style={IMAGE}
            />
            <View style={TOP_HEADER} >
              <View>
                {!noBack && <Link onClick={onGoBack} icon="back" />}
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
          </View>
        );
      // }

     /*  const titleStyle = headingSize
        ? {...styles.PAGE_HEADER_TITLE, fontSize: headingSize}
        : {...styles.PAGE_HEADER_TITLE};
      return (
        <View style={shadow ? styles.PAGE_HEADER_SHADOW : background ? styles.PAGE_HEADER : styles.PAGE_HEADER_TRANSPARENT }>
          {!noBack && (
            <Link
              onClick={onGoBack}
              icon="back_white"
              style={styles.PAGE_HEADER_TITLE_LINK}
            />
          )}
          {menu && (
            <Link
              onClick={this.props.navigation.openDrawer}
              icon="menu"
              style={styles.PAGE_HEADER_TITLE_LINK}
            />
          )}
          <Text style={titleStyle} text={title || ''} />
          {rightComponent || <View style={RIGHT} />}
        </View>
      ); */
    }
  },
);
