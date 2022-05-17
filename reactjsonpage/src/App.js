import './css/App.css';
import _solr_base from './config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableView from './js/tableView';
import Map from './js/leafFletMap';
import {
  Container,
  Row,
  Col,
  Stack,
  Card
} from 'react-bootstrap';

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
            // modify the current script element rather than add new script
            let script = document.querySelector('script[type="application/ld+json"]');
            if (!script) {
              script = document.createElement('script');
              script.type = "application/ld+json";
              script.text = JSON.stringify(data, null, 4);
              document.head.appendChild(script);
            }else{
              script.text = JSON.stringify(data, null, 4);
            }
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
      <Container fluid>
        <Row>
          <Col >
            <TableView data={jsonData} />
          </Col>
          <Col xs={4}>
            <Stack gap={3}>
              <div>
                <Card style={{ width: "100%" }}>
                  <Card.Header>Citation</Card.Header>
                  test
                </Card>
              </div>
              <div>
                Map Data
                <Map data={jsonData}/>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App;
