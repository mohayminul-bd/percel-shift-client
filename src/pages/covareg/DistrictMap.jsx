import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaSearch } from "react-icons/fa";
import Fuse from "fuse.js";

// leaflet marker icon fix (vite issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// districts dataset
import districtsData from "../../assets/warehouses.json";

// Helper component to change map center
const MapFly = ({ coords }) => {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 10, { duration: 2 });
  }
  return null;
};

const DistrictMap = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCoords, setSelectedCoords] = useState(null);

  // Fuse.js setup
  const fuse = new Fuse(districtsData, {
    keys: ["district"],
    threshold: 0.3, // fuzzy level (0.0 exact, 1.0 very loose)
  });

  // Search handler
  const handleSearch = (value) => {
    setSearch(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const results = fuse.search(value);
    setSuggestions(results.map((r) => r.item));
  };

  // When user clicks a suggestion
  const handleSelect = (district) => {
    setSearch(district.district);
    setSuggestions([]);
    setSelectedCoords([district.latitude, district.longitude]);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-snug">
        We are available in{" "}
        <span className="text-primary">{districtsData.length} districts</span>
      </h2>

      {/* Search Box */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="form-control">
          <div className="relative">
            <input
              type="text"
              placeholder="Search district..."
              className="input input-bordered w-full pr-10 text-sm sm:text-base"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400 text-sm sm:text-base" />
          </div>
        </div>
        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute z-[9999] bg-white border rounded-md shadow-md w-full mt-1 max-h-60 overflow-y-auto text-sm sm:text-base">
            {suggestions.map((d, idx) => (
              <li
                key={idx}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(d)}
              >
                {d.district}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map */}
      <div className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl rounded-lg shadow-lg overflow-hidden z-0">
        <MapContainer
          center={[23.685, 90.3563]} // Bangladesh center
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {districtsData.map((d, idx) => (
            <Marker key={idx} position={[d.latitude, d.longitude]}>
              <Popup>
                <div className="space-y-1">
                  <h3 className="font-bold text-base sm:text-lg">
                    {d.district}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Region: {d.region} | City: {d.city}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold">Covered Areas:</span>{" "}
                    {d.covered_area.join(", ")}
                  </p>
                  <img
                    src={d.flowchart}
                    alt={d.district}
                    className="mt-2 rounded-lg w-32 sm:w-40 h-20 sm:h-24 object-cover"
                  />
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Fly to searched district */}
          {selectedCoords && <MapFly coords={selectedCoords} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default DistrictMap;
