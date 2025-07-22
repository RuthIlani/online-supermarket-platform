import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorState = ({ error }) => {
  const { t } = useTranslation();

  return (
    <div className="shopping-list-screen rtl">
      <div className="error">{t('common.error')}: {error}</div>
    </div>
  );
};

export default ErrorState;
