/**
 * Using react leafflet to render the map
 * see  link:
 *  https://react-leaflet.js.org/
 */
import {
    MapContainer,
    TileLayer,
    Marker
} from 'react-leaflet';
import '../css/map.css';

function Map(props) {

    /**
     * A function to find the geo information valuess
     * @param {*} data the orignal json data
     * @param {*} field the field to be searched 
     * @returns 
     */
    function findGeoInfo(data, field) {
        if (!data) {
            return
        }
        const fieldStart = JSON.stringify(data).indexOf(field);
        const fieldLength = JSON.stringify(data).substring(fieldStart).indexOf(',');
        const fieldValue = JSON.stringify(data).substring(fieldStart, fieldStart + fieldLength);
        return parseFloat(fieldValue.split(':')[1].replaceAll('"', ""));
    }

    const position = [findGeoInfo(props.data, 'latitude'), findGeoInfo(props.data, 'longitude')]

    return (
        !position.includes(undefined) ?
            <MapContainer center={position} zoom={6} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                </Marker>
            </MapContainer>
            : null
    )
}

export default Map;