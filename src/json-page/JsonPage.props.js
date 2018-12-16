import React from "react";

import Utils from '../lib/util';
import CsvJsonTab from './csv-json/CsvJsonTab';
import JsonCsvTab from "./json-csv/JsonCsvTab";

const PARENT_PATH = 'json';

export const SIDEBAR_LINKS = [
  {
    address: `/${PARENT_PATH}/`,
    uniqueKey: 'Sidebar_' + Utils.generateRandomString(5),
    handlerComponent: CsvJsonTab,
    displayLink: false,
    icon: <i class="far fa-newspaper"></i>
  },
  {
    display: 'CSV-JSON',
    address: `/${PARENT_PATH}/csv-json`,
    uniqueKey: 'Sidebar_' + Utils.generateRandomString(5),
    handlerComponent: CsvJsonTab,
    displayLink: true,
    icon: <i class="far fa-newspaper"></i>
  },
  {
    display: 'JSON-CSV',
    address: `/${PARENT_PATH}/json-csv`,
    uniqueKey: 'Sidebar_' + Utils.generateRandomString(5),
    handlerComponent: JsonCsvTab,
    displayLink: true,
    icon: <i class="fas fa-code"></i>
  }
];