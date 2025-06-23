import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star, Clock, CircleDollarSign } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
}) => {
  console.log('RestaurantCard loaded for:', name);

  const deliveryFeeText = deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`;

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl group border-transparent hover:border-primary">
      <Link to="/restaurant-detail" state={{ restaurantId: id }} aria-label={`View details for ${name}`}>
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225'}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 space-y-2 bg-card">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg leading-snug line-clamp-2">{name}</h3>
            <Badge variant="outline" className="flex-shrink-0">{cuisine}</Badge>
          </div>
          <div className="flex items-center justify-start pt-1 text-sm text-muted-foreground gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleDollarSign className="w-4 h-4" />
              <span>{deliveryFeeText}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default RestaurantCard;