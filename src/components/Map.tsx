'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { POI } from '../types';
import { pois } from '../data/pois'; // Make sure this path is correct

// Fix for Leaflet marker icons in Next.js
// NOTE: Ensure these icon files exist in your /public folder!
const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png', // Or '/poi-marker.svg' if using SVG
  shadowUrl: '/marker-shadow.png', // Remove if using SVG or no shadow
  iconSize: [25, 41],    // Adjust if using SVG
  iconAnchor: [12, 41],   // Adjust if using SVG
  popupAnchor: [1, -34],  // Adjust if using SVG
  shadowSize: [41, 41]    // Adjust if using SVG
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker for user location
// NOTE: Ensure this icon file exists in your /public folder!
const UserLocationIcon = L.icon({
  iconUrl: '/user-location.png', // Or '/user-location.svg' if using SVG
  iconSize: [24, 24],     // Adjust if using SVG
  iconAnchor: [12, 12],    // Adjust if using SVG
  popupAnchor: [0, -12]   // Adjust if using SVG
});

// Component to handle map center and zoom based on user location
const MapController: React.FC<{
  userLocation: [number, number] | null;
  centerOnUser: boolean; // This flag controls centering
}> = ({ userLocation, centerOnUser }) => {
  const map = useMap();

  useEffect(() => {
    // Only center the map if the flag is true AND we have a location
    if (centerOnUser && userLocation) {
      map.setView(userLocation, 15); // Adjust zoom level 15 if needed
    }
  }, [map, userLocation, centerOnUser]); // Effect runs when these change

  return null;
};

interface MapProps {
  language: 'en' | 'de';
  onPoiClick: (poi: POI) => void;
}

const Map: React.FC<MapProps> = ({ language, onPoiClick }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  // --- THIS IS THE KEY CHANGE ---
  const [centerOnUser, setCenterOnUser] = useState(false); // Initialize to false
  // --- END OF KEY CHANGE ---
  const [watchId, setWatchId] = useState<number | null>(null);

  // Initial map center (Bad Belzig center)
  const defaultCenter: [number, number] = [52.1424, 12.5894]; // Using corrected Marktplatz approx coords

  // Start watching user location
  useEffect(() => {
    let id: number | null = null;
    if (navigator.geolocation) {
      id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Handle errors appropriately - maybe show a message to the user
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000, // Don't use cached position older than 10s
          timeout: 5000 // Give up after 5s
        }
      );
      setWatchId(id);
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle lack of geolocation support
    }

    // Clean up watcher on component unmount
    return () => {
      if (id !== null) {
        navigator.geolocation.clearWatch(id);
      }
    };
    // Rerun effect only on mount/unmount (empty dependency array)
    // Note: If onPoiClick could change, add it here, but it likely doesn't.
  }, []); // Empty dependency array ensures this runs only once on mount

  // Calculate distance (utility function inside component or imported)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  // Check if user is within geofence radius of a POI
  const isWithinGeofence = (poi: POI): boolean => {
    if (!userLocation) return false; // Cannot be in range if user location is unknown

    const distance = calculateDistance(
      userLocation[0],
      userLocation[1],
      poi.coordinates.latitude,
      poi.coordinates.longitude
    );

    return distance <= poi.geofenceRadius;
  };

  return (
    // Ensure container has a defined height
    <div className="h-[70vh] w-full relative">
      <MapContainer
        center={defaultCenter} // Initial center
        zoom={14}             // Initial zoom
        style={{ height: '100%', width: '100%' }}
        // Other MapContainer options like scrollWheelZoom={true/false} etc.
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Component that handles map centering logic */}
        <MapController userLocation={userLocation} centerOnUser={centerOnUser} />

        {/* Render POI markers, popups, circles */}
        {/* Using simplified version for now - restore your full version if needed */}
        {pois.map((poi) => (
           <Marker
            key={poi.id}
            position={[poi.coordinates.latitude, poi.coordinates.longitude]}
            eventHandlers={{
              click: () => onPoiClick(poi) // Call prop function on click
            }}
          >
            {/* Basic Popup - customize as needed */}
            <Popup>
              <div>
                <h3 className="font-bold">{poi.names[language]}</h3>
                <p>{poi.descriptions[language]}</p>
                {/* Add more info or styling here */}
              </div>
            </Popup>
          </Marker>
          // Add back the <Circle> component here if you want to show geofences
          // Remember to calculate `isInRange` if needed for styling the circle
          /*
          const isInRange = isWithinGeofence(poi);
          <Circle
            center={[poi.coordinates.latitude, poi.coordinates.longitude]}
            radius={poi.geofenceRadius}
            pathOptions={{
              color: isInRange ? 'green' : 'gray',
              fillColor: isInRange ? 'green' : 'gray',
              fillOpacity: 0.2
            }}
          />
          */
        ))}

        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={UserLocationIcon}>
            <Popup>
              {language === 'en' ? 'Your location' : 'Dein Standort'}
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Center on user button */}
      {/* Ensure this button is styled appropriately and visible */}
      <button
        className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md z-[1000] hover:bg-gray-100 transition-colors" // z-[1000] helps ensure it's above map tiles
        onClick={() => {
           if (userLocation) { // Only act if location is available
             setCenterOnUser(true); // Set flag to true
             // Reset flag shortly after so subsequent location updates don't recenter
             setTimeout(() => setCenterOnUser(false), 50);
           } else {
             // Optionally handle case where user location isn't available yet
             console.log("User location not available yet to center.");
           }
        }}
        aria-label={language === 'en' ? 'Center map on your location' : 'Karte auf deinen Standort zentrieren'}
      >
         {/* Location / Target Icon SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          {/* Lines for crosshair effect */}
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
        </svg>
      </button>
    </div>
  );
};

export default Map;

