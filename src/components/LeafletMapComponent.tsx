import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  center: { lat: number; lng: number };
  onLocationSelect?: (location: { lat: number; lng: number; address?: string }) => void;
  mechanicPos?: { lat: number; lng: number };
}

const MechanicIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #FF6321; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-center: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-4.493-1.498a1 1 0 0 1-.684-.948V6a2 2 0 0 0-2-2h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Component to handle map clicks and marker updates
function MapEvents({ onLocationSelect }: { onLocationSelect?: (loc: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      if (onLocationSelect) {
        onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
}

// Component to update map view when center changes
function ChangeView({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng]);
  }, [center, map]);
  return null;
}

const LeafletMapComponent: React.FC<MapProps> = ({ center, onLocationSelect, mechanicPos }) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-soft bg-gray-50 h-[300px] relative">
      <MapContainer 
        center={[center.lat, center.lng]} 
        zoom={13} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={center} />
        <MapEvents onLocationSelect={onLocationSelect} />
        <Marker position={[center.lat, center.lng]} />
        {mechanicPos && (
          <Marker position={[mechanicPos.lat, mechanicPos.lng]} icon={MechanicIcon} />
        )}
      </MapContainer>
      
      {onLocationSelect && (
        <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border text-[10px] font-bold text-dark-text shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          CLICK MAP TO SET LOCATION
        </div>
      )}
    </div>
  );
};

export default React.memo(LeafletMapComponent);
