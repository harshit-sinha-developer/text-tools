import React from "react";
import PubSub from "pubsub-js";

import JsonEditorComponent from "../../common/JsonEditorComponent"
import { JSON_EDITOR_GET_DATA_EVENT, JSON_TABLE_DOWNLOAD_EVENT } from "../../common/common.props";
import JsonTable from "../../common/JsonTable";

export default class JsonCsvTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: {}
    };
    this.jsonEditorOptions = {
      mode: 'code'
    }
  }

  getJsonCallback(data) {
    console.log("Json data",data);
    this.setState({
      tableData: data
    });
  }

  convertJsonCsv() {
    PubSub.publish(JSON_EDITOR_GET_DATA_EVENT, {});
  }

  downloadCsv() {
    PubSub.publish(JSON_TABLE_DOWNLOAD_EVENT, {});
  }

  render() {
    return (
      <div class="container-fluid pt-1">
        <div class="row">
          <div class="col-lg-5">
            <JsonEditorComponent options={this.jsonEditorOptions} getJsonCallback={this.getJsonCallback.bind(this)} height="90vh"/>
          </div>
          <div class="col-lg-1">
            <button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.convertJsonCsv}><i class="fas fa-caret-right"></i></button>
            <button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.downloadCsv}><i class="fas fa-download"></i></button>
          </div>
          <div class="col-lg-6 border-left">
            <JsonTable tableData={this.state.tableData}/>
          </div>
        </div>
      </div>
    );
  }
}