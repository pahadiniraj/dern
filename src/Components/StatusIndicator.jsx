import React from 'react';

const StatusIndicator = ({ color, darkMode = false }) => {
  const bgColor = darkMode ? `dark:bg-${color}-700` : `bg-${color}-500`;

  return (
    <span className={`flex w-3 h-3 me-3 rounded-full ${bgColor}`}></span>
  );
};

export default StatusIndicator;
