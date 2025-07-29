import { useEffect, useRef, useState } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function DraggableSearchBar() {
  const map = useMap();
  const [position, setPosition] = useState({
    top: 24,
    left: window.innerWidth / 2 - 180,
  });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  // Add the search control only once
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      searchLabel: "Enter a location...",
      showMarker: true,
      showPopup: true,
      marker: {
        icon: L.icon({
          iconUrl: require("./img/placeholder.png"),
          iconSize: [38, 38],
        }),
      },
      popupFormat: ({ query, result }) => result.label,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
    // eslint-disable-next-line
  }, [map]);

  // Drag logic
  useEffect(() => {
    const searchBar = document.querySelector(".leaflet-control-geosearch");
    if (!searchBar) return;

    // Set initial position and style
    searchBar.style.top = position.top + "px";
    searchBar.style.left = position.left + "px";
    searchBar.style.right = "auto";
    searchBar.style.bottom = "auto";
    searchBar.style.transform = "none";
    searchBar.style.position = "fixed";
    searchBar.style.zIndex = 3000;
    searchBar.style.cursor = dragging ? "grabbing" : "grab";
    searchBar.style.pointerEvents = "auto";

    // Drag handlers
    const handleMouseDown = (e) => {
      // Only drag if not clicking input or button
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "BUTTON" ||
        e.target.classList.contains("reset") ||
        e.target.classList.contains("clear")
      ) {
        return;
      }
      setDragging(true);
      offset.current = {
        x: e.clientX - position.left,
        y: e.clientY - position.top,
      };
      document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e) => {
      if (dragging) {
        setPosition((prev) => ({
          left: Math.max(
            0,
            Math.min(window.innerWidth - 350, e.clientX - offset.current.x)
          ),
          top: Math.max(
            0,
            Math.min(window.innerHeight - 60, e.clientY - offset.current.y)
          ),
        }));
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      document.body.style.userSelect = "";
    };

    searchBar.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Cleanup
    return () => {
      searchBar.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [position, dragging]);

  // Update position when state changes
  useEffect(() => {
    const searchBar = document.querySelector(".leaflet-control-geosearch");
    if (searchBar) {
      searchBar.style.top = position.top + "px";
      searchBar.style.left = position.left + "px";
    }
  }, [position]);

  // Drag shield overlay to block map events while dragging
  return dragging ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2999,
        pointerEvents: "auto",
        background: "transparent",
      }}
    />
  ) : null;
}
