import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Pizza,
  Fish,
  Beef,
  UtensilsCrossed,
  Salad,
  CakeSlice,
  Sprout,
  LucideProps,
  HelpCircle
} from 'lucide-react';

// Define the props for the component
interface CuisineCategoryPillProps {
  category: string;
  isActive?: boolean;
  className?: string;
}

// Map category names to Lucide icon components
const iconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  'Pizza': Pizza,
  'Sushi': Fish,
  'Burgers': Beef,
  'Italian': UtensilsCrossed,
  'Salads': Salad,
  'Desserts': CakeSlice,
  'Vegan': Sprout,
};

const CuisineCategoryPill: React.FC<CuisineCategoryPillProps> = ({
  category,
  isActive = false,
  className
}) => {
  console.log(`CuisineCategoryPill loaded for: ${category}`);

  // Get the corresponding icon, or a default one if not found
  const IconComponent = iconMap[category] || HelpCircle;

  return (
    <Link
      to={`/restaurant-listing?category=${encodeURIComponent(category)}`}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
      aria-label={`Find ${category} restaurants`}
    >
      <IconComponent className="h-4 w-4" />
      <span>{category}</span>
    </Link>
  );
};

export default CuisineCategoryPill;