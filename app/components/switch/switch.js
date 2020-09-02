import * as React from 'react';
import {Animated, Easing, TouchableWithoutFeedback} from 'react-native';
import {color} from '../../theme';
import {mergeAll, flatten} from 'ramda';

const THUMB_SIZE = 24;
const WIDTH = 48;
const MARGIN = 2;
const OFF_POSITION = -0.5;
const ON_POSITION = WIDTH - THUMB_SIZE - MARGIN;
const BORDER_RADIUS = (THUMB_SIZE * 3) / 4;
// colors
const ON_COLOR = color.primary;
const OFF_COLOR = color.gray;
const BORDER_ON_COLOR = color.primary;
const BORDER_OFF_COLOR = 'rgba(0, 0, 0, 0.1)';
// animation
const DURATION = 250;
// the track always has these props
const TRACK = {
  height: THUMB_SIZE + MARGIN,
  width: WIDTH,
  borderRadius: BORDER_RADIUS,
  borderWidth: MARGIN / 2,
  backgroundColor: color.white,
};
// the thumb always has these props
const THUMB = {
  position: 'absolute',
  width: THUMB_SIZE,
  height: THUMB_SIZE,
  borderColor: BORDER_OFF_COLOR,
  borderRadius: THUMB_SIZE / 2,
  borderWidth: MARGIN / 2,
  backgroundColor: color.white,
  shadowColor: BORDER_OFF_COLOR,
  shadowOffset: {width: 1, height: 2},
  shadowOpacity: 1,
  shadowRadius: 2,
  elevation: 2,
};

const enhance = (style, newStyles) => {
  return mergeAll(flatten([style, newStyles]));
};

export class Switch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timer: new Animated.Value(this.props.value ? 1 : 0),
    };
    /**
     * Fires when we tap the touchable.
     */
    this.handlePress = () =>
      this.props.onToggle && this.props.onToggle(!this.props.value);
  }
  startAnimation(newValue) {
    const toValue = newValue ? 1 : 0;
    const easing = Easing.out(Easing.circle);
    Animated.timing(this.state.timer, {
      toValue,
      duration: DURATION,
      easing,
      useNativeDriver: true,
    }).start();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.props.value) {
      this.startAnimation(newProps.value);
    }
  }
  /**
   * Render the component.
   */
  render() {
    const translateX = this.state.timer.interpolate({
      inputRange: [0, 1],
      outputRange: [OFF_POSITION, ON_POSITION],
    });
    const {style} = this.props;
    let trackStyle = TRACK;
    trackStyle = enhance(trackStyle, {
      backgroundColor: this.props.value ? ON_COLOR : OFF_COLOR,
      borderColor: this.props.value ? BORDER_ON_COLOR : BORDER_OFF_COLOR,
    });
    trackStyle = enhance(
      trackStyle,
      this.props.value ? this.props.trackOnStyle : this.props.trackOffStyle,
    );
    let thumbStyle = THUMB;
    thumbStyle = enhance(thumbStyle, {
      transform: [{translateX}],
    });
    thumbStyle = enhance(
      thumbStyle,
      this.props.value ? this.props.thumbOnStyle : this.props.thumbOffStyle,
    );

    return (
      <TouchableWithoutFeedback onPress={this.handlePress} style={style}>
        <Animated.View style={trackStyle}>
          <Animated.View style={thumbStyle} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
