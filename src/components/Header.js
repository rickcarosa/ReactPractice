import React from 'react';
import { HeaderContainer, HeaderImage, AppText } from './styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <AppText fontSize='1.125rem'>CryptoTracker Pro</AppText>
      <HeaderImage />
    </HeaderContainer>
  );
};

export default Header;
