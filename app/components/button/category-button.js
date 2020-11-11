import * as React from 'react';
import { TouchableHighlight, Image, View, ActivityIndicator} from 'react-native';
import {Text} from '../text';
import {Icon} from '../icon';
import {mergeAll, flatten} from 'ramda';
import {styles, color} from '../../theme';

const ICON_BUTTON = {
  paddingTop: 15,
  width: 100,
  height: 120,
  // borderWidth: 2,
  borderRadius: 10,
  marginBottom: 15,
  alignItems: 'center', 
  justifyContent: 'center', 

  shadowColor: color.dark,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 3,
  backgroundColor: color.white,
  // backgroundColor:color.primary
}
const BUTTON_ICON = {
  width: 40,
  height: 40,
  resizeMode: 'contain',
  alignSelf: 'center',
}; 
const BUTTON_TEXT = {
  // ...styles.BUTTON_TEXT,
  // color: color.white,
  paddingTop: 8, 
  alignSelf: 'center', 
  fontSize: 16,
  fontWeight:'600'};

export class CategoryButton extends React.Component {
  constructor(props) {
    super(props);
    this.setup(props);
    this.state = {
      pressed: false
    };
  }

  setup(props) {
    const {
      text,
      icon,
      style: styleOverride,
      textStyle: textStyleOverride,
      iconStyle: iconStyleOverride,
      children,
      disabled,
      ...rest
    } = props;
    this.rest = rest;
    this.iconView = {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    };

    this.viewStyle = mergeAll(flatten([ICON_BUTTON, styleOverride]));
    this.textStyle = mergeAll(flatten([BUTTON_TEXT, textStyleOverride]));
    this.iconStyle = mergeAll(flatten([BUTTON_ICON, iconStyleOverride]));

  }
  
  setIsPress(arg){
    this.setState({
      pressed: arg
    });
  }

  render() {
    const { text, icon, loading, disabled, children, pressed} = this.props;
    // this.content = children || <Text text={text} style={this.textStyle} />;
    const onPress = loading ? () => { } :  this.props.onPress;
    const onPressProp = {
      onHideUnderlay: () => this.setIsPress(false),
      onShowUnderlay: () => this.setIsPress(true),
    }
    if (icon || loading) {
      return (
          
        <TouchableHighlight  {...onPressProp}
          
          style={this.viewStyle} onPress={onPress} underlayColor={color.primary}
          >
          <View>
            {!this.state.pressed && 
              <View>
                {icon && <Icon icon={icon} style={this.iconStyle} />}
                  <Text text={text} preset="message" style={BUTTON_TEXT}/>
              </View>
            }
            {this.state.pressed &&
              <View>
              {console.log(this.state.pressed)}
                {icon && <Icon icon={icon+'_x'} style={this.iconStyle} />}
              <Text text={text} preset="message" style={[BUTTON_TEXT,{color:color.white}]} />
                </View>
            }
          </View>
        </TouchableHighlight>
      );
    }
    return (
      <TouchableOpacity style={ICON_BUTTON} activeOpacity={0.6} underlayColor={color.primary}>
        {icon && <Icon icon={icon} style={this.iconStyle} />}
        <Text text="Hair" preset="message" />
      </TouchableOpacity>
    );
  }
}
