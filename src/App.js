import "./style.css";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import DraggableSearchBar from "./DraggableSearchBar";
import DraggableMarkerForm from "./DraggableMarkerForm";
import { useEffect, useRef, useState } from "react";

export default function App() {
  // Predefined marker types with different icons and colors
  const markerTypes = {
    restaurant: { icon: "🍽️", color: "#ff6b6b", name: "Restaurant" },
    hotel: { icon: "🏨", color: "#4ecdc4", name: "Hotel" },
    attraction: { icon: "🏛️", color: "#45b7d1", name: "Attraction" },
    shopping: { icon: "🛍️", color: "#96ceb4", name: "Shopping" },
    transport: { icon: "🚇", color: "#feca57", name: "Transport" },
    hospital: { icon: "🏥", color: "#ff9ff3", name: "Hospital" },
    school: { icon: "🏫", color: "#54a0ff", name: "School" },
    park: { icon: "🌳", color: "#5f27cd", name: "Park" },
    custom: { icon: "📍", color: "#ff6348", name: "Custom" },
  };

  // Your custom markers with enhanced data
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp:
        "Notre-Dame Cathedral – Paris's iconic Gothic cathedral on the Île de la Cité.",
      title: "Notre-Dame Cathedral",
      type: "attraction",
      rating: 4.8,
      website: "https://www.notredamedeparis.fr",
    },
    {
      geocode: [48.85, 2.3522],
      popUp:
        "Latin Quarter – Historic district known for bookshops, cafes, and Sorbonne University.",
      title: "Latin Quarter",
      type: "attraction",
      rating: 4.6,
      website: "https://en.parisinfo.com",
    },
    {
      geocode: [48.855, 2.34],
      popUp:
        "Seine River Walk – Beautiful riverside perfect for boat tours and sightseeing.",
      title: "Seine River Walk",
      type: "park",
      rating: 4.7,
      website: "https://www.paris.fr",
    },
  ];

  const [dynamicMarkers, setDynamicMarkers] = useState([]);
  const [selectedMarkerType, setSelectedMarkerType] = useState("custom");

  // Create custom icon based on marker type
  const createCustomIcon = (type) => {
    const markerInfo = markerTypes[type] || markerTypes.custom;
    return divIcon({
      html: `
        <div class="custom-marker" style="background-color: ${markerInfo.color}">
          <span class="marker-icon">${markerInfo.icon}</span>
          <div class="marker-pulse" style="border-color: ${markerInfo.color}"></div>
        </div>
      `,
      className: "custom-marker-container",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  const createCustomClusterIcon = (cluster) => {
    const markersCount = cluster.getChildCount();
    return divIcon({
      html: `
        <div class="cluster-icon">
          <div class="cluster-inner">
            <span class="cluster-count">${markersCount}</span>
          </div>
          <div class="cluster-ring"></div>
        </div>
      `,
      className: "custom-cluster-container",
      iconSize: point(50, 50, true),
      iconAnchor: point(25, 25, true),
      popupAnchor: point(0, -25),
    });
  };

  const [showFooter, setShowFooter] = useState(true);
  const footerTimeout = useRef(null);

  useEffect(() => {
    footerTimeout.current = setTimeout(() => setShowFooter(false), 3000);

    const handleMouseMove = (e) => {
      if (window.innerHeight - e.clientY < 100) {
        setShowFooter(true);
        clearTimeout(footerTimeout.current);
        footerTimeout.current = setTimeout(() => setShowFooter(false), 3000);
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
  const titleRef = useRef();
  const ratingRef = useRef();

  // Enhanced popup content
  const createPopupContent = (marker) => {
    const markerInfo = markerTypes[marker.type] || markerTypes.custom;
    return `
      <div class="custom-popup">
        <div class="popup-header" style="background: linear-gradient(135deg, ${
          markerInfo.color
        }, ${markerInfo.color}88)">
          <span class="popup-icon">${markerInfo.icon}</span>
          <h3 class="popup-title">${marker.title || "Location"}</h3>
        </div>
        <div class="popup-content">
          <p class="popup-description">${marker.popUp}</p>
          ${
            marker.rating
              ? `
            <div class="popup-rating">
              <span class="rating-stars">${"⭐".repeat(
                Math.floor(marker.rating)
              )}</span>
              <span class="rating-value">${marker.rating}/5</span>
            </div>
          `
              : ""
          }
          <div class="popup-type">
            <span class="type-badge" style="background-color: ${
              markerInfo.color
            }">
              ${markerInfo.name}
            </span>
          </div>
        </div>
      </div>
    `;
  };

  // Combine static and dynamic markers
  const allMarkers = [...markers, ...dynamicMarkers];

  return (
    <>
      <DraggableMarkerForm
        markerTypes={markerTypes}
        selectedMarkerType={selectedMarkerType}
        setSelectedMarkerType={setSelectedMarkerType}
        dynamicMarkers={dynamicMarkers}
        setDynamicMarkers={setDynamicMarkers}
        refs={{ latRef, lngRef, descRef, titleRef, ratingRef }}
      />

      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <DraggableSearchBar />

        <MarkerClusterGroup
          chunkedLoading={true}
          iconCreateFunction={createCustomClusterIcon}
        >
          {allMarkers.map((marker, index) => (
            <Marker
              key={`marker-${index}`}
              position={marker.geocode}
              icon={createCustomIcon(marker.type)}
            >
              <Popup>
                <div
                  dangerouslySetInnerHTML={{
                    __html: createPopupContent(marker),
                  }}
                />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        <ZoomControl position="bottomright" />
      </MapContainer>

      {showFooter && (
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-logo">🗺️</div>
            <div className="footer-text">
              <h6>Interactive Map Experience</h6>
              <p>Crafted with ❤️ by Mohit Bugalia</p>
            </div>
            <div className="footer-stats">
              <span className="stat">
                <strong>{allMarkers.length}</strong> Locations
              </span>
            </div>
          </div>
        </footer>
      )}

      {/* Floating UI Elements */}
      <div className="floating-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>
    </>
  );
}
