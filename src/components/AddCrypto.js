import React, { useState } from 'react';
import { AddContainer, AlignItems, AppText, Input } from './styled-components';
import colors from '../assets/colors';

const AddCrypto = ({ handleShowList }) => {
  const [ticker, setTicker] = useState('');

  return (
    <>
      <AlignItems justifyContent='flex-start'>
        <span
          class='material-icons'
          style={{ fontSize: '.8rem', color: colors.header }}
        >
          chevron_left
        </span>
        <AppText color={colors.blue} cursor='pointer' onClick={handleShowList}>
          Back to list
        </AppText>
      </AlignItems>
      <AddContainer>
        <AppText color={colors.black} fontSize='1.5rem'>
          Add a Cryptocurrency
        </AppText>
        <Input
          type='text'
          placeholder='Use a name or ticker symbol...'
          onChange={(e) => setTicker(e.target.value)}
        />
      </AddContainer>
    </>
  );
};

export default AddCrypto;
