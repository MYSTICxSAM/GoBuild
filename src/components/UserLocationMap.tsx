// components/UserLocationMap.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '645px'
};

const UserLocationMap = ({ center }) => {
  const [userLocation, setUserLocation] = useState(center);

  useEffect(() => {
    // Update userLocation whenever center prop changes
    setUserLocation(center);
  }, [center]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
      {userLocation && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={16}
          mapTypeId="hybrid"
        >
          <Marker position={userLocation} />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default UserLocationMap;
