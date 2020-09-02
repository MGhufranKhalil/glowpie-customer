import * as React from 'react';
import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';
export class BackButtonHandler extends React.Component {
  constructor() {
    super(...arguments);
    /**
     * Fires when the back button is pressed on android.
     */
    this.onBackPress = () => {
      // grab the current route
      const routeName = this.props.navigationStore.findCurrentRoute().routeName;
      // are we allowed to exit?
      if (this.props.canExit(routeName)) {
        // let the system know we've not handled this event
        return false;
      } else {
        // we can't exit, so let's turn this into a back action
        this.props.navigationStore.dispatch(NavigationActions.back());
        // let the system know we've handled this event
        return true;
      }
    };
  }
  /**
   * Subscribe when we come to life.
   */
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  /**
   * Unsubscribe when we're done.
   */
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  /**
   * Renders the children or nothing if they weren't passed.
   */
  render() {
    return this.props.children;
  }
}
