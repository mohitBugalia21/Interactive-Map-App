import { useEffect, useRef, useState } from "react";

export default function DraggableMarkerForm({ 
  markerTypes,
  selectedMarkerType,
  setSelectedMarkerType,
  dynamicMarkers,
  setDynamicMarkers,
  refs 
}) {
  const [position, setPosition] = useState({
    top: 30,
    right: 30,
  });
  const [dragging, setDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const formRef = useRef(null);

  const { latRef, lngRef, descRef, titleRef, ratingRef } = refs;

  // Drag logic
  useEffect(() => {
    if (!formRef.current) return;

    const form = formRef.current;

    const handleMouseDown = (e) => {
      // Only allow dragging from the header
      if (!e.target.closest('.form-header')) return;
      
      setDragging(true);
      const rect = form.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      document.body.style.userSelect = "none";
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (dragging) {
        const newLeft = Math.max(
          0,
          Math.min(window.innerWidth - 280, e.clientX - offset.current.x)
        );
        const newTop = Math.max(
          0,
          Math.min(window.innerHeight - 400, e.clientY - offset.current.y)
        );
        
        setPosition({
          top: newTop,
          right: window.innerWidth - newLeft - 280, // 280 is form width
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      document.body.style.userSelect = "";
    };

    form.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      form.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleAddMarker = () => {
    const lat = parseFloat(latRef.current.value);
    const lng = parseFloat(lngRef.current.value);
    const desc = descRef.current.value;
    const title = titleRef.current.value;
    const rating = parseFloat(ratingRef.current.value);
    
    if (!isNaN(lat) && !isNaN(lng) && desc.trim()) {
      const newMarker = {
        geocode: [lat, lng],
        popUp: desc,
        title: title || "Custom Location",
        type: selectedMarkerType,
        rating: !isNaN(rating) ? rating : null,
      };
      
      setDynamicMarkers([...dynamicMarkers, newMarker]);
      
      // Clear form
      latRef.current.value = "";
      lngRef.current.value = "";
      descRef.current.value = "";
      titleRef.current.value = "";
      ratingRef.current.value = "";
    } else {
      alert("Please enter valid latitude, longitude, and description!");
    }
  };

  return (
    <>
      <div 
        ref={formRef}
        className={`marker-form ${dragging ? 'dragging' : ''} ${isMinimized ? 'minimized' : ''}`}
        style={{
          top: position.top + "px",
          right: position.right + "px",
        }}
      >
        <div className="form-header">
          <h3>📍 Add Marker</h3>
          <button 
            className="minimize-btn"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? "⬆️" : "⬇️"}
          </button>
        </div>
        
        {!isMinimized && (
          <div className="form-content">
            <div className="form-group">
              <select 
                value={selectedMarkerType} 
                onChange={(e) => setSelectedMarkerType(e.target.value)}
                className="marker-type-select"
              >
                {Object.entries(markerTypes).map(([key, type]) => (
                  <option key={key} value={key}>
                    {type.icon} {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <input type="number" step="any" placeholder="Lat" ref={latRef} />
              <input type="number" step="any" placeholder="Lng" ref={lngRef} />
            </div>
            
            <input type="text" placeholder="Title" ref={titleRef} />
            <textarea placeholder="Description" ref={descRef} rows="2"></textarea>
            
            <input 
              type="number" 
              step="0.1" 
              min="1" 
              max="5" 
              placeholder="Rating (1-5)" 
              ref={ratingRef} 
            />

            <button className="add-marker-btn" onClick={handleAddMarker}>
              <span className="btn-icon">✨</span>
              Add Marker
            </button>
          </div>
        )}
      </div>
      
      {/* Drag overlay */}
      {dragging && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2999,
            pointerEvents: "auto",
            background: "transparent",
            cursor: "grabbing",
          }}
        />
      )}
    </>
  );
}