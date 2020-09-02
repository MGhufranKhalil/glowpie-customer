#!/bin/bash

# requires npm install -g yo generator-rn-toolbox
yo rn-toolbox:assets --projectName GlowPieConsumer --icon ../assets/icon/business.png --android
yo rn-toolbox:assets --projectName GlowPieConsumer --icon ../assets/icon/business.png --ios
yo rn-toolbox:assets --projectName GlowPieConsumer --splash ../assets/splash/business.psd --android
yo rn-toolbox:assets --projectName GlowPieConsumer --splash ../assets/splash/business.psd --ios
yo rn-toolbox:assets --projectName GlowPieConsumer --icon ../assets/icon/business.png --splash ../assets/splash/business.psd --store
yo rn-toolbox:assets --projectName GlowPieConsumer --android-notification-icon ../assets/icon/business.png
