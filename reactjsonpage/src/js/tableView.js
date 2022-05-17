import HtmlJsonTable from "react-json-to-html-table"
import "../css/table.css";
import {
    Card
} from 'react-bootstrap';
const fields = ["id", "authority_id", "primary_key", "item_type", "resolved_content"];

function TableView(props) {
    const { data } = props;

    // filter the original json data to include only specify fields.
    const selectedFields = Object.fromEntries(Object.entries(data).filter(([key]) => fields.includes(key)));

    /**
     * A recusion method to concatenate the parent key and children key
     *  
     * @param {*} prevKey, the parent key
     * @param {*} jsonData, the current json data
     * @returns 
     */
    function createTable(prevKey, jsonData) {
        let result = {};
        for (let key of Object.keys(jsonData)) {
            // remove the empty fields
            if (jsonData[key].length === 0) {
                continue;
            }
            const newKey = prevKey + " " + key;

            // if the child is a hashtable or array
            // deal with the child object
            if (typeof jsonData[key] === 'object') {
                // if the child is an arrary
                if (Array.isArray(jsonData[key])) {
                    // concatenate pure string array
                    if (typeof jsonData[key][0] === 'string') {
                        result[newKey] = jsonData[key].join(', ');
                    } else {
                        // if the value is object array, do string manipulation
                        const list = jsonData[key].map(v => JSON.stringify(v).replaceAll(/"|{|}/g, "")).join('\r\n')
                        result[newKey] = list;
                    }
                } else {
                    // do recursion to children 
                    result = Object.assign({}, result, createTable(newKey, jsonData[key]));
                }
            } else {
                result[newKey] = jsonData[key];
            }
        }
        return result;
    }

    /**
     * A function to manipulate the field keys
     * @param {*} key a string of field key
     * @returns 
     */
    function wellFormatKey(key) {
        const newKey = key.replace('resolved_content', "").replace(" ", "");
        return newKey.split(' ').map(word => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ');
    }

    // apply functions to manipulate the json data
    const newFieldsDict = createTable("", selectedFields)
    const updateKeyDict = {}
    for (let key in newFieldsDict) {
        const value = newFieldsDict[key];
        updateKeyDict[wellFormatKey(key)] = value;
    }

    return (
        <Card >
            <Card.Header><b>Description</b></Card.Header>
            <div style={{ minWidth: "800px", padding: "10px" }}>
                <HtmlJsonTable data={updateKeyDict} className="table table-sm table-striped table-responsive table-hover " />
            </div>
        </Card>
    )
}

export default TableView;