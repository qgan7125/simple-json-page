import "./App.css";
import _solr_base from "./config";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateJSONTree from "./CreateJSONTree";
import { JSONToHTMLTable } from "@kevincobain2000/json-to-html-table";
import sampleData from "./records/IGSN-ODP02DGLR.json";

function App() {
  const { id } = useParams();

  const [jsonData, setData] = useState();


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
        .then((data) => {
          setData(data);
        });
        
    } catch (err) {
      console.log("Error: ", err);
      setData("Wrong Identifier!");
    }
    
  }

  useEffect(async() => {
   fetchJSON();

  },[]);

  return (
    <div>
      {/* <textarea value={JSON.stringify(jsonData, null, 4)}></textarea> */}
      {/* {CreateJSONTree(sampleData)} */}
      <JSONToHTMLTable data={sampleData} tableClassName="table table-condensed table-sm" />
    </div>
  );
}

export default App;
