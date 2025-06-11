import React from 'react';
import { CheckCircle, Circle, Loader2 } from 'lucide-react'; // Icons for steps

interface Step {
  id: string;
  name: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface OrderProgressIndicatorProps {
  steps: Step[];
  // Potentially add orientation (horizontal/vertical)
}

const OrderProgressIndicator: React.FC<OrderProgressIndicatorProps> = ({ steps }) => {
  console.log("Rendering OrderProgressIndicator with steps:", steps.length);

  if (!steps || steps.length === 0) {
    return <p className="text-sm text-gray-500">Order status not available.</p>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2
                  ${step.isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                  ${step.isCurrent ? 'bg-orange-500 border-orange-500 text-white animate-pulse' : ''}
                  ${!step.isCompleted && !step.isCurrent ? 'bg-gray-100 border-gray-300 text-gray-400' : ''}
                `}
              >
                {step.isCompleted ? (
                  <CheckCircle size={20} />
                ) : step.isCurrent ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Circle size={20} />
                )}
              </div>
              <p
                className={`mt-2 text-xs md:text-sm font-medium
                  ${step.isCompleted ? 'text-green-600' : ''}
                  ${step.isCurrent ? 'text-orange-600' : ''}
                  ${!step.isCompleted && !step.isCurrent ? 'text-gray-500' : ''}
                `}
              >
                {step.name}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-1 md:mx-2
                  ${step.isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OrderProgressIndicator;