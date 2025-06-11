import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Using shadcn Form
import { useForm } from "react-hook-form"; // Required for shadcn Form
import { zodResolver } from "@hookform/resolvers/zod"; // For schema validation
import * as z from "zod"; // For schema definition
import { CreditCard, Terminal, PackageCheck, ArrowLeft } from 'lucide-react';

// Define Zod schema for form validation
const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  postalCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Invalid postal code format." }),
  country: z.string().min(2, { message: "Country is required." }),
  paymentMethod: z.enum(["card", "cod"], { required_error: "Please select a payment method." }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms." }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckoutPage: React.FC = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "US", // Default country
      paymentMethod: "card",
      agreeTerms: false,
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  useEffect(() => {
    console.log('CheckoutPage loaded');
  }, []);

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Checkout form submitted:', data);
    // Simulate API call
    setTimeout(() => {
      setOrderPlaced(true);
      // Redirect to order tracking page after a delay
      setTimeout(() => navigate(`/order-tracking/${Math.random().toString(36).substring(7)}`), 2000);
    }, 1000);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <Alert className="max-w-md bg-white shadow-lg">
          <PackageCheck className="h-5 w-5 text-green-500" />
          <AlertTitle className="text-xl font-semibold text-green-600">Order Placed Successfully!</AlertTitle>
          <AlertDescription className="text-gray-700">
            Thank you for your order. You will be redirected to the tracking page shortly.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate('/cart')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </Button>
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-gray-800">Secure Checkout</CardTitle>
            <CardDescription>Please fill in your details to complete the order.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Delivery Information */}
                <section>
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">Delivery Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl><Input placeholder="12345" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="US">United States</SelectItem>
                                <SelectItem value="CA">Canada</SelectItem>
                                <SelectItem value="GB">United Kingdom</SelectItem>
                                {/* Add more countries as needed */}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                  </div>
                </section>

                {/* Payment Method */}
                <section>
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">Payment Method</h3>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50 flex-1">
                              <FormControl><RadioGroupItem value="card" /></FormControl>
                              <CreditCard className="h-5 w-5 mr-2" />
                              <FormLabel className="font-normal cursor-pointer">Credit/Debit Card</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50 flex-1">
                              <FormControl><RadioGroupItem value="cod" /></FormControl>
                              <Terminal className="h-5 w-5 mr-2" />
                              <FormLabel className="font-normal cursor-pointer">Cash on Delivery</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                       <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                            <FormItem className="md:col-span-3">
                            <FormLabel>Card Number</FormLabel>
                            <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="cardExpiry"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="cardCvc"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl><Input placeholder="•••" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                  )}
                </section>
                
                {/* Order Summary (Placeholder) */}
                <section className="p-4 border rounded-md bg-gray-50">
                    <h3 className="text-lg font-medium mb-2 text-gray-700">Order Summary</h3>
                    <div className="flex justify-between text-sm"><span>Subtotal:</span><span>$20.00</span></div>
                    <div className="flex justify-between text-sm"><span>Delivery:</span><span>$5.00</span></div>
                    <div className="flex justify-between font-semibold text-md mt-1"><span>Total:</span><span>$25.00</span></div>
                    <p className="text-xs text-gray-500 mt-2">This is a placeholder summary. Actual items will be calculated.</p>
                </section>


                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Agree to terms and conditions</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CheckoutPage;