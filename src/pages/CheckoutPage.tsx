import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CreditCard, Truck } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
  city: z.string().min(2, { message: 'Please enter a city.' }),
  zip: z.string().min(5, { message: 'Please enter a valid ZIP code.' }),
  paymentMethod: z.enum(['card', 'paypal'], {
    required_error: 'You need to select a payment method.',
  }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
});

const orderItems = [
  { name: 'The Classic Burger', price: 15.99, quantity: 1 },
  { name: 'Crispy Fries', price: 4.5, quantity: 1 },
  { name: 'Soda', price: 2.5, quantity: 1 },
];

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [tipPercentage, setTipPercentage] = useState(15);

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 3.99;
  const tipAmount = subtotal * (tipPercentage / 100);
  const total = subtotal + deliveryFee + tipAmount;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'John Doe',
      address: '123 Foodie Lane',
      city: 'New York',
      zip: '10001',
      paymentMethod: 'card',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Order placed with values:', values);
    toast.success('Your order has been placed!', {
      description: 'You are being redirected to the tracking page.',
    });
    // Redirect to order tracking page after a short delay to allow user to see the toast
    setTimeout(() => {
      navigate('/order-tracking'); // Navigate to the path defined in App.tsx
    }, 1500);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left/Main Column: Form Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Confirm Your Details</CardTitle>
                  <CardDescription>Review and confirm your delivery and payment information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Delivery Address Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                       <Truck className="h-5 w-5 text-muted-foreground" />
                       <h3 className="text-lg font-semibold">Delivery Address</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Foodie Lane" {...field} />
                            </FormControl>
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
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Separator />
                  {/* Payment Method Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">Payment Method</h3>
                    </div>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4"
                            >
                              <FormItem className="flex-1">
                                <FormControl>
                                  <RadioGroupItem value="card" id="card" className="sr-only" />
                                </FormControl>
                                <Label
                                  htmlFor="card"
                                  className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground ${field.value === 'card' ? 'border-primary' : 'border-muted'}`}
                                >
                                  Credit Card
                                </Label>
                              </FormItem>
                              <FormItem className="flex-1">
                                <FormControl>
                                  <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                                </FormControl>
                                <Label
                                  htmlFor="paypal"
                                  className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground ${field.value === 'paypal' ? 'border-primary' : 'border-muted'}`}
                                >
                                  PayPal
                                </Label>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right/Side Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>From: The Burger Joint</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    {orderItems.map((item) => (
                      <div key={item.name} className="flex justify-between">
                        <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  </div>
                   <Separator />
                  <div>
                    <Label className="font-semibold text-sm">Add a tip</Label>
                     <div className="mt-2 grid grid-cols-4 gap-2">
                        {[15, 20, 25, 0].map((perc) => (
                          <Button 
                            key={perc}
                            type="button"
                            variant={tipPercentage === perc ? 'default' : 'outline'}
                            onClick={() => setTipPercentage(perc)}
                          >
                           {perc > 0 ? `${perc}%` : 'Custom'}
                          </Button>
                        ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" size="lg">
                    Place Order
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;