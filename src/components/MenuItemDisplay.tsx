import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlusCircle } from 'lucide-react';

export interface MenuItemDisplayProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (itemId: string) => void;
  // Add props for customization options if needed, e.g., sizes, addons
}

const MenuItemDisplay: React.FC<MenuItemDisplayProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
}) => {
  console.log("Rendering MenuItemDisplay:", name);

  const handleAddToCartClick = () => {
    console.log("Add to cart clicked for item:", id, name);
    onAddToCart(id);
    // Here you might use a toast notification
  };

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden w-full">
      {imageUrl && (
        <div className="md:w-1/3">
          <AspectRatio ratio={4 / 3} className="md:h-full">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails
            />
          </AspectRatio>
        </div>
      )}
      <div className={`flex flex-col justify-between ${imageUrl ? 'md:w-2/3' : 'w-full'}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow py-0">
          {description && <p className="text-sm text-gray-600 line-clamp-2">{description}</p>}
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-orange-600">${price.toFixed(2)}</span>
          <Button size="sm" onClick={handleAddToCartClick}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default MenuItemDisplay;