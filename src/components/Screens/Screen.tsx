import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hideBackButton, onBackButtonClick, showBackButton } from '@telegram-apps/sdk-react';
import { DefaultScreenProps } from './ScreenProps';

export function Screen({ children, back = true }: DefaultScreenProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      showBackButton();
      return onBackButtonClick(() => {
        navigate(-1);
      });
    }
    hideBackButton();
  }, [back]);

  return <>{children}</>;
}

