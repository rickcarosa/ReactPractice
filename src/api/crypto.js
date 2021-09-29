import axios from 'axios';

const CRYPTO_API = 'https://data.messari.io/api/v1/assets';
// for image
const CRYPTO_API_IMAGE = 'https://data.messari.io/api/v2/assets';

export const fetchCryptoData = (assetKey) => {
  return axios.get(`${CRYPTO_API}/${assetKey}/metrics/market-data`);
};

export const fetchImage = (assetKey) => {
  return axios.get(`${CRYPTO_API_IMAGE}/${assetKey}/profile`);
};
