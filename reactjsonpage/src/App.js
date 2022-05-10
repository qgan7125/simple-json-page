import "./App.css";
import _solr_base from "./config";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TreeView from "react-treeview";
function App() {
  const { id } = useParams();

  const [jsonData, setData] = useState();
  const [trees, setTrees] = useState([]);

  function scanJSON(json) {
    const trees = [];
    for (var key in json) {
      let value = json[key];
      if (value != null) {
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
              trees.push(
                <TreeView nodeLabel={key}>{value.join(",")}</TreeView>
              );
            } else {
              //object array
              for (var i = 0; i < value.length; i++) {
                trees.push(
                  <TreeView nodeLabel={key + i}>{scanJSON(value[i])}</TreeView>
                );
              }
            }
          } else {
            trees.push(<TreeView nodeLabel={key}>{scanJSON(value)}</TreeView>);
          }
        } else {
          trees.push(
            <TreeView nodeLabel={key} defaultCollapsed={false}>
              {value}
            </TreeView>
          );
        }
      }
    }
    return trees;
  }
  async function fetchJSON(method = "GET") {
    if (!id) {
      setData("Please enter the identifier!");
      return;
    }

    const headers = { Accept: "application/json" };
    const url = _solr_base + encodeURIComponent(id);

    try {
      await fetch(url, {
        method: method,
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    } catch (err) {
      console.log("Error: ", err);
      setData("Wrong Identifier!");
    }
  }

  useEffect(() => {
    fetchJSON();
    setTrees(scanJSON(jsonData));
  }, []);

  return (
    <div>
      {/* <textarea value={JSON.stringify(jsonData, null, 4)}></textarea> */}
      {trees}
    </div>
  );
}

export default App;
