import { combineReducers } from 'redux';

const cryptoData = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_CRYPTO_DATA_FULFILLED':
      return action.payload.data.data;
    case 'FETCH_CRYPTO_DATA_REJECTED':
    case 'FETCH_CRYPTO_DATA_PENDING':
      return {};
    default:
      return state;
  }
};

const isCryptoDataFetching = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_CRYPTO_DATA_PENDING':
    case 'FETCH_IMAGE_PENDING':
      return true;
    case 'FETCH_CRYPTO_DATA_REJECTED':
    case 'FETCH_IMAGE_REJECTED':
    case 'FETCH_CRYPTO_DATA_FULFILLED':
    case 'FETCH_IMAGE_FULFILLED':
      return false;
    default:
      return state;
  }
};

const cryptoImage = (state = '', action) => {
  switch (action.type) {
    // path from api for images, not all cryptos have it
    case 'FETCH_IMAGE_FULFILLED':
      return action.payload.data.data.profile.contributors.organizations[0]
        .logo;
    case 'FETCH_IMAGE_REJECTED':
    case 'FETCH_IMAGE_PENDING':
      return '';
    default:
      return state;
  }
};

const crypto = combineReducers({
  cryptoData,
  isCryptoDataFetching,
  cryptoImage,
});

export default crypto;
