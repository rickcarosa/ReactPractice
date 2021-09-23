import React, { useState } from 'react';
import CryptoList from '../components/CryptoList';
import Header from '../components/Header';
import AddCrypto from '../components/AddCrypto';
import { MainCryptoContainer } from '../components/styled-components';

const CryptoContainer = () => {
  const [showList, setShowList] = useState(true);

  const handleShowList = () => {
    setShowList(!showList);
  };

  return (
    <MainCryptoContainer className={!showList ? 'active-class' : ''}>
      {showList && (
        <>
          <Header />
          <CryptoList handleShowList={handleShowList} />
        </>
      )}
      {!showList && <AddCrypto handleShowList={handleShowList} />}
    </MainCryptoContainer>
  );
};

export default CryptoContainer;
