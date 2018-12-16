import React from "react";
import PubSub from "pubsub-js";

import Utility from "../lib/util";
import { FILE_UPLOAD_DATA_AVAILABLE } from "./common.props";

export default class UploadFileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.fileReader = null;
        this.labelText = this.props.labelText || 'Choose file...';
        this.invalidText = this.props.invalidText || 'Invalid file';
        this.uniqueKey = Utility.generateRandomString(5);
    }

    handleFileChosen(file) {
        this.fileReader = new FileReader();
        this.fileReader.onload = (event) => {
            let content = this.fileReader.result;
            PubSub.publish(FILE_UPLOAD_DATA_AVAILABLE, { content: content });
        }
        this.fileReader.readAsText(file);
    }

    render() {
        return (
            <div class="custom-file">
                <input class="custom-file-input" id={"validatedCustomFile_"+ this.uniqueKey } type='file' accept={this.props.fileType} onChange={e => this.handleFileChosen(e.target.files[0])}/>
                <label class="custom-file-label" for={"validatedCustomFile_"+ this.uniqueKey}>{this.labelText}</label>
                <div class="invalid-feedback">{this.invalidText}</div>
            </div>
        );
    }
}