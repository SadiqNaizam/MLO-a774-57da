import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import MenuItemDisplay, { MenuItemDisplayProps } from '@/components/MenuItemDisplay';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Star, Clock, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"; // Assuming useToast is set up

// Placeholder data
const placeholderRestaurantDetails = {
  id: '1',
  name: 'Pizza Palace',
  imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
  rating: 4.5,
  deliveryTime: '25-35 min',
  cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
  address: '123 Pizza St, Foodville',
  menu: {
    appetizers: [
      { id: 'm1', name: 'Garlic Bread', description: 'Crusty bread with garlic butter and herbs.', price: 5.99, imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' },
      { id: 'm2', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil.', price: 7.50, imageUrl: 'https://images.unsplash.com/photo-1576996000046-710213926511?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' },
    ],
    mainCourses: [
      { id: 'm3', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1593504049358-7433075513ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' },
      { id: 'm4', name: 'Pepperoni Pizza', description: 'Pizza with spicy pepperoni topping.', price: 14.50, imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' },
      { id: 'm5', name: 'Spaghetti Carbonara', description: 'Creamy pasta with bacon and egg.', price: 13.75, imageUrl: 'https://images.unsplash.com/photo-1588013273468-31508b966714?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' },
    ],
    desserts: [
        { id: 'm6', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert.', price: 6.50, imageUrl: 'https://images.unsplash.com/photo-1571877275904-68eb11a20762?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60' },
    ],
  }
};

type MenuItemWithCategory = MenuItemDisplayProps & { category: string };

const RestaurantMenuPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast(); // For "item added to cart"
  const [cart, setCart] = useState<MenuItemWithCategory[]>([]);
  const [selectedItemForDialog, setSelectedItemForDialog] = useState<MenuItemDisplayProps | null>(null);

  useEffect(() => {
    console.log(`RestaurantMenuPage loaded for restaurant ID: ${restaurantId}`);
    // In a real app, fetch restaurant details using restaurantId
  }, [restaurantId]);

  const restaurant = placeholderRestaurantDetails; // Use placeholder

  const handleAddToCart = (item: MenuItemDisplayProps, category: string) => {
    console.log('Adding to cart:', item);
    setCart(prevCart => [...prevCart, {...item, category}]);
    toast({
        title: "Item Added!",
        description: `${item.name} has been added to your cart.`,
    });
    // Example: open dialog for customization
    // setSelectedItemForDialog(item); 
  };

  const handleDialogConfirm = () => {
    if (selectedItemForDialog) {
        // Add logic for item customization if dialog is used
        console.log("Item confirmed from dialog:", selectedItemForDialog);
        handleAddToCart(selectedItemForDialog, 'customized'); // Example category
        setSelectedItemForDialog(null);
    }
  };
  
  const totalCartItems = cart.reduce((sum) => sum + 1, 0); // Simple count, not quantity

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu 
        cartItemCount={totalCartItems} 
        onCartClick={() => navigate('/cart')} 
      />

      <main className="flex-grow container mx-auto px-4 py-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Restaurants
        </Button>

        {/* Restaurant Header */}
        <Card className="mb-6 shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img src={restaurant.imageUrl} alt={restaurant.name} className="object-cover h-48 w-full md:h-full" />
            </div>
            <div className="md:w-2/3">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-gray-800">{restaurant.name}</CardTitle>
                    <CardDescription className="text-md text-gray-600">{restaurant.address}</CardDescription>
                    <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="outline" className="text-sm"><Star className="h-4 w-4 mr-1 text-yellow-500" /> {restaurant.rating}</Badge>
                        <Badge variant="outline" className="text-sm"><Clock className="h-4 w-4 mr-1 text-blue-500" /> {restaurant.deliveryTime}</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {restaurant.cuisineTypes.map(cuisine => <Badge key={cuisine} variant="secondary">{cuisine}</Badge>)}
                    </div>
                </CardHeader>
            </div>
          </div>
        </Card>

        {/* Menu Tabs */}
        <Tabs defaultValue="appetizers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-white p-2 rounded-lg shadow">
            {Object.keys(restaurant.menu).map(category => (
              <TabsTrigger key={category} value={category} className="capitalize data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md">
                {category.replace(/([A-Z])/g, ' $1')}
              </TabsTrigger>
            ))}
          </TabsList>
            
            <ScrollArea className="h-[calc(100vh-450px)] mt-4"> {/* Adjust height based on other elements */}
                {Object.entries(restaurant.menu).map(([category, items]) => (
                <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-4">
                    {(items as MenuItemDisplayProps[]).map(item => (
                        <MenuItemDisplay
                        key={item.id}
                        {...item}
                        onAddToCart={() => handleAddToCart(item, category)}
                        />
                    ))}
                    </div>
                </TabsContent>
                ))}
            </ScrollArea>
        </Tabs>

        {/* View Cart Button - Fixed or Floating */}
        {cart.length > 0 && (
            <div className="fixed bottom-4 right-4 z-50">
                <Button size="lg" className="shadow-xl bg-orange-600 hover:bg-orange-700" onClick={() => navigate('/cart')}>
                    <ShoppingCart className="mr-2 h-5 w-5" /> View Cart ({totalCartItems})
                </Button>
            </div>
        )}
      </main>

        {/* Example Dialog for item customization - if needed based on user journey step 3 */}
        <Dialog open={!!selectedItemForDialog} onOpenChange={() => setSelectedItemForDialog(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Customize {selectedItemForDialog?.name}</DialogTitle>
                    <DialogDescription>
                        Make selections for your item. (Placeholder for options)
                    </DialogDescription>
                </DialogHeader>
                {/* Add RadioGroup, Checkbox etc. for customization here */}
                <p className="my-4">Customization options would go here...</p>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleDialogConfirm}>Add to Cart</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
};

export default RestaurantMenuPage;