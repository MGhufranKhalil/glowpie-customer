import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Navigation from './navigation/createNavigator';
import {Platform} from 'react-native';
import BackgroundColor from 'react-native-background-color';
import FlashMessage from 'react-native-flash-message';
import {diags} from './utils/debug';

const store = configureStore();

export default class App extends React.Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackgroundColor.setColor('#FFFFFF');
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation />
        <FlashMessage position="bottom" floating={true} />
      </Provider>
    );
  }
}
