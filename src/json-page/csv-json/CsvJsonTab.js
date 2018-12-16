import React from "react";
import PubSub from "pubsub-js";

import JsonTable from "../../common/JsonTable";
import JsonEditorComponent from "../../common/JsonEditorComponent";
import UploadFileComponent from "../../common/UploadFileComponent";
import { FILE_UPLOAD_DATA_AVAILABLE } from "../../common/common.props";
import Utility from "../../lib/util";

export default class CsvJsonTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null,
      editorData: []
    };
    this.jsonEditorOptions = {
      mode: 'code'
    }
  }

  componentDidMount() {
    this.fileUploadDataSubscription = PubSub.subscribe(FILE_UPLOAD_DATA_AVAILABLE, this.fileUploadDataHandler.bind(this));
  }

  componentWillUnmount() {
    if(this.fileUploadDataSubscription) {
      PubSub.unsubscribe(this.fileUploadDataSubscription);
    }
  }

  fileUploadDataHandler(event, data) { 
    let lineSeparator = data.content.includes('↵') ? '↵' : '\n';
    let tableData = Utility.convertCsvToJson(data.content, lineSeparator);
    console.log("tableDAta", tableData, data.content);
    this.setState({ tableData });
  }

  convertCsvJson() {
    this.setState({ editorData: this.state.tableData });
  }

  downloadJson() {

  }

  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-7">
            <UploadFileComponent fileType=".csv" labelText="Upload CSV to Convert"/>
            <div class="container mt-2">
              <JsonTable tableData={this.state.tableData}/>
            </div>
          </div>
          <div class="col-lg-5 border-left">
            <JsonEditorComponent options={this.jsonEditorOptions} height="90vh" json={this.state.tableData}/>
          </div>
        </div>
      </div>
    );
  }
}