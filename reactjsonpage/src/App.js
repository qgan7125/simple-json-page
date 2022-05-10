import './App.css';
import _solr_base from './config';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function App() {
  const { id } = useParams();

  const [jsonData, setData] = useState();

  async function fetchJSON(method = "GET") {
    if (!id) {
      setData("Please enter the identifier!");
      return
    }

    const headers = { "Accept": "application/json" };
    const url = _solr_base + encodeURIComponent(id) + `?format=full`;

    try {
      await fetch(url, {
        method: method,
        headers: headers
      })
        .then(res => res.json())
        .then(data => setData(data))
    } catch (err) {
      console.log("Error: ", err);
      setData("Wrong Identifier!");
    }
  }

  useEffect(() => {
    fetchJSON()
  })

  return (
    <textarea value={JSON.stringify(jsonData, null, 4)}></textarea>
    // <Treebeard data={{name:"root", toggled:true, jsonData}} />
  )

}

export default App;
