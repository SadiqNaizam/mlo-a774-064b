import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChefHat, Bike, PartyPopper } from 'lucide-react';
import { cn } from "@/lib/utils";

// Define the stages of the order process
const stages = [
  { name: 'Confirmed', icon: CheckCircle },
  { name: 'Preparing', icon: ChefHat },
  { name: 'On its way', icon: Bike },
  { name: 'Delivered', icon: PartyPopper },
];

interface OrderTrackerProps {
  /** The current stage of the order, 0-indexed. For example, 2 means 'On its way'. */
  currentStage: number;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStage = 0 }) => {
  console.log('OrderTracker loaded with current stage:', currentStage);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Track Your Order</CardTitle>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          {stages.map((stage, index) => {
            const isCompleted = currentStage > index;
            const isActive = currentStage === index;
            const isUpcoming = currentStage < index;

            return (
              <React.Fragment key={stage.name}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-300",
                      {
                        "bg-green-500 border-green-600 text-white": isCompleted,
                        "bg-blue-500 border-blue-600 text-white animate-pulse": isActive,
                        "bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500": isUpcoming,
                      }
                    )}
                  >
                    <stage.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-xs sm:text-sm font-semibold transition-colors duration-300",
                      {
                        "text-green-600 dark:text-green-400": isCompleted,
                        "text-blue-600 dark:text-blue-400": isActive,
                        "text-gray-500 dark:text-gray-400": isUpcoming,
                      }
                    )}
                  >
                    {stage.name}
                  </p>
                </div>
                {index < stages.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-1 mx-2 sm:mx-4 rounded-full transition-colors duration-500",
                      {
                        "bg-green-500": isCompleted,
                        "bg-gray-200 dark:bg-gray-700": !isCompleted,
                      }
                    )}
                  >
                    {isActive && (
                      <div className="h-full w-1/2 bg-blue-500 rounded-l-full animate-progress-bar" />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;