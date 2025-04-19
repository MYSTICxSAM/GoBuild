
import React, { useEffect, useRef, useState } from 'react';

// Add Google Maps type definitions
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
      }
    };
  }
}

interface ServiceMapProps {
  center: {
    lat: number;
    lng: number;
  };
}

const ServiceMap: React.FC<ServiceMapProps> = ({ center }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Function to initialize the map
  const initializeMap = () => {
    if (!window.google || !mapRef.current) return;
    
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: 13,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
    });
    
    // Add a marker at the center position
    new window.google.maps.Marker({
      position: center,
      map: map,
      title: "Selected Location",
    });
  };

  // Load Google Maps API script
  useEffect(() => {
    // Check if the API is already loaded
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }
    
    // Function to handle key input
    const handleKeySubmit = () => {
      const inputApiKey = (document.getElementById('google-maps-api-key') as HTMLInputElement)?.value;
      if (inputApiKey) {
        setApiKey(inputApiKey);
        localStorage.setItem('google-maps-api-key', inputApiKey);
        
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${inputApiKey}&libraries=places`;
        script.async = true;
        script.onload = () => setMapLoaded(true);
        document.head.appendChild(script);
      }
    };
    
    // Try to get API key from local storage
    const storedApiKey = localStorage.getItem('google-maps-api-key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${storedApiKey}&libraries=places`;
      script.async = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    }
    
    // Set up the key input form
    if (!storedApiKey) {
      const apiKeyInput = document.getElementById('api-key-form');
      if (apiKeyInput) {
        const submitButton = document.getElementById('submit-api-key');
        if (submitButton) {
          submitButton.addEventListener('click', handleKeySubmit);
        }
      }
    }
    
    // Cleanup
    return () => {
      const submitButton = document.getElementById('submit-api-key');
      if (submitButton) {
        submitButton.removeEventListener('click', handleKeySubmit);
      }
    };
  }, []);
  
  // Initialize map when loaded
  useEffect(() => {
    if (mapLoaded) {
      initializeMap();
    }
  }, [mapLoaded, center]);

  return (
    <div className="w-full h-full">
      {!apiKey ? (
        <div id="api-key-form" className="flex flex-col items-center justify-center h-full p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Please enter your Google Maps API key to display the map.
          </p>
          <div className="flex flex-col w-full max-w-md space-y-2">
            <input
              id="google-maps-api-key"
              type="text"
              placeholder="Enter Google Maps API Key"
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              id="submit-api-key"
              className="bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition"
            >
              Load Map
            </button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Your API key will be stored locally and never sent to our servers.
            </p>
          </div>
        </div>
      ) : (
        <div ref={mapRef} className="w-full h-full" />
      )}
    </div>
  );
};

export default ServiceMap;
