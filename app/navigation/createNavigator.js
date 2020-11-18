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
import {LoginScreen} from '../screens/login';
import {RegisterAccountScreen} from '../screens/register/account';
import { RegisterPendingScreen } from '../screens/register/pending';
import { RegisterTermsAndConditionScreen } from '../screens/register/termsandcondition';
import { ForgotPasswordScreen } from '../screens/forgotpassword';
import { ResetPasswordScreen } from '../screens/resetpassword';
import {TestScreen} from '../screens/test'; 
import {VerificationScreen} from '../screens/verification';
// import { HomeScreen } from '../screens/home_old';
import { ChooseServiceScreen } from '../screens/home/service';
import { ChooseSalonScreen } from '../screens/home/choosesalon';
import { SalonScreen } from '../screens/home/salon';

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
    registerTermsAndCondition: { screen: RegisterTermsAndConditionScreen },
    forgotPassword: { screen: ForgotPasswordScreen },
    resetPassword: { screen: ResetPasswordScreen },

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
 
const RegistrationNavigator = createStackNavigator(
  {
    registerPending: { screen: RegisterPendingScreen },
  },
  {
    headerMode: 'none',
  },
);
const SaloonNavigator = createStackNavigator(
  {
    home: { screen: ChooseServiceScreen },
    chooseSalon: { screen: ChooseSalonScreen },
    saloon: { screen: SalonScreen },
  },
  {
    headerMode: 'none',
  },
);

const MainNavigator = createDrawerNavigator(
  {
    home: { screen: ChooseServiceScreen } 
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
    saloon: SaloonNavigator,
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
