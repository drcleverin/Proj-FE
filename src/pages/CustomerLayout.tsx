// components/customer/CustomerLayout.tsx
import React from 'react';

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container">
        {children}
      </div>
    </div>
  );
}