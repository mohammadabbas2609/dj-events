import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoibW9oYW1tYWRhYmJhczI2MDkiLCJhIjoiY2tzNXQzYjA5MDUwbDMwb2NiM2x2d3ZvYyJ9.aqHBSpxMDDbM7Z4-vHlv_g";

const Map = ({ longitude, latitude }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(longitude ? +longitude : 0);
  const [lat, setLat] = useState(latitude ? +latitude : 0);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
    });
  });

  useEffect(() => {
    if (map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="map">
      <div className="sidebar">
        Longitude: {lng} | Latitude : {lat} | Zoom : {zoom}
      </div>
      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
};

export default Map;
