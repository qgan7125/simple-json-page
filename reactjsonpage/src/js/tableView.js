import React from 'react';
import HtmlJsonTable from "react-json-to-html-table"
import "../css/table.css";
const fields = ["id", "authority_id", "primary_key", "item_type", "resolved_content"];

function TableView(props) {
    const { data } = props;

    const selectedFields = Object.fromEntries(Object.entries(data).filter(([key]) => fields.includes(key)));

    function createTable(prevKey, jsonData) {
        let result = {};
        for (let key of Object.keys(jsonData)) {
            if (jsonData[key].length === 0) {
                continue;
            }
            const newKey = prevKey + " " + key;
            if (typeof jsonData[key] === 'object') {
                if (Array.isArray(jsonData[key])) {
                    if (typeof jsonData[key][0] === 'string') {
                        result[newKey] = jsonData[key].join(', ');
                    } else {
                        let list = jsonData[key].map(v => JSON.stringify(v)).join('\r\n')
                        result[newKey] = list;
                    }
                } else {
                    result = Object.assign({}, result, createTable(newKey, jsonData[key]));
                }
            } else {
                result[newKey] = jsonData[key];
            }
        }
        return result;
    }

    function wellFormatKey(key) {
        const newKey = key.replace('resolved_content', "").replace('description', "").replace('supplementMetadata', "").replace(" ", "");
        return newKey.split(' ').map(word => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ');
    }

    const newFieldsDict = createTable("", selectedFields)
    const updateKeyDict = {}
    for (let key in newFieldsDict) {
        const value = newFieldsDict[key];
        updateKeyDict[wellFormatKey(key)] = value;
    }

    return (
        <HtmlJsonTable data={updateKeyDict} className=" table-sm table-striped table-bordered table-responsive table-hover " />
    )
}

export default TableView;