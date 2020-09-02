import * as React from 'react';
import {
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Button} from '../../../components/button';
import {Checkbox} from '../../../components/checkbox';
import {Header} from '../../../components/header';
import {Icon} from '../../../components/icon';
import {Link} from '../../../components/link';
import {Text} from '../../../components/text';
import {TextField} from '../../../components/text-field';
import {TimeRangePicker} from '../../../components/select-field';
import {Screen} from '../../../components/screen';
import {color, font, styles, icons} from '../../../theme';
import {
  SM,
  XSM,
  formatTime,
  capitalizeFirstLetter,
} from '../../../utils/helpers';
import {isVendorInfoComplete} from '../../../utils/app';
import {style} from './style';
import {registerHours} from '../../../store/actions/registration';
import {doLogin} from '../../../store/actions/login';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {diags} from '../../../utils/debug';
import {hoursModel} from '../../../models';
import {
  DAY_NAMES,
  DAY_NAMES_SHORT,
  BUSINESS_TIMINGS,
} from '../../../store/constants';

const stateProps = state => ({
  vendor: state.vendor,
  hours: state.vendor.hours,
  error: state.vendor.error,
});

const actionProps = (dispatch, ownProps) => ({
  onUpdateHours: payload => dispatch(registerHours(payload)),
});

