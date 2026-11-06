import { useState } from 'react';
import { LocationPoint } from '../types';

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationPoint | null>(null);

  const detectLocation = (): Promise<LocationPoint> => {
    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const fallback = { name: 'Guntur Rural, AP', lat: 16.3067, lng: 80.4365 };
        setLocation(fallback);
        setLoading(false);
        resolve(fallback);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locPoint: LocationPoint = {
            name: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
            lat,
            lng
          };
          
          try {
            // Try reverse geocoding via OpenStreetMap Nominatim
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await res.json();
            if (data && data.display_name) {
              const parts = data.display_name.split(',');
              locPoint.name = parts.slice(0, 3).join(', ');
            }
          } catch {
            /* ignore geocoding failure */
          }

          setLocation(locPoint);
          setLoading(false);
          resolve(locPoint);
        },
        (_err) => {
          const fallback = { name: 'Guntur Farm Location, AP', lat: 16.3067, lng: 80.4365 };
          setError('Could not fetch GPS. Using default location.');
          setLocation(fallback);
          setLoading(false);
          resolve(fallback);
        },
        { timeout: 8000 }
      );
    });
  };

  return { location, loading, error, detectLocation };
}
