import Utils from '../lib/util';

import JsonPage from "../json-page/JsonPage";

export const JSON_EDITOR_GET_DATA_EVENT = 'JSON_EDITOR_' + Utils.generateRandomString(5);

export const JSON_TABLE_DOWNLOAD_EVENT = 'JSON_TABLE_DWNLD_' + Utils.generateRandomString(5);

export const FILE_UPLOAD_DATA_AVAILABLE = 'FILE_UPLOAD_DATA_' + Utils.generateRandomString(5);

export const SITE_TITLE = {
  display: 'Text Tools Service',
  address: '/'
};

export const HEADER_LINKS = [
  {
    address: '/',
    uniqueKey: 'Header_' + Utils.generateRandomString(5),
    displayLink: false,
    isRouteLink: true,
    handlerComponent: JsonPage,
    redirect: '/json'
  },
  {
    display: 'JSON Tools',
    address: '/json',
    uniqueKey: 'Header_' + Utils.generateRandomString(5),
    displayLink: false,
    isRouteLink: true,
    handlerComponent: JsonPage
  },
  {
    display: 'Account',
    address: '/account',
    uniqueKey: 'Header_' + Utils.generateRandomString(5),
    displayLink: false,
    isRouteLink: false
  }
];