import * as React from 'react';
import {connect} from 'react-redux';
import {
  View,
  ActivityIndicator,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import {Screen} from '../../components/screen';
import {Button,ButtonFullWidth} from '../../components/button';
import {Text} from '../../components/text';
import {TextField, TextFieldBottom} from '../../components/text-field';
import {loadString} from '../../utils/storage';
import {decideInitialScreen} from '../../utils/app';
import {color, styles, backgroundImages, imgLogo} from '../../theme';
import SplashScreen from 'react-native-splash-screen';
import {doLogin, refreshLoginToken} from '../../store/actions/login';
// import Config from 'react-native-config';
// import LinearGradient from 'react-native-linear-gradient';
import {style} from './style';

const stateProps = state => ({
  login: state.login,
  registration: state.registration,
  vendor: state.vendor,
});

const actionProps = (dispatch, ownProps) => ({
  tryLogin: payload => dispatch(doLogin(payload)),
  refreshToken: token => dispatch(refreshLoginToken(token)),
});

export const LoadingScreen = connect(
  stateProps,
  actionProps,
)(
  class extends React.Component {
    constructor(props) {
      super(props);
      console.tron.log('Loading screen...');
      this.state = {
        loading: false,
        text: "Let's Start",
      };
    }

    componentWillReceiveProps(props) {
      console.tron.log('loading screen got props', props);
      if (props.login.success) {
        this.props.navigation.navigate(decideInitialScreen(props.vendor));
        return;
      } else {
        this.props.navigation.navigate('auth');
      }
    }

    _bootstrap = async () => {
      const id = await loadString('loginid');
      const pass = await loadString('password');
      console.tron.log(`Loaded auto login info ${id}, ${pass}`);
      if (id && pass) {
        console.tron.log('Trying auto login');
        // when registration is complete, we come back here temporarily ,so add a bit more delay
        this.setState({
          loading: true,
          text: this.props.registration.registered
            ? 'Completing Registration'
            : 'Logging In...',
        });
        setTimeout(
          () => this.props.tryLogin({loginid: id, password: pass}),
          this.props.registration.registered ? 3000 : 1000,
        );
      }
      // @@TODO: instead of loading a screen here, wait for redux to dispatch token refresh success
      // after that execute this code if token refreshed and logged in
      /*if (__DEV__ && Config.DEV_INITIAL_SCREEN) {
        this.props.navigation.navigate(Config.DEV_INITIAL_SCREEN);
      } else {
        this.props.navigation.navigate(loggedIn ? 'main' : 'auth');
      }*/
    };

    onStart = () => {
      this.props.navigation.navigate('auth');
    };

    componentDidMount() {
      console.tron.log('loading screen mounted');
      this._bootstrap();
      SplashScreen.hide();
    }

    render() {
      const {loading, text} = this.state;
      return (
        <View testID="LoadingScreen" style={styles.FULL}>
          <Screen
            style={styles.CONTAINER_PADDED}
            preset="fixed"
            backgroundColor={color.transparent}>
            <Image
              source={backgroundImages.SignIn}
              style={style.WELCOME_IMAGE}
            />

            <View style={style.VFLEX_PADDED}>
              <Button style={style.SKIP_BUTTON} text="Skip" />

              <View style={style.CONTAINER}>
                <Image source={imgLogo} style={style.LOGO} />
                <Text text="WELCOME." style={style.TEXT_HEADER} />
                <Text>
                  <Text text="To" style={style.TEXT_BOLD} />
                  <Text text="  " style={style.SEP} />
                  <Text text="Glow" style={style.TEXT_BOLD} />
                  <Text text="  " style={style.SEP} />
                  <Text text="Pie" style={style.TEXT_BOLD} />
                </Text>
              </View>

              <View style={styles.FOOTER_VIEW_FULL}>
                <View style={{padding: 15}}>
                  <Text text="Personal" style={style.TEXT_BOLD} />
                  <TextFieldBottom
                    label="EMAIL ADDRESS"
                    // onChangeText={this.onChangeId}
                    maxLength={40}
                    autoCorrect={false}
                    autoCapitalize="none"
                    // value={loginid}
                    // icon="email"
                    keyboardType="email-address"
                  />
                  <TextFieldBottom
                    label="EMAIL ADDRESS"
                    // onChangeText={this.onChangeId}
                    maxLength={40}
                    autoCorrect={false}
                    autoCapitalize="none"
                    // value={loginid}
                    // icon="email"
                    keyboardType="email-address"
                  />
                </View>
                <View>
                  <Button
                    testID="start-button"
                    preset="primary"
                    text={text}
                    onPress={this.onStart}
                    icon="next"
                    disabled={loading}
                    loading={loading}
                  />
                </View>
              </View>

              <StatusBar barStyle="default" />
            </View>
          </Screen>
        </View>
      );
    }
  },
);
