import SafariView from 'react-native-safari-view';
import { Platform, Linking } from 'react-native';
import { DropDownManager } from '../utils/DropDownManager';

const typeform = 'https://rafique3.typeform.com/to/rquygr';

export const openURL = url => {
  Platform.OS === 'ios' ? openSafariView(url) : openAndroidBrowser(url);
};

const openSafariView = url => {
  SafariView.isAvailable()
    .then(
      SafariView.show({
        url: url
      })
    )
    .catch(() =>
      DropDownManager.getDropDown().alertWithType(
        'error',
        'Error',
        'Oops, could not open Safari at this time.'
      )
    );
};

const openAndroidBrowser = url => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        DropDownManager.getDropDown().alertWithType(
          'error',
          'Error',
          'Can\'t handle url: ' + url
        );
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err =>
      DropDownManager.getDropDown().alertWithType('error', 'Error', err)
    );
};

export const openTypeform = () => {
  openURL(typeform);
};
