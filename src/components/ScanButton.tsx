
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface ScanButtonProps {
  onClick: () => void;
  disabled: boolean;
  isScanning: boolean;
}

const ScanButton = ({ onClick, disabled, isScanning }: ScanButtonProps) => {
  return (
    <div className="flex justify-center my-6">
      <Button
        onClick={onClick}
        disabled={disabled || isScanning}
        className="px-8 py-6 text-lg"
      >
        {isScanning ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
            Analyzing...
          </>
        ) : (
          <>
            <Search className="mr-2 h-5 w-5" />
            Analyze Match
          </>
        )}
      </Button>
    </div>
  );
};

export default ScanButton;
