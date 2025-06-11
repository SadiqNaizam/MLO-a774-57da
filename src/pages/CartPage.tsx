import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, PlusCircle, MinusCircle, ArrowLeft } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const initialCartItems: CartItem[] = [
  { id: 'm3', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1593504049358-7433075513ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=60' },
  { id: 'm1', name: 'Garlic Bread', price: 5.99, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=60' },
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('CartPage loaded');
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      setCartItems(items => items.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
    }
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 5.00 : 0; // Example fee
  const taxes = subtotal * 0.1; // Example 10% tax
  const total = subtotal + deliveryFee + taxes;

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems, 'Instructions:', specialInstructions);
    navigate('/checkout');
  };
  
  const totalCartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu cartItemCount={totalCartItemCount} onCartClick={() => navigate('/cart')} />
      <main className="flex-grow container mx-auto px-4 py-8">
         <Button variant="outline" onClick={() => navigate(-1)} className="mb-6 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-gray-800">Your Shopping Cart</CardTitle>
            {cartItems.length === 0 && <CardDescription>Your cart is currently empty. Add some delicious food!</CardDescription>}
          </CardHeader>
          <CardContent>
            {cartItems.length > 0 ? (
              <div className="lg:flex lg:gap-8">
                <div className="lg:w-2/3">
                  <ScrollArea className="h-[400px] pr-4 mb-6 lg:mb-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px] hidden md:table-cell">Image</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-center">Quantity</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead className="text-right">Remove</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map(item => (
                          <TableRow key={item.id}>
                            <TableCell className="hidden md:table-cell">
                              <img src={item.imageUrl || 'https://via.placeholder.com/50'} alt={item.name} className="h-12 w-12 object-cover rounded" />
                            </TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}><MinusCircle className="h-5 w-5" /></Button>
                                <Input type="number" value={item.quantity} readOnly className="w-12 h-8 text-center" />
                                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}><PlusCircle className="h-5 w-5" /></Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>

                <div className="lg:w-1/3">
                  <Card className="bg-gray-100">
                    <CardHeader>
                      <CardTitle className="text-xl">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes (10%)</span>
                        <span>${taxes.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="mt-6">
                    <Textarea
                      placeholder="Add special instructions for the restaurant..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600 text-lg">Your cart is empty.</p>
                <Button onClick={() => navigate('/')} className="mt-4 bg-orange-500 hover:bg-orange-600">
                  Start Shopping
                </Button>
              </div>
            )}
          </CardContent>
          {cartItems.length > 0 && (
            <CardFooter className="flex justify-end pt-6">
              <Button size="lg" onClick={handleCheckout} className="bg-green-600 hover:bg-green-700 text-white">
                Proceed to Checkout
              </Button>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
};

export default CartPage;