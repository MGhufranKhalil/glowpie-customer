import Reactotron from 'reactotron-react-native';
//import AsyncStorage from './storage';
import {reactotronRedux} from 'reactotron-redux';
import Config from 'react-native-config';

const noop = () => undefined;

if (Config.USE_REACTOTRON) {
  Reactotron.configure({name: 'GlowPieConsumer'})
    .useReactNative()
    .use(reactotronRedux())
    .connect();
  console.tron = Reactotron;
} else {
  console.tron = {
    benchmark: noop,
    clear: noop,
    close: noop,
    configure: noop,
    connect: noop,
    display: noop,
    error: noop,
    image: noop,
    log: noop,
    logImportant: noop,
    onCustomCommand: noop,
    overlay: noop,
    reportError: noop,
    send: noop,
    startTimer: noop,
    storybookSwitcher: noop,
    use: noop,
    useReactNative: noop,
    warn: noop,
    createEnhancer: false,
  };
}

export default console.tron;
