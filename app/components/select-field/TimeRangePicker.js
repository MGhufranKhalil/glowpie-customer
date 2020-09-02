import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Picker as RNPicker,
  Platform,
  StyleSheet,
} from 'react-native';
import SlideUpAnimation from './SlideUpAnimation';
import SwipePicker from './SwipePicker';
import PickerHeader from './PickerHeader';
import PickerFooter from './PickerFooter';
import {color, font, typography, styles} from '../../theme/styles';
import {SW} from '../../utils/helpers';

export class TimeRangePicker extends Component {
  static propTypes = {
    done: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    start: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    end: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
      }),
    ).isRequired,
    onChangeStart: PropTypes.func,
    onChangeEnd: PropTypes.func,
    toggleShowOptions: PropTypes.func.isRequired,
    doneStyle: PickerHeader.propTypes.doneStyle,
    testProperty: PropTypes.string,
  };

  static defaultProps = {
    visible: false,
    start: null,
    end: null,
    onChangeStart: () => {},
    onChangeEnd: () => {},
    doneStyle: PickerHeader.defaultProps.doneStyle,
    testProperty: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      showPicker: false,
    };

    this.styles = stylesheet(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.handleTogglePicker(nextProps);
    }
  }

  handleTogglePicker = ({visible}) => {
    if (visible) {
      return setTimeout(() => this.setState({showPicker: true}), 150);
    }

    return this.setState({showPicker: false});
  };

  renderPicker = prop => {
    const value = this.props[prop];
    const fn =
      prop === 'start' ? this.props.onChangeStart : this.props.onChangeEnd;
    return (
      <SwipePicker
        selectedValue={value}
        onValueChange={fn}
        style={this.styles.pickerContainer}
        items={this.props.options}
        title={this.props.title}
      />
    );
  };

  render() {
    const {showPicker} = this.state;
    const {
      visible,
      done,
      toggleShowOptions,
      doneStyle,
      testProperty,
      onSave,
    } = this.props;

    /*if (Platform.OS === 'android') {
      return this.renderPicker();
    }*/

    return (
      <Modal
        animationType="fade"
        visible={visible}
        transparent
        onRequestClose={toggleShowOptions}>
        <View style={this.styles.pickerCloseAreaContainer}>
          <SlideUpAnimation visible={showPicker}>
            <PickerHeader
              done={done}
              toggleShowOptions={toggleShowOptions}
              doneStyle={doneStyle}
              testProperty={testProperty}
              title={this.props.title}
            />
            <View style={this.styles.rangePickerList}>
              {this.renderPicker('start')}
              <View style={this.styles.separator}>
                <View style={this.styles.separatorText} />
              </View>
              {this.renderPicker('end')}
            </View>
            <PickerFooter
              onSave={onSave}
              testProperty={testProperty}
              toggleShowOptions={toggleShowOptions}
            />
          </SlideUpAnimation>
        </View>
      </Modal>
    );
  }
}

const stylesheet = ({colors}) =>
  StyleSheet.create({
    pickerCloseAreaContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      borderColor: color.secondary,
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    pickerContainer: {
      backgroundColor: color.light,
      width: '100%',
      paddingLeft: 200,
      height: 60,
      zIndex: 2,
    },
    pickerItem: {
      fontFamily: typography.bold,
      height: 250,
    },
    rangePickerList: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: color.light,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    separator: {
      flex: 1,
    },
    separatorText: {
      height: 3,
      width: 22,
      backgroundColor: color.dark,
      alignSelf: 'center',
      borderRadius: 2,
    },
  });
