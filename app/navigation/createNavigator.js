import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Drawer} from '../components/drawer';
import {LoadingScreen} from '../screens/loading';
import {TestScreen} from '../screens/test';
import {LoginScreen} from '../screens/login';
import {RegisterAccountScreen} from '../screens/register/account';
import {RegisterBusinessScreen} from '../screens/register/business';
import {RegisterPendingScreen} from '../screens/register/pending';
import {RegisterAddressScreen} from '../screens/register/address';
import {RegisterHoursScreen} from '../screens/register/hours';
import {RegisterServicesScreen} from '../screens/register/services';
import {EditServiceScreen} from '../screens/services/edit';
import {EditHoursScreen} from '../screens/hours/edit';
import {VerificationScreen} from '../screens/verification';
import {HomeScreen} from '../screens/home';
import {color} from '../theme';

const LoadingNavigator = createStackNavigator(
  {
    loading: {screen: LoadingScreen},
    test: {screen: TestScreen},
  },
  {
    headerMode: 'none',
  },
);

const AuthNavigator = createStackNavigator(
  {
    login: {screen: LoginScreen},
    signup: {screen: RegisterAccountScreen},
  },
  {
    headerMode: 'none',
  },
);

const VerificationNavigator = createStackNavigator(
  {
    verify: {screen: VerificationScreen},
  },
  {
    headerMode: 'none',
  },
);

/* const RegistrationNavigator = createStackNavigator(
  {
    registerPending: {screen: RegisterPendingScreen},
    registerBusiness: {screen: RegisterBusinessScreen},
    registerAddress: {screen: RegisterAddressScreen},
    registerHours: {screen: RegisterHoursScreen},
    registerServices: {screen: RegisterServicesScreen},
    editService: {screen: EditServiceScreen},
    editHours: {screen: EditHoursScreen},
  },
  {
    headerMode: 'none',
  },
); */
const RegistrationNavigator = createStackNavigator(
  {
    registerPending: {screen: RegisterPendingScreen},
    // registerBusiness: {screen: RegisterBusinessScreen},
    // registerAddress: {screen: RegisterAddressScreen},
    // registerHours: {screen: RegisterHoursScreen},
    // registerServices: {screen: RegisterServicesScreen},
    // editService: {screen: EditServiceScreen},
    // editHours: {screen: EditHoursScreen},
  },
  {
    headerMode: 'none',
  },
);

const MainNavigator = createDrawerNavigator(
  {
    home: {screen: HomeScreen},
  },
  {
    hideStatusBar: false,
    drawerBackgroundColor: color.transparent,
    overlayColor: color.overlay,
    contentOptions: {
      activeTintColor: color.white,
      activeBackgroundColor: color.primary,
    },
    contentComponent: Drawer,
  },
);

const rootStack = createAnimatedSwitchNavigator(
  {
    loading: LoadingNavigator,
    auth: AuthNavigator,
    verification: VerificationNavigator,
    register: RegistrationNavigator,
    main: MainNavigator,
  },
  {
    headerMode: 'none',
    initialRouteName: 'loading',
    navigationOptions: {gesturesEnabled: false},
  },
);

const Navigation = createAppContainer(rootStack);
export default Navigation;
