import React from 'react';
import {Image} from 'react-native';

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  resizeMode: 'stretch',
  width: null,
  height: null,
};

export function Wallpaper(props) {
  // grab the props
  const {backgroundImage} = props;
  return <Image source={backgroundImage} style={style} />;
}
