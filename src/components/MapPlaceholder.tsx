import React from 'react';
import { MapPin } from 'lucide-react'; // Example icon

export interface MapPlaceholderProps {
  message?: string;
  height?: string; // e.g., 'h-64' or '200px'
  width?: string; // e.g., 'w-full'
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  message = "Live map coming soon!",
  height = 'h-64', // Default height
  width = 'w-full',  // Default width
}) => {
  console.log("Rendering MapPlaceholder");
  return (
    <div
      className={`flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-gray-500 ${height} ${width}`}
      aria-label="Map placeholder"
    >
      <MapPin className="w-12 h-12 mb-4 text-gray-400" />
      <p className="text-center font-medium">{message}</p>
      <p className="text-xs text-center mt-1">Delivery location will be shown here.</p>
    </div>
  );
};

export default MapPlaceholder;