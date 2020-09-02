#!/bin/bash

echo Facebook Application Hash
keytool -exportcert -alias appsignkey -keystore ./android/release-key.jks | openssl sha1 -binary | openssl base64
