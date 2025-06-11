import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import OrderProgressIndicator, { Step } from '@/components/OrderProgressIndicator';
import MapPlaceholder from '@/components/MapPlaceholder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Package, Info, MessageSquare, ArrowLeft } from 'lucide-react';

// Placeholder order data
const placeholderOrder = {
  id: 'XYZ123ABC',
  items: [
    { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
    { name: 'Garlic Bread', quantity: 2, price: 5.99 },
  ],
  totalAmount: 24.97,
  estimatedDelivery: '4:30 PM - 4:45 PM',
  deliveryAddress: '123 Main St, Anytown, 12345',
};

const initialSteps: Step[] = [
  { id: 'confirmed', name: 'Order Confirmed', isCompleted: false, isCurrent: true },
  { id: 'preparing', name: 'Preparing Food', isCompleted: false, isCurrent: false },
  { id: 'delivery', name: 'Out for Delivery', isCompleted: false, isCurrent: false },
  { id: 'delivered', name: 'Delivered', isCompleted: false, isCurrent: false },
];

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    console.log(`OrderTrackingPage loaded for order ID: ${orderId}`);
    // Simulate order progress
    const interval = setInterval(() => {
      setCurrentStepIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < steps.length) {
          setSteps(currentSteps =>
            currentSteps.map((step, index) => ({
              ...step,
              isCompleted: index < nextIndex,
              isCurrent: index === nextIndex,
            }))
          );
          return nextIndex;
        } else {
          clearInterval(interval); // Stop when all steps are completed
           setSteps(currentSteps =>
            currentSteps.map((step, index) => ({
              ...step,
              isCompleted: true,
              isCurrent: index === currentSteps.length -1, // Last step is current and completed
            }))
          );
          return prevIndex;
        }
      });
    }, 5000); // Advance step every 5 seconds

    return () => clearInterval(interval);
  }, [orderId]); // Removed 'steps' from dependency array to avoid re-triggering interval on steps update

  const order = { ...placeholderOrder, id: orderId || placeholderOrder.id }; // Use actual orderId

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader className="bg-gray-50 rounded-t-lg">
            <div className="flex items-center space-x-3">
                <Package className="h-8 w-8 text-orange-500" />
                <div>
                    <CardTitle className="text-2xl font-semibold text-gray-800">Order Tracking</CardTitle>
                    <CardDescription>Order ID: <span className="font-medium text-orange-600">{order.id}</span></CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Current Status</h3>
              <OrderProgressIndicator steps={steps} />
            </section>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Estimated Delivery Time</AlertTitle>
              <AlertDescription>
                Your order is expected to arrive between <span className="font-semibold">{order.estimatedDelivery}</span>.
              </AlertDescription>
            </Alert>
            
            <div className="grid md:grid-cols-2 gap-6">
                <section>
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Order Summary</h3>
                <div className="space-y-2 text-sm">
                    {order.items.map(item => (
                    <div key={item.name} className="flex justify-between">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    ))}
                    <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
                 <p className="text-xs text-gray-500 mt-2">Delivering to: {order.deliveryAddress}</p>
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Live Delivery Map</h3>
                    <MapPlaceholder message="Tracking your rider..." height="h-48" />
                </section>
            </div>


            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
              </Button>
              <Button variant="secondary">View Receipt</Button>
            </div>
          </CardContent>
        </Card>
      </main>
       <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-200">
        Need help? Contact us at support@fooddash.com
      </footer>
    </div>
  );
};

export default OrderTrackingPage;