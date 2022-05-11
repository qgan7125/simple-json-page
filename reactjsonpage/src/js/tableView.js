import React from 'react';

const fields = ["id", "authority_id", "primary_key", "item_type", "resolved_content"];

function TableView(props) {
    const { data } = props;

    const selectedFields = Object.fromEntries(Object.entries(data).filter(([key]) => fields.includes(key)));

    function createTable(jsonData){

    }

    return (
        <table>
            <thead>
                <tr>
                    <th className='col-sm-4'>
                        Fields
                    </th>
                    <th className='col-sm-8'>
                        Value(s)
                    </th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(selectedFields).map((key, i) => (
                    <tr key={i}>
                        <td>{key}</td>
                        <td>{JSON.stringify(selectedFields[key]).replaceAll('"', "")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableView;