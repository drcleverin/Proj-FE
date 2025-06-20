import React from 'react';

const CardContent = ({ className, children, ...props }) => {
  return (
    <div
      className={className} // Allows passing Tailwind CSS classes or other CSS classes
      {...props} // Spreads any other HTML attributes like style, onClick, etc.
    >
      {children} {/* Renders whatever is placed inside <CardContent>...</CardContent> */}
    </div>
  );
};

export { CardContent };