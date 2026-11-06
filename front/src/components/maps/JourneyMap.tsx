import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { StageHistoryItem } from '../../types';

interface JourneyMapProps {
  stages: StageHistoryItem[];
  height?: string;
}

// Custom Leaflet Icons for stages
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const farmerIcon = createCustomIcon('#2E7D32');
const centerIcon = createCustomIcon('#F9A825');
const distributorIcon = createCustomIcon('#1565C0');
const retailerIcon = createCustomIcon('#6A1B9A');

const getStageIcon = (stage: string) => {
  switch (stage) {
    case 'farmer': return farmerIcon;
    case 'collectionCenter': return centerIcon;
    case 'distributor': return distributorIcon;
    case 'retailer': return retailerIcon;
    default: return farmerIcon;
  }
};

export const JourneyMap: React.FC<JourneyMapProps> = ({ stages, height = '350px' }) => {
  if (!stages || stages.length === 0) {
    return (
      <div style={{ height }} className="w-full bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-500 text-sm">
        No location points logged for map display.
      </div>
    );
  }

  const positions: [number, number][] = stages.map(s => [s.location.lat, s.location.lng]);
  const centerPosition: [number, number] = positions[positions.length - 1] || [16.3067, 80.4365];

  return (
    <div className="w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md z-0 relative">
      <MapContainer
        center={centerPosition}
        zoom={8}
        scrollWheelZoom={false}
        style={{ height, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Polylines connecting stage journey */}
        {positions.length > 1 && (
          <Polyline
            positions={positions}
            color="#2E7D32"
            weight={4}
            opacity={0.8}
            dashArray="8, 8"
          />
        )}

        {/* Markers for each recorded stage */}
        {stages.map((stg, idx) => (
          <Marker
            key={idx}
            position={[stg.location.lat, stg.location.lng]}
            icon={getStageIcon(stg.stage)}
          >
            <Popup>
              <div className="p-1 space-y-1 text-xs">
                <span className="font-extrabold uppercase text-emerald-800 tracking-wider">
                  Stage {idx + 1}: {stg.stage}
                </span>
                <p className="font-bold text-slate-900">{stg.location.name}</p>
                <p className="text-slate-600">Handler: {stg.handlerName} ({stg.handlerRole})</p>
                <p className="text-slate-400 text-[10px]">{new Date(stg.timestamp).toLocaleString()}</p>
                {stg.notes && <p className="italic text-slate-500">"{stg.notes}"</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
