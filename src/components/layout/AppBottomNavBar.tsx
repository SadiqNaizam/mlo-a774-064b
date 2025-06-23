import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Package, User } from 'lucide-react';

const AppBottomNavBar: React.FC = () => {
  console.log('AppBottomNavBar loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-1 p-2 rounded-md text-xs font-medium transition-colors ${
      isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-2 md:hidden">
      <div className="grid grid-cols-4 gap-2">
        <NavLink to="/" end className={navLinkClasses}>
          <Home className="h-5 w-5" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/restaurant-listing" className={navLinkClasses}>
          <Search className="h-5 w-5" />
          <span>Search</span>
        </NavLink>
        <NavLink to="/order-tracking" className={navLinkClasses}>
          <Package className="h-5 w-5" />
          <span>Orders</span>
        </NavLink>
        {/* Using a button as no /profile route exists yet */}
        <button className="flex flex-col items-center gap-1 p-2 rounded-md text-xs font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <User className="h-5 w-5" />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default AppBottomNavBar;