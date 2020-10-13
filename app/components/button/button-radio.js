import * as React from 'react';
import {TouchableOpacity, Image, View, ActivityIndicator} from 'react-native';
import {Text} from '../text';
import {Icon} from '../icon';
import { Button } from '../button';
import {mergeAll, flatten, reduceRight} from 'ramda';
import { styles, color, typography} from '../../theme';
 
const ACCEPT_SWITCH = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};

 

const MALE_ACTIVE_TEXT = {
  fontSize: 14,
};

const MALE_INACTIVE = {
  borderWidth: 1,
  borderColor: color.gray,
  borderRadius: 4,
  backgroundColor: color.white,
  padding: 0,
  margin: 0,
  paddingHorizontal: 22,
  paddingVertical: 15,
};

const MALE_INACTIVE_TEXT = {
  fontSize: 12,
  color: color.dark,
  paddingHorizontal: 8,
};



const FEMALE_ACTIVE_TEXT = {
  fontSize: 14,
};
const FEMALE_INACTIVE_TEXT = {
  fontSize: 12,
  color: color.dark,
};

const FEMALE_INACTIVE = {
  borderWidth: 1,
  borderColor: color.gray,
  borderRadius: 4,
  backgroundColor: color.white,
  padding: 0,
  margin: 0,
  paddingHorizontal: 22,
  paddingVertical: 15,
};
const GENDER_TEXT = {
  fontFamily: typography.bold,
};
export class ButtonRadio extends React.Component {
  constructor(props) {
    super(props);
    this.setup(props);
    this.state = {
      defaultValue, loadingComplete, option2Value, option1Value, 
    } = props;


    this.onGenderChange = (opt1, op2) => {
      if (opt1 == 1) {
        this.setState({ defaultValue: option1Value });
      } else if (op2 == 1) {
        this.setState({ defaultValue: option2Value });
      }

      this.props.callback({ 'option1': opt1, 'option2': op2 });
    };
    

  }
   
  setup(props) {
    const {
      text,
      icon,
      /* style: styleOverride,
      textStyle: textStyleOverride,
      iconStyle: iconStyleOverride, */
      children,
      disabled,

      option1,
      option1Value,
      option1BtnColor,

      option2,
      option2Value,
      option2BtnColor,
      lable,

      defaultValue,
      ...rest
    } = props;

    this.rest = rest;
    /* this.iconView = {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    }; */
    // this.viewStyle = mergeAll(flatten([styles.BUTTON, styleOverride])); old
    /* this.viewStyle = mergeAll(flatten([styles.BUTTON,   styleOverride]));
    this.textStyle = mergeAll(flatten([styles.BUTTON_TEXT, textStyleOverride]));
    this.iconStyle = mergeAll(flatten([styles.BUTTON_ICON, iconStyleOverride])); */
  }

  render() {
    const { defaultValue } = this.state;
    const { option1, option1Value, option1BtnColor, option2, option2Value, option2BtnColor, lable} = this.props;

    const MALE_ACTIVE = {
      padding: 0,
      margin: 0,
      paddingHorizontal: 28,
      borderRadius: 8,
      paddingVertical: 17,
      backgroundColor: option1BtnColor

    };

    const FEMALE_ACTIVE = {
      paddingHorizontal: 20,
      borderRadius: 8,
      paddingVertical: 17,
      backgroundColor: option2BtnColor
    };
    return (
      <View style={ACCEPT_SWITCH}>
        <View style={{ width: '30%' }}>
          <Text style={GENDER_TEXT}>{lable}</Text>
        </View>

        <View style={{ width: '30%' }}>
          {defaultValue !== option1Value && (
            <Button
              testID="signup-button"
              preset="primary"
              text={option1}
              onPress={() => this.onGenderChange(1, 0)}
              style={MALE_INACTIVE}
              textStyle={MALE_INACTIVE_TEXT}
              styleOverride={option1BtnColor}
            />
          )}
          {defaultValue == option1Value && (
            <Button
              testID="signup-button"
              preset="primary"
              text={option1}
              onPress={() => this.onGenderChange(1, 0)}
              style={MALE_ACTIVE}
              textStyle={MALE_ACTIVE_TEXT}
              styleOverride={option1BtnColor}
            />
          )}
        </View>

        <View style={{ width: '30%' }}>
          {defaultValue !== option2Value && (
            <Button
              testID="signup-button"
              preset="primary"
              text={option2}
              onPress={() => this.onGenderChange(0, 1)}
              style={FEMALE_INACTIVE}
              textStyle={FEMALE_INACTIVE_TEXT}
              styleOverride={option2BtnColor}

            />
          )}

          {defaultValue == option2Value && (
            <Button
              testID="signup-button"
              preset="primary"
              text={option2}
              onPress={() => this.onGenderChange(0, 1)}
              style={FEMALE_ACTIVE}
              textStyle={FEMALE_ACTIVE_TEXT}
              styleOverride={option2BtnColor}
            />
          )}
        </View>
      </View>
    );
  }
}
