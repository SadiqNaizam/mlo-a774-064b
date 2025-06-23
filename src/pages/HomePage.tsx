import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

// Import Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppBottomNavBar from '@/components/layout/AppBottomNavBar';
import RestaurantCard from '@/components/RestaurantCard';
import CuisineCategoryPill from '@/components/CuisineCategoryPill';

// Import shadcn/ui Components
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Placeholder Data
const cuisineCategories = ['Burgers', 'Pizza', 'Sushi', 'Italian', 'Salads', 'Vegan', 'Desserts'];

const featuredRestaurants = [
  {
    id: '1',
    name: 'The Gourmet Burger',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Burgers',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 1.99,
  },
  {
    id: '2',
    name: 'Napoli\'s Pizzeria',
    imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Pizza',
    rating: 4.7,
    deliveryTime: '30-40 min',
    deliveryFee: 0,
  },
  {
    id: '3',
    name: 'Tokyo Sushi House',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Sushi',
    rating: 4.9,
    deliveryTime: '35-45 min',
    deliveryFee: 3.49,
  },
  {
    id: '4',
    name: 'The Green Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Salads',
    rating: 4.6,
    deliveryTime: '15-25 min',
    deliveryFee: 2.00,
  },
];

const popularRestaurants = [
  {
    id: '5',
    name: 'Pasta Palace',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Italian',
    rating: 4.7,
    deliveryTime: '30-40 min',
    deliveryFee: 2.50,
  },
  {
    id: '6',
    name: 'Vegan Vibes',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Vegan',
    rating: 4.9,
    deliveryTime: '20-30 min',
    deliveryFee: 0,
  },
  {
    id: '7',
    name: 'Sweet Tooth Confections',
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Desserts',
    rating: 4.8,
    deliveryTime: '15-25 min',
    deliveryFee: 3.00,
  },
   {
    id: '8',
    name: 'Crispy & Crunchy',
    imageUrl: 'https://images.unsplash.com/photo-1626082933485-8f645395a1a1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Fried Chicken',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 1.50,
  },
];


const HomePage = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      <main className="flex-1 w-full pb-24 md:pb-0">
        <div className="container px-4 md:px-6 py-8">
          
          {/* Hero Section */}
          <section className="text-center py-8 md:py-12">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Great food is <span className="text-primary">one click</span> away
            </h1>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto mb-8">
              Discover and order from the best local restaurants. Delivered right to your door.
            </p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for restaurants or dishes..."
                className="pl-10 h-12 text-base"
              />
            </div>
          </section>

          {/* Cuisine Categories */}
          <section className="py-6">
            <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4">
              {cuisineCategories.map((category) => (
                <CuisineCategoryPill key={category} category={category} />
              ))}
            </div>
          </section>

          {/* Featured Restaurants */}
          <section className="py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Featured Restaurants</h2>
              <Link to="/restaurant-listing" className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 pb-4">
                {featuredRestaurants.map((resto) => (
                  <div key={resto.id} className="w-[300px] sm:w-[350px]">
                    <RestaurantCard {...resto} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Popular Near You */}
          <section className="py-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Popular Near You</h2>
                 <Link to="/restaurant-listing" className="text-sm font-medium text-primary hover:underline">
                    View All
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {popularRestaurants.map((resto) => (
                    <RestaurantCard key={resto.id} {...resto} />
                ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
      <AppBottomNavBar />
    </div>
  );
};

export default HomePage;