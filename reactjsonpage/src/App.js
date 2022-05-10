import './App.css';
import _solr_base from './config';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

function App() {
  // Get the current URL parameter
  const { id } = useParams();
  const container = useRef();
  const [jsonData, setData] = useState("");

  useEffect(() => {
    /**
     * A async function to fetch the data 
     * @param {*} method 
     * @returns 
     */
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
            setData("");
            // add jsonld script into head
            const script = document.createElement('script');
            script.type = "application/ld+json";
            script.text = JSON.stringify(data, null, 4);
            document.head.appendChild(script);

            // modify the current div element 
            container.current.appendChild(window.prettyPrint(data))
          })
      } catch (err) {
        console.log("Error: ", err);
        setData("Wrong Identifier!");
      }
    }
    fetchJSON();
  }, [id]);

  return (
    <>
      {jsonData}
      <div ref={container} />
    </>
  )
}

export default App;
