// components/UserLocationMap.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const UserLocationMap = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting location:', error);
          // fallback location if user denies
          setUserLocation({ lat: 30.889799, lng: 75.849571 });
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY_HERE">
      {userLocation && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={14}
        >
          <Marker position={userLocation} />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default UserLocationMap;
