import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import('./app/utils/console');

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
