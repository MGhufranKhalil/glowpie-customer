#!/bin/bash

export TARGET="staging"
export APP_RELEASE_VERSION="1.0.0"
export APP_BUILD_CODE=`date +%Y%m%d%H`
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
cd android && ENVFILE=.env.staging ./gradlew assembleRelease

### if errors, check this
### https://www.instamobile.io/android-development/generate-react-native-release-build-android/

### for security, use this in build.gradle
# storePassword System.console().readLine("\nKeystore password:")
# keyAlias System.console().readLine("\nAlias: ")
# keyPassword System.console().readLine("\Alias password: ")


### somethings to try
# cd android && ENVFILE=.env.staging ./gradlew assembleRelease
# modify android/gradle.properties -> android.enableAapt2=false

#
