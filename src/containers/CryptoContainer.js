import React, { useState, useEffect } from 'react';
import CryptoList from '../components/CryptoList';
import Header from '../components/Header';
import AddCrypto from '../components/AddCrypto';
import { MainCryptoContainer } from '../components/styled-components';
import { fetchCryptoData, fetchImage } from '../actions/crypto';
import { connect } from 'react-redux';

const CryptoContainerBase = ({
  fetchCryptoData,
  cryptoData,
  isCryptoDataFetching,
  image,
  fetchImage,
}) => {
  const [ticker, setTicker] = useState('');
  const [showList, setShowList] = useState(true);
  const [cryptoListItems, setCryptoListItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [added, setAdded] = useState(false);

  // add crypto data to list on add
  useEffect(() => {
    if (added) {
      // add image key
      cryptoData.logo = image;
      setCryptoListItems([...cryptoListItems, cryptoData]);
      setAdded(false);
    }
  }, [added, setAdded, setCryptoListItems, cryptoListItems, cryptoData, image]);

  const handleShowList = () => {
    setShowList(!showList);
    setTicker('');
    setShowError(false);
  };

  // remove crypto item from list
  const handleRemoveCrypto = (index) => {
    const array = cryptoListItems.filter((_, i) => i !== index);
    setCryptoListItems(array);
  };

  const handleAddCrypto = (assetKey) => {
    // if items exist in the list, check to make sure item isn't already in list
    if (cryptoListItems.length) {
      const arrayOne = cryptoListItems.map((item) => item.name.toLowerCase());
      const arrayTwo = cryptoListItems.map((item) => item.symbol.toLowerCase());

      const joinedArrays = [...arrayOne, ...arrayTwo];

      // if item is in list, show error
      if (joinedArrays.includes(assetKey.toLowerCase())) {
        setErrorMessage('Crypto already owned! Please try again.');
        setShowError(true);
      } else {
        const cryptoPromise = Promise.all([
          fetchCryptoData(assetKey),
          fetchImage(assetKey),
        ]);
        cryptoPromise
          .then(() => {
            setShowList(true);
            setShowError(false);
            setAdded(true);
          })
          .catch((err) => {
            console.error(err);
            // Didn't see a nice returned error message
            setErrorMessage('Crypto not found. Please try again.');
            setShowError(true);
          })
          .finally(() => {
            setTicker('');
          });
      }
    }

    // if no items in list, run the query for the item
    if (!cryptoListItems.length) {
      const cryptoPromise = Promise.all([
        fetchCryptoData(assetKey),
        fetchImage(assetKey),
      ]);

      cryptoPromise
        .then(() => {
          setShowList(true);
          setAdded(true);
        })
        .catch((err) => {
          console.error(err);
          // Didn't see a nice returned error message
          setErrorMessage('Crypto not found. Please try again.');
          setShowError(true);
        })
        .finally(() => {
          setTicker('');
        });
    }
  };

  const handleUpdateCrypto = (item) => {
    // loop over items to fetch for each crypto in list
    let infoArray = [];
    for (let i = 0; i < cryptoListItems.length; i++) {
      infoArray.push(fetchCryptoData(cryptoListItems[i].symbol));
    }

    // for each item in array, set the new data fetched to the old data
    // add logo to new data set because it is removed when fetch above runs
    // set crypto list items to new array returned from map
    Promise.all(infoArray).then((res) => {
      let array = res.map((value) => {
        const newCryptoData = value.value.data.data;
        const oldCryptoData = cryptoListItems.find(
          (cd) => cd.symbol === newCryptoData.symbol
        );
        newCryptoData.logo = oldCryptoData.logo;
        return newCryptoData;
      });
      setCryptoListItems(array);
    });
  };

  return (
    <MainCryptoContainer className={!showList ? 'active-class' : ''}>
      {showList && !isCryptoDataFetching && (
        <>
          <Header />
          <CryptoList
            handleShowList={handleShowList}
            cryptoListItems={cryptoListItems}
            handleRemoveCrypto={handleRemoveCrypto}
            image={image}
            handleUpdateCrypto={handleUpdateCrypto}
          />
        </>
      )}
      {!showList && (
        <AddCrypto
          ticker={ticker}
          setTicker={setTicker}
          handleShowList={handleShowList}
          handleAddCrypto={handleAddCrypto}
          isCryptoDataFetching={isCryptoDataFetching}
          errorMessage={errorMessage}
          showError={showError}
          setShowList={setShowList}
        />
      )}
    </MainCryptoContainer>
  );
};

const mapStateToProps = (state) => ({
  cryptoData: state.crypto.cryptoData,
  isCryptoDataFetching: state.crypto.isCryptoDataFetching,
  image: state.crypto.cryptoImage,
});

const CryptoContainer = connect(mapStateToProps, {
  fetchCryptoData,
  fetchImage,
})(CryptoContainerBase);
export default CryptoContainer;
