import React, { useState, useEffect, useRef } from 'react';
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
  const [listRefresh, setListRefresh] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [added, setAdded] = useState(false);

  // const cryptoListItems = useRef([]);

  // console.log('update', isUpdating);
  // useEffect(() => {
  //   if (Object.keys(cryptoData).length && image) {
  //     // console.log('hi');
  //     // console.log(cryptoData);
  //     // add logo key value pair to crypto data
  //     cryptoData.logo = image;
  //     cryptoListItems.current.push(cryptoData);
  //   }
  // }, [cryptoData, image]);

  useEffect(() => {
    if (added) {
      cryptoData.logo = image;
      setCryptoListItems([...cryptoListItems, cryptoData]);
      setAdded(false);
    }
  }, [added, setAdded, setCryptoListItems, cryptoListItems, cryptoData, image]);

  useEffect(() => {
    if (isUpdating) {
      console.log(cryptoListItems);
      setCryptoListItems([...cryptoListItems]);
      setIsUpdating(false);
    }
  }, [
    isUpdating,
    setIsUpdating,
    setCryptoListItems,
    cryptoListItems,
    cryptoData,
  ]);

  const handleShowList = () => {
    setShowList(!showList);
    setTicker('');
    setShowError(false);
  };

  const handleRemoveCrypto = (index) => {
    // const array = cryptoListItems.current.filter((_, i) => i !== index);
    // cryptoListItems.current = array;
    const array = cryptoListItems.filter((_, i) => i !== index);
    setCryptoListItems(array);
    // setListRefresh(true);
  };

  const handleAddCrypto = (assetKey) => {
    // if items in the list, check to make sure item isn't already in list
    // if (cryptoListItems.current.length) {
    if (cryptoListItems.length) {
      // const arrayOne = cryptoListItems.current.map((item) =>
      //   item.name.toLowerCase()
      // );
      // const arrayTwo = cryptoListItems.current.map((item) =>
      //   item.symbol.toLowerCase()
      // );
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
    // if (!cryptoListItems.current.length) {
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
    // console.log(item);
    // setIsUpdating(true);
    // fetchCryptoData(item.symbol);

    const names = cryptoListItems.map((item) => item.name);
    // for (const name of names) {
    //   setIsUpdating(true);
    //   console.log(name);
    //   fetchCryptoData(name);
    // }
    let infoArray = [];
    for (let i = 0; i < names.length; i++) {
      infoArray.push(fetchCryptoData(names[i]));
    }
    let imageArray = [];
    for (let i = 0; i < names.length; i++) {
      imageArray.push(fetchImage(names[i]));
    }

    let array = [];
    Promise.all(infoArray).then((res) =>
      res.map((value) => {
        setIsUpdating(true);
        array.push(value.value.data.data);
        console.log('array', array);
        // return value.value.data.data;
      })
    );
    // setCryptoListItems(array);

    Promise.all(imageArray).then((res) =>
      res.map(
        (value) =>
          (cryptoData.logo =
            value.value.data.data.profile.contributors.organizations[0].logo)
      )
    );
  };

  // console.log('error', showError);
  // console.log('list', showList);
  // console.log('cryptoData', cryptoData);
  // console.log('listItems', cryptoListItems);

  return (
    <MainCryptoContainer className={!showList ? 'active-class' : ''}>
      {showList && !isCryptoDataFetching && (
        <>
          <Header />
          <CryptoList
            handleShowList={handleShowList}
            // cryptoListItems={cryptoListItems.current}
            cryptoListItems={cryptoListItems}
            handleRemoveCrypto={handleRemoveCrypto}
            listRefresh={listRefresh}
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
