import React from 'react';

const ErrorState = ({ error }) => {
  return (
    <div className="shopping-list-screen rtl">
      <div className="error">שגיאה: {error}</div>
    </div>
  );
};

export default ErrorState;
