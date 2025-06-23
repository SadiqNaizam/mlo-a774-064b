import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, ShoppingCart, User, UtensilsCrossed, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="mr-6 flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">FoodDash</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
          <MapPin className="h-4 w-4" />
          <span>Delivering to <strong>New York, NY</strong></span>
          <ChevronDown className="h-4 w-4" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/checkout">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Open Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;