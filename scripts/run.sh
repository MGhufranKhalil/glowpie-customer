#!/bin/bash

VERSION=${1:-SE}
react-native run-ios --simulator="iPhone $VERSION"
