import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppBottomNavBar from '@/components/layout/AppBottomNavBar';
import OrderTracker from '@/components/OrderTracker';

// shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Icons
import { Map, Phone, Receipt } from 'lucide-react';

// Placeholder data for the order summary
const orderDetails = {
  restaurantName: "The Burger Joint",
  orderId: "FD-8ADG2K9L",
  items: [
    { name: "Classic Cheeseburger", quantity: 1, price: 12.99 },
    { name: "Large Fries", quantity: 1, price: 4.50 },
    { name: "Vanilla Shake", quantity: 1, price: 6.00 },
  ],
  subtotal: 23.49,
  deliveryFee: 3.99,
  taxes: 2.00,
  total: 29.48,
};

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');
  const [currentStage, setCurrentStage] = useState(0);

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage(prevStage => {
        if (prevStage < 3) {
          return prevStage + 1;
        }
        clearInterval(timer);
        return prevStage;
      });
    }, 8000); // Advance stage every 8 seconds

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);
  
  const estimatedTime = new Date(Date.now() + 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Your order is on its way!
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Estimated Arrival: <span className="font-bold text-primary">{estimatedTime}</span>
            </p>
          </section>

          <section className="mb-8">
            <OrderTracker currentStage={currentStage} />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    From {orderDetails.restaurantName} (Order #{orderDetails.orderId})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {orderDetails.items.map(item => (
                      <li key={item.name} className="flex justify-between items-center text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <Separator className="my-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${orderDetails.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>${orderDetails.deliveryFee.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxes & Other Fees</span>
                      <span>${orderDetails.taxes.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 p-4">
                  <div className="flex justify-between items-center w-full">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">${orderDetails.total.toFixed(2)}</span>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Map className="w-5 h-5 text-primary"/> Live Location</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <img 
                            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-restaurant+285A6B(-74.0060,40.7128),pin-s-delivery+007CFF(-73.9855,40.7580),pin-s-home+F7643C(-73.9654,40.7829)/-73.98,40.75,12/600x400?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg`}
                            alt="Map showing delivery route"
                            className="w-full h-48 object-cover"
                        />
                         <div className="p-4 text-sm">
                            <p className="font-semibold">David R.</p>
                            <p className="text-muted-foreground">Your rider is on the way.</p>
                        </div>
                    </CardContent>
                </Card>
                 <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                        <Phone className="mr-2 h-4 w-4"/> Contact Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                        <Receipt className="mr-2 h-4 w-4"/> View Receipt
                    </Button>
                    <Button asChild className="w-full">
                       <Link to="/">Back to Home</Link>
                    </Button>
                 </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AppBottomNavBar />
    </div>
  );
};

export default OrderTrackingPage;