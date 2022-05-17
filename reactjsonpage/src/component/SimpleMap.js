import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

function SimpleMap(props) {
  const [location, setLocation ] = useState(props.location)

  return (
    <div>
      {location && (
        <Card>
          <Card.Header>Location</Card.Header>
          <MapContainer
            style={{ height: "300px" }}
            center={location}
            zoom={6.5}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={location}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              {/* <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup> */}
            </Marker>
          </MapContainer>
        </Card>
      )}
    </div>
  );
}

export default SimpleMap;
