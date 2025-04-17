import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    };

    const error = (err) => {
      console.error("Error getting location:", err);
    };

    navigator.geolocation.getCurrentPosition(success, error);
    const watchId = navigator.geolocation.watchPosition(success, error);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="w-full h-full">
      {currentPosition ? (
        <MapContainer center={currentPosition} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={currentPosition} icon={customIcon}>
            <Popup>
              You're here: <br />
              Lat: {currentPosition.lat.toFixed(4)}, <br />
              Lng: {currentPosition.lng.toFixed(4)}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="text-center py-8 text-gray-600">Getting your location...</div>
      )}
    </div>
  );
};

export default LiveTracking;
