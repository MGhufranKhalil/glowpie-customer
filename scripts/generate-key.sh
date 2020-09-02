#!/bin/bash

echo Generating new Release signing key for android
keytool -genkey -v -keystore android/release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias appsignkey
