import "./App.css";
import _solr_base from "./config";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JSONTree from "./component/JSONTree";
import sampleData from "./records/IGSN-ODP02DGLR.json";
import SimpleTable from "./component/SimpleTable";
import Container from "react-bootstrap/Container";
import SimpleMap from "./component/SimpleMap";
function App() {
  const { id } = useParams();
  const [jsonData, setData] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    async function fetchJSON(method = "GET") {

      // check if there is an identifer
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
          .then(data => {
            setData(data);
            // add jsonld script into head
            const script = document.createElement('script');
            script.type = "application/ld+json";
            script.text = JSON.stringify(data, null, 4);
            document.head.appendChild(script);

          })
      } catch (err) {
        console.log("Error: ", err);
        setData("Wrong Identifier!");
      }
    }
    fetchJSON();
    // console.log(jsonData);
  }, []);

  const updateLocation = (loc)=>{
    //receive the extracted location information 
    setLocation(loc);
  }
  
  return (
    <div class="container">
      <div class="row d-flex justify-content-start">
        {/* <textarea value={JSON.stringify(jsonData, null, 4)}></textarea> */}
        {/* {JSONTree(sampleData)} */}

        <div class="col-sm-9 float-start text-left">
          {jsonData && (
            <SimpleTable
              data={jsonData}
              setLocation={updateLocation}
            ></SimpleTable>
          )}
        </div>
        <div class="col-sm-3">
          {location && <SimpleMap location={location}></SimpleMap>}
        </div>
      </div>
    </div>
  );
}

export default App;
