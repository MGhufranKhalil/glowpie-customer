import * as React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from '../text';
import {Swiper} from './swiper';
import {color, font, styles, typography, welcomeImages} from '../../theme';
import {SM} from '../../utils/helpers';

const swiperStyles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.white,
    paddingTop: 50,
  },
  image: {
    width: '70%',
    resizeMode: 'contain',
  },
  title: {
    ...styles.CONTENT,
    fontSize: font.h2,
    fontFamily: typography.bold,
    color: color.black,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  text: {
    ...styles.CONTENT,
    fontSize: font.th4,
    color: color.black,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 100,
    lineHeight: 26,
  },
  activeDot: {
    backgroundColor: color.secondary,
    width: 24,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});

export class SwipeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.setup(props);
  }

  componentWillReceiveProps(props) {
    this.setup(props);
  }

  setup(props) {
    /*const {style: styleOverride} = props;
    this.style = Object.assign(Object.assign({}, ROOT), styleOverride);
    this.imageStyle = {
      resizeMode: 'contain',
      width: this.style.width,
      height: this.style.height,
    };
    this.onPress = props.onClick ? () => props.onClick() : () => {};*/
  }

  render() {
    const activeDot = <View style={swiperStyles.activeDot} />;
    return (
      <Swiper
        style={swiperStyles.wrapper}
        scrollEnabled={true}
        activeDot={activeDot}
        dotColor={color.gray}>
        <View style={swiperStyles.slide}>
          <Image source={welcomeImages.step1} style={swiperStyles.image} />
          <View>
            <Text style={swiperStyles.title}>Welcome To GlowPie</Text>
            <Text style={swiperStyles.text}>
              There are many variations of passages of variations of passages of
              Lorem Ipsum available passages.
            </Text>
          </View>
        </View>
        <View style={swiperStyles.slide}>
          <Image source={welcomeImages.step2} style={swiperStyles.image} />
          <View>
            <Text style={swiperStyles.title}>Select Service You Want</Text>
            <Text style={swiperStyles.text}>
              There are many variations of passages of variations of passages of
              Lorem Ipsum available passages.
            </Text>
          </View>
        </View>
        <View style={swiperStyles.slide}>
          <Image source={welcomeImages.step3} style={swiperStyles.image} />
          <View>
            <Text style={swiperStyles.title}>Find Nearby Salon</Text>
            <Text style={swiperStyles.text}>
              There are many variations of passages of variations of passages of
              Lorem Ipsum available passages.
            </Text>
          </View>
        </View>
        <View style={swiperStyles.slide}>
          <Image source={welcomeImages.step4} style={swiperStyles.image} />
          <View>
            <Text style={swiperStyles.title}>Book Your Seat & Done</Text>
            <Text style={swiperStyles.text}>
              There are many variations of passages of variations of passages of
              Lorem Ipsum available passages.
            </Text>
          </View>
        </View>
      </Swiper>
    );
  }
}
