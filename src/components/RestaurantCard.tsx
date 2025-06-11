import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star, Clock } from 'lucide-react'; // Example icons

export interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating?: number; // e.g., 4.5
  deliveryTime?: string; // e.g., "20-30 min"
  onClick?: (id: string) => void; // Optional click handler
  // Add other relevant props: distance, priceRange, promotions etc.
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  onClick,
}) => {
  console.log("Rendering RestaurantCard:", name);

  const content = (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold group-hover:text-orange-600 transition-colors">{name}</CardTitle>
        {cuisineTypes && cuisineTypes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {cuisineTypes.slice(0, 3).map((cuisine) => ( // Show max 3 cuisines
              <Badge key={cuisine} variant="secondary" className="text-xs">
                {cuisine}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      {(rating || deliveryTime) && (
        <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-gray-600">
          {rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
          {deliveryTime && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{deliveryTime}</span>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );

  // Wrap with Link if navigating, otherwise handle click
  if (onClick) {
    return <div onClick={() => onClick(id)}>{content}</div>;
  }

  return (
    <Link to={`/restaurant/${id}`} className="block no-underline">
      {content}
    </Link>
  );
};

export default RestaurantCard;