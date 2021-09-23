import React from 'react';
import { AlignItems, AppText } from './styled-components';
import colors from '../assets/colors';

const CryptoList = ({ handleShowList }) => {
  return (
    <AlignItems margin='2rem 0 0 0'>
      <span
        class='material-icons'
        style={{ fontSize: '.8rem', color: colors.header }}
      >
        add
      </span>
      <AppText color={colors.blue} cursor='pointer' onClick={handleShowList}>
        Add a Cryptocurrency
      </AppText>
    </AlignItems>
  );
};

export default CryptoList;
