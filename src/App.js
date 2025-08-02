import "./style.css";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import DraggableSearchBar from "./DraggableSearchBar";
import { useEffect, useRef, useState } from "react";

export default function App() {
  // Your custom markers
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp:
        "📍 Notre-Dame Cathedral – Paris’s iconic Gothic cathedral on the Île de la Cité.",
    },
    {
      geocode: [48.85, 2.3522],
      popUp:
        "📍 Latin Quarter – Historic district known for bookshops, cafes, and Sorbonne University.",
    },
    {
      geocode: [48.855, 2.34],
      popUp:
        "📍 Seine River Walk – Beautiful riverside perfect for boat tours and sightseeing.",
    },
  ];

  const [dynamicMarkers, setDynamicMarkers] = useState([]);

  const customIcon = new Icon({
    iconUrl: require("./img/placeholder.png"),
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = (cluster) => {
    const markersCount = cluster.getChildCount();
    return divIcon({
      html: `<div class="cluster-icon">${markersCount}</div>`,
      className: "custom-cluster",
      iconSize: point(40, 40, true),
      iconAnchor: point(20, 20, true),
      popupAnchor: point(0, -20),
    });
  };

  const [showFooter, setShowFooter] = useState(true);
  const footerTimeout = useRef(null);

  useEffect(() => {
    footerTimeout.current = setTimeout(() => setShowFooter(false), 2000);

    const handleMouseMove = (e) => {
      if (window.innerHeight - e.clientY < 80) {
        setShowFooter(true);
        clearTimeout(footerTimeout.current);
        footerTimeout.current = setTimeout(() => setShowFooter(false), 2000);
      }
    };

    const handleMapInteraction = () => setShowFooter(false);

    window.addEventListener("mousemove", handleMouseMove);
    document
      .querySelector(".leaflet-container")
      ?.addEventListener("mousedown", handleMapInteraction);

    return () => {
      clearTimeout(footerTimeout.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document
        .querySelector(".leaflet-container")
        ?.removeEventListener("mousedown", handleMapInteraction);
    };
  }, []);

  const latRef = useRef();
  const lngRef = useRef();
  const descRef = useRef();

  return (
    <>
      <div className="marker-form">
        <input type="number" step="any" placeholder="Latitude" ref={latRef} />
        <input type="number" step="any" placeholder="Longitude" ref={lngRef} />
        <input type="text" placeholder="Description" ref={descRef} />
        <button
          onClick={() => {
            const lat = parseFloat(latRef.current.value);
            const lng = parseFloat(lngRef.current.value);
            const desc = descRef.current.value;
            if (!isNaN(lat) && !isNaN(lng) && desc.trim()) {
              setDynamicMarkers([
                ...dynamicMarkers,
                { geocode: [lat, lng], popUp: `📌 ${desc}` },
              ]);
              latRef.current.value = "";
              lngRef.current.value = "";
              descRef.current.value = "";
            }
          }}
        >
          Add Marker
        </button>
      </div>
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <DraggableSearchBar />

        <MarkerClusterGroup
          chunkedLoading={true}
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        <ZoomControl position="bottomright" />
      </MapContainer>
      {showFooter && (
        <footer className="app-footer">
          <h6>React Leaflet App ~ Developed By : Mohit Bugalia</h6>
        </footer>
      )}
    </>
  );
}
