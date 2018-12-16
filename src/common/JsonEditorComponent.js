import React from 'react';
import JsonEditor from 'jsoneditor/dist/jsoneditor';
import PubSub from 'pubsub-js';

import { JSON_EDITOR_GET_DATA_EVENT } from './common.props';

export default class JsonEditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.jsonEle = React.createRef();
    }

    componentDidMount() {
        let editorOpts = this.props.options || {};
        let editorJson = this.props.json || {};
        this.jsonEle.current.style.height = this.props.height;
        this.editor = new JsonEditor(this.jsonEle.current, editorOpts);
        this.editor.set(editorJson);
        this.getJsonDataSubscription = PubSub.subscribe(JSON_EDITOR_GET_DATA_EVENT, this.getJSONData.bind(this));
    }

    componentWillUnmount() {
        if(this.getJsonDataSubscription) {
            PubSub.unsubscribe(this.getJsonDataSubscription)
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.json) {
            this.editor.set(nextProps.json);
        }
    }

    getJSONData() {
        if(this.props.getJsonCallback && typeof this.props.getJsonCallback == "function") {
            try {
                let editorData = this.editor.get();
                this.props.getJsonCallback(editorData);
            } catch(err) {
                console.error("Invalid JSON inside JSONEditor");
                this.props.getJsonCallback(null);
            }
        }
    }

    render() {
        return (
            <div ref={this.jsonEle}></div>
        );
    }
}