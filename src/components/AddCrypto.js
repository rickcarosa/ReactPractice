import React from 'react';
import {
  AddContainer,
  AlignItems,
  AppText,
  Button,
  Input,
} from './styled-components';
import colors from '../assets/colors';

const AddCrypto = ({
  ticker,
  setTicker,
  handleShowList,
  handleAddCrypto,
  isCryptoDataFetching,
  errorMessage,
  showError,
}) => {
  return (
    <>
      <AlignItems justifyContent='flex-start'>
        <span
          className='material-icons'
          style={{ fontSize: '.8rem', color: colors.header }}
        >
          chevron_left
        </span>
        <AppText color={colors.blue} cursor='pointer' onClick={handleShowList}>
          Back to list
        </AppText>
      </AlignItems>
      <AddContainer>
        <AppText color={colors.addText} fontSize='1.5rem'>
          Add a Cryptocurrency
        </AppText>
        <Input
          type='text'
          placeholder='Use a name or ticker symbol...'
          onChange={(e) => setTicker(e.target.value)}
          value={ticker.length ? ticker : ''}
        />
        {!isCryptoDataFetching && showError && (
          <AlignItems justifyContent='flex-start'>
            <span
              className='material-icons'
              style={{ fontSize: '1rem', color: `${colors.red}` }}
            >
              error_outline
            </span>
            <AppText margin='5px' fontSize='.8rem' color={colors.red}>
              {errorMessage}
            </AppText>
          </AlignItems>
        )}
        <Button
          disabled={!ticker.length || isCryptoDataFetching}
          onClick={() => handleAddCrypto(ticker)}
        >
          Add
        </Button>
      </AddContainer>
    </>
  );
};

export default AddCrypto;
