import './css/App.css';
import _solr_base from './config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableView from './js/tableView';

function App() {
  // Get the current URL parameter
  const url = useParams();
  const id = url['*'];
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
  }, [id]);

  return (
    <>
      <TableView data={jsonData}/>
      <textarea style={{width: "100%", height: "100vh"}} value={JSON.stringify(jsonData, null, 4)} readOnly></textarea>
    </>
  )
}

export default App;
