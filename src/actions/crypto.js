import * as api from '../api/crypto';

export const fetchCryptoData = (assetKey) => ({
  type: 'FETCH_CRYPTO_DATA',
  payload: api.fetchCryptoData(assetKey),
});

export const fetchImage = (assetKey) => ({
  type: 'FETCH_IMAGE',
  payload: api.fetchImage(assetKey),
});
