import React, { useState, useEffect } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import RestaurantCard, { RestaurantCardProps } from '@/components/RestaurantCard';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Search,SlidersHorizontal } from 'lucide-react';

const placeholderRestaurants: RestaurantCardProps[] = [
  { id: '1', name: 'Pizza Palace', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60', cuisineTypes: ['Italian', 'Pizza'], rating: 4.5, deliveryTime: '25-35 min' },
  { id: '2', name: 'Burger Barn', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60', cuisineTypes: ['American', 'Burgers'], rating: 4.2, deliveryTime: '20-30 min' },
  { id: '3', name: 'Sushi Central', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60', cuisineTypes: ['Japanese', 'Sushi'], rating: 4.8, deliveryTime: '30-40 min' },
  { id: '4', name: 'Taco Town', imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60', cuisineTypes: ['Mexican', 'Tacos'], rating: 4.3, deliveryTime: '20-30 min' },
];

const HomepageRestaurantListing: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  useEffect(() => {
    console.log('HomepageRestaurantListing loaded');
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const cuisineFilters = ["Italian", "Mexican", "Chinese", "Indian", "Burgers", "Pizza"];

  const filteredRestaurants = placeholderRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCuisines.length === 0 || selectedCuisines.some(cuisine => restaurant.cuisineTypes.includes(cuisine)))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu showSearch={false} cartItemCount={3} onCartClick={() => alert('Navigate to cart page')} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Find Your Next Meal</h1>
          <p className="text-lg text-gray-600 mt-2">Discover local restaurants and businesses near you</p>
        </header>

        {/* Search and Filters */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search restaurants, cuisines..."
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="lg" className="md:hidden">
              <SlidersHorizontal className="mr-2 h-5 w-5" /> Filters
            </Button>
          </div>
          
          <div className="hidden md:block">
             <h3 className="text-sm font-semibold text-gray-700 mb-2">Filter by Cuisine:</h3>
            <ToggleGroup
                type="multiple"
                variant="outline"
                value={selectedCuisines}
                onValueChange={(value) => setSelectedCuisines(value)}
                className="flex flex-wrap gap-2"
            >
                {cuisineFilters.map(cuisine => (
                <ToggleGroupItem key={cuisine} value={cuisine} aria-label={`Toggle ${cuisine}`}
                    className="data-[state=on]:bg-orange-500 data-[state=on]:text-white hover:bg-orange-100 border-orange-300"
                >
                    {cuisine}
                </ToggleGroupItem>
                ))}
            </ToggleGroup>
          </div>
        </div>

        {/* Restaurant Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-[180px] w-full rounded-xl" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredRestaurants.length > 0 ? (
                 <ScrollArea className="h-[calc(100vh-400px)]"> {/* Adjust height as needed */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredRestaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} {...restaurant} />
                        ))}
                    </div>
                </ScrollArea>
            ) : (
                <div className="text-center py-12">
                    <Search className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No restaurants found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
                </div>
            )}
          </>
        )}
        {!isLoading && filteredRestaurants.length > 4 && ( /* Example: Show load more if more than initial load */
            <div className="mt-12 text-center">
                <Button variant="outline" size="lg">Load More Restaurants</Button>
            </div>
        )}
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-200">
        © {new Date().getFullYear()} FoodDash. All rights reserved.
      </footer>
    </div>
  );
};

export default HomepageRestaurantListing;