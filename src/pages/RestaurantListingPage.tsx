import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppBottomNavBar from '@/components/layout/AppBottomNavBar';
import RestaurantCard from '@/components/RestaurantCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter } from 'lucide-react';

// Placeholder data for restaurants
const restaurants = [
  {
    id: '1',
    name: 'The Golden Burger',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Burgers',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: 2.99,
  },
  {
    id: '2',
    name: 'Supreme Pizza Palace',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Pizza',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 0,
  },
  {
    id: '3',
    name: 'Noodle Nirvana',
    imageUrl: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Asian',
    rating: 4.3,
    deliveryTime: '30-40 min',
    deliveryFee: 1.50,
  },
  {
    id: '4',
    name: 'Fresh & Green Salads',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-2850a86b2bda?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Salads',
    rating: 4.9,
    deliveryTime: '15-25 min',
    deliveryFee: 4.00,
  },
  {
    id: '5',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-15d6e08547e9?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Mexican',
    rating: 3.9,
    deliveryTime: '20-30 min',
    deliveryFee: 2.50,
  },
  {
    id: '6',
    name: 'The Sushi Spot',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop',
    cuisine: 'Sushi',
    rating: 4.7,
    deliveryTime: '35-45 min',
    deliveryFee: 5.00,
  },
];

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container px-4 md:px-6 py-8 pb-24 md:pb-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Restaurants</h1>
          <p className="text-muted-foreground">Find the perfect meal from our curated list of local restaurants.</p>
        </section>

        {/* Search, Filter, and Sort Controls */}
        <section className="flex flex-col md:flex-row gap-4 mb-8 sticky top-16 bg-background/95 py-4 z-40">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search restaurants or cuisines..."
              className="w-full pl-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter & Refine</SheetTitle>
                  <SheetDescription>
                    Adjust the options below to find exactly what you're looking for.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                  <div className="grid gap-2">
                    <Label htmlFor="price-range">Price Range</Label>
                    <Slider defaultValue={[25]} max={100} step={1} id="price-range" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Rating</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rating-4plus" />
                      <label htmlFor="rating-4plus" className="text-sm font-medium leading-none">
                        4 stars & up
                      </label>
                    </div>
                  </div>
                   <div className="grid gap-2">
                    <Label>Dietary</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dietary-veg" />
                      <label htmlFor="dietary-veg" className="text-sm font-medium leading-none">
                        Vegetarian
                      </label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <Checkbox id="dietary-vegan" />
                      <label htmlFor="dietary-vegan" className="text-sm font-medium leading-none">
                        Vegan
                      </label>
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit" className="w-full">Apply Filters</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="delivery-time">Delivery Time</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Restaurant Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </section>
      </main>
      <Footer />
      <AppBottomNavBar />
    </div>
  );
};

export default RestaurantListingPage;