export const RegisterHoursScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        ...hoursModel,
        selectedDay: 'monday',
        loading: false,
        showPicker: false,
        timeA: '',
        timeB: '',
        valueA: '',
        valueB: '',
      };

      // when defining hours first time, we use our model default values
      // otherwise, we use values from existing hours definition
      if (isVendorInfoComplete(props.vendor, 'hours')) {
        this.state = {
          ...this.state,
          ...props.hours,
        };
      }

      this.handleBackButton = () => this.props.navigation.pop();
      this.selectDay = day => {
        this.setState({
          selectedDay: day,
        });
      };
      this.updateHours = () => {
        const {
          loading,
          selectedDay,
          showPicker,
          timeA,
          timeB,
          valueA,
          valueB,
          ...payload
        } = this.state;
        this.setState({
          loading: true,
        });
        console.tron.log(payload);
        this.props.onUpdateHours(payload);
      };

      this.selectHours = this.selectHours.bind(this);
      this.onChangeStartTime = this.onChangeStartTime.bind(this);
      this.onChangeEndTime = this.onChangeEndTime.bind(this);
      this.togglePicker = this.togglePicker.bind(this);
      this.onSaveTimes = this.onSaveTimes.bind(this);
    }

    onChangeStartTime(value) {
      this.setState({
        valueA: value,
      });
    }
    onChangeEndTime(value) {
      this.setState({
        valueB: value,
      });
    }

    onSaveTimes() {
      const {timeA, timeB, valueA, valueB} = this.state;
      this.setState({
        [timeA]: valueA,
        [timeB]: valueB,
        showPicker: false,
      });
    }

    togglePicker() {
      if (this.state.loading) {
        return;
      }

      /*if (!this.state.value && this.props.options) {
	      this.setState({value: this.props.options[0].value});
	    }*/

      Keyboard.dismiss();

      this.setState(prevState => ({
        showPicker: !prevState.showPicker,
      }));
    }

    selectHours(a, b) {
      if (this.state.loading) {
        return;
      }
      this.setState({
        timeA: a,
        timeB: b,
        valueA: this.state[a],
        valueB: this.state[b],
        showPicker: true,
      });
    }

    componentWillReceiveProps(props) {
      if (this.state.loading && !props.error) {
        this.setState({
          loading: false,
        });
        showMessage({
          message: 'Business hours updated',
          backgroundColor: color.notice,
          color: color.white,
        });
        setTimeout(() => this.props.navigation.pop(), 100);
      } else if (this.state.loading && props.error) {
        this.setState({
          loading: false,
        });
        showMessage({
          message: props.error,
          backgroundColor: color.error_message,
          color: color.white,
        });
      }
    }

    renderDays() {
      const {selectedDay} = this.state;
      return (
        <View style={style.DAYS_LIST}>
          {DAY_NAMES_SHORT.map((d, i) => {
            const d2 = DAY_NAMES[i];
            const open_key = `${d2}_open_time`;
            const open_time = this.state[open_key];
            const image = open_time
              ? selectedDay === d2
                ? icons.tick_x
                : icons.tick
              : icons.blank;
            return (
              <TouchableWithoutFeedback onPress={() => this.selectDay(d2)}>
                <View
                  style={
                    selectedDay === d2 ? style.DAY_BOX_SELECTED : style.DAY_BOX
                  }>
                  <View
                    style={
                      selectedDay === d2
                        ? style.CHECKBOX_SELECTED
                        : style.CHECKBOX
                    }>
                    <Image source={image} />
                  </View>
                  <Text
                    text={d}
                    style={
                      selectedDay === d2
                        ? style.DAY_NAME_SELECTED
                        : style.DAY_NAME
                    }
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      );
    }

    renderHours() {
      const {selectedDay, break_hours_start, break_hours_close} = this.state;
      const open_key = `${selectedDay}_open_time`;
      const close_key = `${selectedDay}_close_time`;
      const open_time = this.state[open_key];
      const close_time = this.state[close_key];
      const dayName = capitalizeFirstLetter(selectedDay);
      const openingHours = open_time ? (
        <Text text={formatTime(open_time)} style={style.TIME} />
      ) : null;
      const closingHours = open_time ? (
        <Text text={formatTime(close_time)} style={style.TIME} />
      ) : null;
      const breakHoursStart = break_hours_start ? (
        <Text text={formatTime(break_hours_start)} style={style.TIME} />
      ) : null;
      const breakHoursEnd = break_hours_close ? (
        <Text text={formatTime(break_hours_close)} style={style.TIME} />
      ) : null;
      return (
        <View>
          <TouchableHighlight
            underlayColor={color.primary}
            activeOpacity={0.9}
            onPress={() => this.selectHours(open_key, close_key)}>
            <View style={style.HOURS_LIST}>
              <Text
                text={`${dayName} opening hours`}
                style={style.HOURS_TITLE}
              />
              <View style={style.HOURS}>
                {openingHours}
                <Text text="-" style={style.SEP} />
                {closingHours}
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={color.primary}
            activeOpacity={0.9}
            onPress={() =>
              this.selectHours('break_hours_start', 'break_hours_close')
            }>
            <View style={style.BREAK_HOURS_LIST}>
              <Text text="Break hours" style={style.HOURS_TITLE} />
              <View style={style.HOURS}>
                {breakHoursStart}
                <Text text="-" style={style.SEP} />
                {breakHoursEnd}
              </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    }

    render() {
      const preset = 'fixed';
      const colors = {
        normal: '#9C9C9C',
        light: '#D9D9D9',
        dark: '#545454',
      };
      console.tron.log(this.state);
      const {loading, valueA, valueB} = this.state;
      return (
        <View testID="RegisterHoursScreen" style={styles.FULL}>
          <Screen style={styles.SCREEN} preset={preset}>
            <View style={style.VFLEX}>
              <Header
                mode="big"
                heading="Opening Hours"
                sub="Choose your business opening hours"
                onBack={this.handleBackButton}
                shadow
              />
              {this.renderDays()}
              {this.renderHours()}
              <View style={styles.FOOTER_VIEW}>
                <Button
                  testID="save-button"
                  preset="primary"
                  text="Save"
                  onPress={this.updateHours}
                  icon="next"
                  loading={loading}
                  disabled={loading}
                />
              </View>
              <TimeRangePicker
                title="Opening Hours"
                options={BUSINESS_TIMINGS}
                colors={colors}
                start={valueA}
                end={valueB}
                onChangeStart={this.onChangeStartTime}
                onChangeEnd={this.onChangeEndTime}
                visible={this.state.showPicker}
                toggleShowOptions={this.togglePicker}
                onSave={this.onSaveTimes}
              />
            </View>
          </Screen>
        </View>
      );
    }
  },
);
