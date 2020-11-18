import * as React from 'react';
import {View} from 'react-native';
import {Link} from '../link';
import {Text} from '../text';
import { styles, color } from '../../theme';
import { Icon } from '../icon';
import {withNavigation} from 'react-navigation';
import SearchInput, { createFilter } from 'react-native-search-filter';

const RIGHT = {width: 32};
const PLACE_HOLDER = { width: 20, height: 20 }; //i changed it 40
const TOP_HEADER = { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' };
const SEARCH_CONTAINER = {borderWidth: 1, borderColor: color.gray, borderRadius: 5, flexDirection: 'row', paddingLeft: 5 };
const SEARCH_ICON = { width: 20, height: 20, paddingLeft: 5, justifyContent: 'center', flex: 1 };
const SEARCH_CLEAR = { width: 15, height: 15 };

// const KEYS_TO_FILTERS = ['business_name', 'service_details','service_name'];
 
export const Header = withNavigation(
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
      const { searchData, searchKeys } = this.props;
      if (searchData) {
        // const filteredData = Object.values(searchData).filter(createFilter(term, KEYS_TO_FILTERS));
        // console.log(this.props.callback = { 'test': 'test1' });
        filteredData = Object.values(searchData).filter(createFilter(term, searchKeys)) ;
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
        searchKeys,
        menu,
        headingSize,
        background,
        rightIcon,
        rightIconStyle
      } = this.props;
      const onGoBack = onBack ? onBack : this.props.navigation.goBack;
      const headingStyle = headingSize ? {...styles.PAGE_HEADER_HEADING, fontSize: headingSize} : styles.PAGE_HEADER_HEADING;

      if (mode === 'big') {
        
        return (
          <View
            style={
              shadow ? styles.PAGE_HEADER_BIG_SHADOW :  styles.PAGE_HEADER_BIG
            }>

            <View style={TOP_HEADER} >

              <View>
                {menu && (
                  <Link
                    onClick={this.props.navigation.openDrawer}
                    icon="menu"
                    style={styles.PAGE_HEADER_TITLE_LINK}
                  />
                )}
      
                {!noBack && <Link onClick={onGoBack} icon="back" />}
                {noBack && <View style={PLACE_HOLDER} />}
              </View>

              {centerHeading &&
                <View>
                  <Text style={[headingStyle]} text={centerHeading} />
                  {sub &&
                    <Text style={styles.PAGE_HEADER_SUB} text={sub} />
                  }
                </View>
              }

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
            {search && 
              <View>
                <SearchInput
                  style={{paddingLeft:15}}
                  inputViewStyles={SEARCH_CONTAINER}
                  searchIcon={<Icon icon={'search'} style={SEARCH_ICON} />}
                  clearIcon={<Icon icon={'cross'} style={SEARCH_CLEAR} />}
                  onChangeText={(term) => { this.searchUpdated(term) }}
                  placeholder="Search"
                />
              </View>
            }
            
            {heading && 
            <View>
              <Text style={headingStyle} text={heading} />
              {sub && 
              
              <Text style={styles.PAGE_HEADER_SUB} text={sub} />
              }
              {progress && <View style={styles.PAGE_HEADER_PROGRESS} />}
              {progress && <View style={this.progressStyle} />}
            </View>
            }

          </View>
        );
      }

      const titleStyle = headingSize
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
      );
    }
  },
);
