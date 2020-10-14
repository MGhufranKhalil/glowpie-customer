import * as React from 'react';
import {View} from 'react-native';
import {Link} from '../link';
import {Text} from '../text';
import {styles, color} from '../../theme';
import {withNavigation} from 'react-navigation';

const RIGHT = {width: 32};
const PLACE_HOLDER = {width: 20, height: 40};

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
    }

    render() {
      const {
        rightComponent,
        heading,
        sub,
        title,
        mode,
        progress,
        shadow,
        noBack,
        onBack,
        menu,
        headingSize,
        background,
      } = this.props;
      const onGoBack = onBack ? onBack : this.props.navigation.goBack;

      const headingStyle = headingSize
        ? {...styles.PAGE_HEADER_HEADING, fontSize: headingSize}
        : styles.PAGE_HEADER_HEADING;

      if (mode === 'big') {
        return (
          <View
            style={
              shadow ? styles.PAGE_HEADER_BIG_SHADOW :  styles.PAGE_HEADER_BIG
            }>
            {!noBack && <Link onClick={onGoBack} icon="back" />}
            {noBack && <View style={PLACE_HOLDER} />}
            <Text style={headingStyle} text={heading} />
            {sub && 
            
            <Text style={styles.PAGE_HEADER_SUB} text={sub} />
            }
            {progress && <View style={styles.PAGE_HEADER_PROGRESS} />}
            {progress && <View style={this.progressStyle} />}
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
