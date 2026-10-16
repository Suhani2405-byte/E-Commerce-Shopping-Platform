import React, { useEffect } from 'react';
import { BehaviorDashboard } from '../components/ai/BehaviorDashboard';

export const AIDashboardPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BehaviorDashboard />
    </div>
  );
};
