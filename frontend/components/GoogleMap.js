import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function GoogleMap({ lat, lng, zoom = 15 }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
        mapRef.current.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; text-align: center; padding: 20px;">
            <div>
              <p><strong>Google Maps API Key Required</strong></p>
              <p>Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file</p>
            </div>
          </div>
        `;
        return;
      }

      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
      });

      const google = await loader.load();
      const position = { lat, lng };

      const map = new google.maps.Map(mapRef.current, {
        center: position,
        zoom: zoom,
      });

      new google.maps.Marker({
        position: position,
        map: map,
        title: 'Hardware Boutique',
      });
    };

    initMap();
  }, [lat, lng, zoom]);

  return <div ref={mapRef} className="map-container" />;
}
