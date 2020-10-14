import React, { Component } from "react";
import { Alert, Modal, StyleSheet, TouchableHighlight, View, Image} from "react-native";
import { styles, color, font, typography, icons} from '../../theme';
import {Text} from '../text';
import { Icon } from '../icon';



export class CustomModal extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      button1: false,
      button2: false,
      modal: false,
    };
     
    this.setup(props);
  }

  setup(props) {


    const {
      /* text,
      icon,
      style: styleOverride,
      textStyle: textStyleOverride,
      iconStyle: iconStyleOverride,
      children,
      disabled, */
      modalVisible
    } = props;
    
    

    
    /* this.viewStyle = mergeAll(flatten([styles.BUTTON, styleOverride]));
    this.textStyle = mergeAll(flatten([styles.BUTTON_TEXT, textStyleOverride]));
    this.iconStyle = mergeAll(flatten([styles.BUTTON_ICON, iconStyleOverride])); */

  }

  setModalVisible = (visible) => {
    

    this.state.button1 = true;
    this.state.button2 = false;
    this.state.modal = visible;
    
    this.props.callback(this.state);
  }

  render() {
    const { modalVisible, icon, title, message, button1Label, button1Link, button1Icon, button2Label, button2Link, button2Icon  } = this.props;

    return (
      <View style={MODAL_CENTER_VIEW}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={MODAL_CENTER_VIEW}>
            <View style={MODAL_VIEW}>

              {icon !="" && 
                <View style={MODAL_ICON_CONTAINER}>
                  <View>
                    <Image source={icons[icon]} />
                  </View>
                </View>
              }
              <View style={MODAL_TEXT_CONTAINER}>
                <Text text={title} style={MODAL_TITLE} />
                <Text text={message} style={MODAL_TEXT} />
              </View>


              <View style={MODAL_BUTTON_CONTAINER}>
                <TouchableHighlight
                  style={MODAL_BUTTON }
                  onPress={() =>{ this.setModalVisible(false)}}
              >
                  <Text text={button1Label} style={MODAL_BUTTON_TEXT} /> 
                </TouchableHighlight>
              </View>

              
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const MODAL_TEXT_BASE =  {
  marginBottom: 15,
  textAlign: "center"
}
const MODAL_CENTER_VIEW =   {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: color.overlay
}
const MODAL_VIEW = {
  margin: 40,
  backgroundColor: "white",
  borderRadius: 20,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
};

const MODAL_ICON_CONTAINER= {
  marginTop: 25,
};

const MODAL_TEXT_CONTAINER = {
  paddingTop: 20,
  paddingLeft: 13,
  paddingRight: 13,
};

const MODAL_BUTTON_CONTAINER = {
  borderColor: color.input_border,
  borderTopWidth: 1,
  alignSelf: 'stretch', 
  paddingTop: 8,
  paddingBottom: 10,
};

const MODAL_TITLE = {
  ...MODAL_TEXT_BASE,
  fontSize: font.h4,
  fontWeight:'bold',
};
const MODAL_TEXT = {
  ...MODAL_TEXT_BASE,
  fontSize: font.text,
  fontFamily: typography.regular,
  lineHeight:25,
};
  
const MODAL_BUTTON ={
  padding: 10,
};

const MODAL_BUTTON_TEXT= {
  textAlign: "center",
  color:color.secondary,
  fontSize: font.h3,
  fontFamily: typography.regular,
};
