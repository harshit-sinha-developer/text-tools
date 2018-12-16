import React from "react";
import PubSub from "pubsub-js";
import Utility from "../lib/util";
import styles from "./styles/JsonTable.less";
import { JSON_TABLE_DOWNLOAD_EVENT } from "./common.props";

export default class JsonTable extends React.Component {
    constructor(props) {
        super(props);
        this.getTable = this.getTable.bind(this);
        this.jsonTableEle = React.createRef();
    }

    componentDidMount() {
        this.downloadTableSubscription = PubSub.subscribe(JSON_TABLE_DOWNLOAD_EVENT, this.downloadTable.bind(this));
    }

    componentWillUnmount() {
        if(this.downloadTableSubscription) {
            PubSub.unsubscribe(this.downloadTableSubscription);
        }
    }

    downloadTable() {
        Utility.exportTableToCsv(this.jsonTableEle.current, 'ConvertedCsv.csv')
    }

    getTable(tableData) {
        let headers = [];
        let headersReverseMap = {};
        let rows = [];
        function addHeader(header) {
            if(!headers.includes(header)) {
                headers.push(header);
                headersReverseMap[header] = headers.indexOf(header);
            }
        }
        
        if(tableData instanceof Array) {
            tableData.forEach(data => {
                let row = [];
                Object.keys(data).forEach(dataKey => {
                    addHeader(dataKey);
                    row[headersReverseMap[dataKey]] = data[dataKey];
                });
                
                for(let i=0; i < headers.length; i++) {
                    row[i] = Utility.isNill(row[i]) ? "" : row[i];
                }

                rows.push(row);
            });
        }
        return { headers, rows };
    }

    getTableHtml() {
        let { headers, rows } = this.getTable(this.props.tableData);
        let headersList = headers.map(header => {
            return (
                <th key={"JTable_Head_" + Utility.generateRandomString(5)}>{header}</th>
            );
        })
        
        let rowsList = rows.map(row => {
            let rowColumns = row.map(rowColumn => {
                return <td key={"JTable_Cell" + Utility.generateRandomString(5)}>{"" + rowColumn}</td>
            });
            return <tr key={"JTable_Row" + Utility.generateRandomString(5)}>{rowColumns}</tr>
        });
        return (
            <table class="table table-bordered" ref={this.jsonTableEle}>
                <thead class="thead-dark">
                    <tr>{headersList}</tr>
                </thead>
                <tbody>
                    {rowsList}
                </tbody>
            </table>
        );
        
    }

    render() {
        return (
            <div className={styles.json_table}>
                {this.getTableHtml()}
            </div>
        );
    }
}