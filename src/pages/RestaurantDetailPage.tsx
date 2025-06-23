import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppBottomNavBar from '@/components/layout/AppBottomNavBar';
import MenuItemCard from '@/components/MenuItemCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// Icons
import { Star, Clock, MapPin, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

// Define types for clarity
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

interface CartItem extends MenuItem {
  quantity: number;
}

// --- Placeholder Data ---
const restaurantData = {
  name: "The Burger Palace",
  imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop",
  rating: 4.5,
  deliveryTime: "20-30 min",
  address: "123 Burger Lane, Foodville",
};

const menuData: MenuCategory[] = [
  {
    title: "Signature Burgers",
    items: [
      { id: 'b1', name: "The Classic Cheeseburger", description: "A juicy beef patty with melted cheddar, lettuce, tomato, and our secret sauce.", price: 12.99, imageUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=2069&auto=format&fit=crop" },
      { id: 'b2', name: "Bacon & Avocado Burger", description: "Crispy bacon, fresh avocado, swiss cheese, and garlic aioli on a brioche bun.", price: 15.49, imageUrl: "https://images.unsplash.com/photo-1605789534434-57a5b537968e?q=80&w=2070&auto=format&fit=crop" },
    ],
  },
  {
    title: "Sides",
    items: [
      { id: 's1', name: "Crispy French Fries", description: "Golden, crispy, and lightly salted. The perfect companion.", price: 4.99, imageUrl: "https://images.unsplash.com/photo-1598679253544-2c9742491b84?q=80&w=2070&auto=format&fit=crop" },
      { id: 's2', name: "Onion Rings", description: "Thick-cut onion rings with a crunchy batter, served with chipotle mayo.", price: 6.99, imageUrl: "https://images.unsplash.com/photo-1594179047519-f64de39e3ae6?q=80&w=1974&auto=format&fit=crop" },
    ],
  },
  {
    title: "Drinks",
    items: [
        { id: 'd1', name: "Classic Cola", description: "An ice-cold can of your favorite cola.", price: 2.50 },
        { id: 'd2', name: "Fresh Lemonade", description: "Made in-house with real lemons.", price: 3.50 },
    ]
  }
];

const RestaurantDetailPage = () => {
  console.log('RestaurantDetailPage loaded');

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } else {
      setCart(prevCart => prevCart.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
    }
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Restaurant Banner & Info */}
        <Card className="overflow-hidden mb-8 shadow-sm">
          <div className="h-48 md:h-64 w-full">
            <img src={restaurantData.imageUrl} alt={restaurantData.name} className="w-full h-full object-cover" />
          </div>
          <CardContent className="p-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{restaurantData.name}</h1>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-muted-foreground mt-2">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{restaurantData.rating}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{restaurantData.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{restaurantData.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Section */}
        <div className="space-y-8">
          {menuData.map(category => (
            <section key={category.title}>
              <h2 className="text-2xl font-bold tracking-tight mb-4">{category.title}</h2>
              <Separator />
              <div className="divide-y">
                {category.items.map(item => (
                  // WORKAROUND: Wrap MenuItemCard to attach an onClick that adds to the page-level cart state,
                  // since the component itself cannot be modified to accept an onAddToCart prop.
                  // This allows clicking the item to both add to cart and open its detail dialog.
                  <div key={item.id} className="cursor-pointer" onClick={() => addToCart(item)}>
                    <MenuItemCard {...item} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Cart Sheet Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-20 md:bottom-8 right-4 h-16 w-auto px-6 rounded-full shadow-lg text-lg">
            <ShoppingCart className="mr-3 h-6 w-6" />
            View Cart ({totalItems}) - ${cartTotal.toFixed(2)}
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-2xl">Your Cart</SheetTitle>
            <SheetDescription>
              Review your items before proceeding to checkout.
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />
          {cart.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                <p className="font-semibold text-lg">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Click on menu items to add them.</p>
            </div>
          ) : (
            <ScrollArea className="flex-grow -mx-6">
                <div className="px-6 divide-y">
                    {cart.map(item => (
                        <div key={item.id} className="py-4 flex items-start gap-4">
                            <div className="flex-1">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-primary font-medium">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                                <span className="font-bold w-4 text-center">{item.quantity}</span>
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                            </div>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => updateQuantity(item.id, 0)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    ))}
                </div>
            </ScrollArea>
          )}
          <SheetFooter>
            <div className="w-full space-y-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Button asChild size="lg" className="w-full" disabled={cart.length === 0}>
                    <Link to="/checkout">Go to Checkout</Link>
                </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      <Footer />
      <AppBottomNavBar />
    </div>
  );
};

export default RestaurantDetailPage;