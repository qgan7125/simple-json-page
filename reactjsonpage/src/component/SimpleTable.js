import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
function SimpleTable (props) {
  const [rows, setRows] = useState([]);
  const [data, setData] = useState(props.data);

  useEffect(() => {
        preprocessJSON(data);
        setRows(scanJSON(data, null));
  }, []);

  const preprocessJSON = (json) => {
    //for object as value: convert object to concatenated text
    for (var key in json) {
      if (key === "resolved_content") {
        let value = json[key];
        if ("description" in value) {
          if ("log" in value["description"]) {
            //combine the logging data
            let combined = [];
            for (let time of value["description"]["log"]) {
              let { type: type, timestamp: ts } = time;
              combined.push(type + ": " + ts);
            }
            value["description"]["log"] = combined; //update to flattened version
          }
          if ("contributors" in value["description"]) {
            let combined = [];
            for (let person of value["description"]["contributors"]) {
              let {
                "@type": type,
                roleName: roleName,
                contributor: contribObj,
              } = person;
              let names = [];
              for (let contribPerson of contribObj) {
                if ("name" in contribPerson) {
                  names.push(contribPerson["name"]);
                }
              }
              if (names.length === 0) {
                combined.push(roleName + ": " + "N/A");
              } else {
                combined.push(roleName + ": " + names.join(","));
              }
            }
            value["description"]["contributors"] = combined;
          }
          if (
            "geoLocation" in value["description"] &&
            "geo" in value["description"]["geoLocation"]
          ) {
            let combined = [];
            for (let location of value["description"]["geoLocation"]["geo"]) {
              let { latitude: latitude, longitude: longitude } = location;
              combined.push("(" + latitude + "," + longitude + ")");
            }
            value["description"]["geoLocation"]["geo"] = combined;
          }
        }
      }
    }
  };

  const tableRows = [];
  const scanJSON = (json, lastKey) => {
    for (var key in json) {
      let value = json[key];
      if (value != null && !key.toString().startsWith("@")) {
        if (typeof value === "object") {
          if (Array.isArray(value)) {
            //array as value
            let nested = false;
            for (var i = 0; i < value.length; i++) {
              if (typeof value[i] === "object") {
                nested = true; //object array
                break;
              }
            }
            if (!nested) {
              //console.log("key "+key+ " value "+value);
              let toPrintValue = value.join(",");
              if (value.length === 0) {
                toPrintValue = "-";
              }
              tableRows.push(
                <tr>
                  <td>{key}</td>
                  <td>{toPrintValue}</td>
                </tr>
              );
            } else {
              //object array
              for (var i = 0; i < value.length; i++) {
                let updatedKey = key;
                if (lastKey != null) {
                  updatedKey = lastKey + "_" + key;
                }
                scanJSON(value[i], updatedKey);
              }
            }
          } else {
            //non-array type object
            let updatedKey = key;
            if (lastKey != null) {
              updatedKey = lastKey + "_" + key;
            }
            scanJSON(value, updatedKey);
          }
        } else {
          let toPrintKey;
          if (lastKey != null) {
            toPrintKey = lastKey + "_" + key;
            if (toPrintKey.split("_").length > 2) {
              toPrintKey = toPrintKey.split("_").slice(-2).join("_");
            }
          } else {
            toPrintKey = key;
          }
          tableRows.push(
            <tr>
              <td>{toPrintKey}</td>
              <td>{value}</td>
            </tr>
          );
        }
      }
    }
    return tableRows;
  };

  return (
    <div>
      <Container>
        <Card style={{ width: "60rem" }}>
          <Card.Header>Description</Card.Header>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Variable</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </Card>
      </Container>
    </div>
  );
}

export default SimpleTable;
