import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:block bg-muted/40 border-t">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Link to="/" className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">FoodDash</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} FoodDash. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-medium">
          <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
            About Us
          </Link>
          <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
            FAQ
          </Link>
          <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;