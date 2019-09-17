import axios from 'axios';
import { AsyncStorage } from 'react-native';
import Sentry from 'sentry-expo';

import config from '../config';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDZekUBPhDQ_nGDCQbhDhcOeaHiAlIaUOs',
  authDomain: 'react-native-practice-48adb.firebaseapp.com',
  databaseURL: 'https://react-native-practice-48adb.firebaseio.com',
  projectId: 'react-native-practice-48adb',
  storageBucket: '',
  messagingSenderId: '73236127840',
  appId: '1:73236127840:web:3caea6da488477ad'
};

firebase.initializeApp(firebaseConfig);

class HttpService {
  constructor(
    options = {
      baseURL: firebaseConfig.databaseURL,
      timeout: 1000,
      headers: {
        //Authorization: Bearer token
      }
    }
  ) {
    this.client = axios.create(options);
    this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
    this.unauthorizedCallback = () => {};
  }

  attachHeaders(headers) {
    Object.assign(this.client.defaults.headers, headers);
  }

  removeHeaders(headerKeys) {
    headerKeys.forEach(key => delete this.client.defaults.headers[key]);
  }

  handleSuccessResponse(response) {
    return response;
  }

  handleErrorResponse = error => {
    const { status } = error.response;

    Sentry.captureException(error);

    switch (status) {
    case 401:
      AsyncStorage.clear();
      this.unauthorizedCallback();

      break;
    default:
      break;
    }

    return Promise.reject(error);
  };

  setUnauthorizedCallback(callback) {
    this.unauthorizedCallback = callback;
  }
}

const options = {
  baseURL: config.API_BASE_URL
};
const httpService = new HttpService(options);

export default httpService;
