import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadingState = () => {
  const { t } = useTranslation();

  return (
    <div className="shopping-list-screen rtl">
      <div className="loading">{t('common.loading')}</div>
    </div>
  );
};

export default LoadingState;
