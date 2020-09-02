import {Device, Dimensions, Platform, StatusBar} from 'react-native';
import Config from 'react-native-config';
import {Client} from 'bugsnag-react-native';

const client =
  Config.BUGSNAG_ID && Config.BUGSNAG_ID.length
    ? new Client(Config.BUGSNAG_ID)
    : null;

const noop = () => undefined;

// simple trace logs
const log = msg => client.notify(new Error(msg));

// notifications for bug or exceptions
const notify = error =>
  client.notify(new Error(error), function(report) {
    report.metadata = {};
  });

export const diags = {
  log: client ? log : noop,
  notify: client ? notify : noop,
};
