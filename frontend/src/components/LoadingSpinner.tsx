import React from 'react';
import { ClipLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  color?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ color = '#795548', size = 64 }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default LoadingSpinner;
