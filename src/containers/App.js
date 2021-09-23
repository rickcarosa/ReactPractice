import React from 'react';
import {
  BorderContainer,
  MainContainer,
} from '../components/styled-components';
import CryptoContainer from './CryptoContainer';

const App = () => {
  return (
    <MainContainer>
      <BorderContainer>
        <CryptoContainer />
      </BorderContainer>
    </MainContainer>
  );
};

export default App;
