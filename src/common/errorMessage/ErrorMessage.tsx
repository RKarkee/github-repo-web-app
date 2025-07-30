import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  title?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  title = 'Error' 
}) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
      <div className="flex items-start">
        <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
            {title}
          </h3>
          <p className="text-red-700 dark:text-red-400">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;