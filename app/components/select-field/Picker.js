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
import {color} from '../../theme/styles';

class Picker extends Component {
  static propTypes = {
    done: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
      }),
    ).isRequired,
    onSave: PropTypes.func,
    toggleShowOptions: PropTypes.func.isRequired,
    doneStyle: PickerHeader.propTypes.doneStyle,
    testProperty: PropTypes.string,
  };

  static defaultProps = {
    visible: false,
    value: null,
    onSave: () => {},
    doneStyle: PickerHeader.defaultProps.doneStyle,
    testProperty: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      showPicker: false,
      value: props.value,
    };

    this.styles = styles(props);

    this.onSave = () => this.props.onSave(this.state.value);
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

  handleValueChange = val => {
    this.setState({value: val});
    /*if (Platform.OS === 'android') {
      this.onSave();
    }*/
  };

  renderPicker = () => {
    const {value} = this.state;
    return (
      <SwipePicker
        selectedValue={value}
        onValueChange={this.handleValueChange}
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
      onSave,
      toggleShowOptions,
      doneStyle,
      testProperty,
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
            {this.renderPicker()}
            <PickerFooter
              onSave={this.onSave}
              testProperty={testProperty}
              toggleShowOptions={toggleShowOptions}
            />
          </SlideUpAnimation>
        </View>
      </Modal>
    );
  }
}

const styles = ({colors}) =>
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
  });

export default Picker;
