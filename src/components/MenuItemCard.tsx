import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ id, name, description, price, imageUrl }) => {
  console.log('MenuItemCard loaded for:', name);

  const handleAddToCart = () => {
    // In a real app, this would likely dispatch to a global state management library (e.g., Zustand, Redux)
    console.log(`Adding item ${id} (${name}) to cart.`);
    toast.success(`${name} has been added to your cart!`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between p-4 border-b hover:bg-gray-50/50 cursor-pointer group transition-colors duration-150">
          <div className="flex-1 pr-4">
            <h3 className="font-semibold text-md text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{description}</p>
            <p className="text-sm font-bold text-gray-800 mt-2">${price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-4 pl-2">
            {imageUrl && (
              <div className="w-24 h-24 flex-shrink-0 hidden sm:block">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
            <Button
              aria-label={`Quick add ${name} to cart`}
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation(); // Prevent dialog from opening when using the quick add button
                handleAddToCart();
              }}
            >
              <PlusCircle className="h-6 w-6 text-gray-500 group-hover:text-primary transition-colors" />
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {imageUrl && (
            <div className="w-full aspect-video mb-4">
               <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-lg" />
            </div>
          )}
          <DialogTitle className="text-2xl">{name}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h4 className="font-semibold mb-2 text-gray-800">Customization</h4>
          <p className="text-sm text-gray-500">
            Customization options for {name} would go here, such as choosing size, toppings, or special instructions.
          </p>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <span className="text-xl font-bold">${price.toFixed(2)}</span>
            <Button type="button" onClick={handleAddToCart} size="lg">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemCard;