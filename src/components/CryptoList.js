import React from 'react';
import { AlignItems, AppText } from './styled-components';
import colors from '../assets/colors';
import ListItem from './ListItem';

const CryptoList = ({
  handleShowList,
  cryptoListItems,
  handleRemoveCrypto,
  image,
  handleUpdateCrypto,
}) => {
  return (
    <div>
      <div>
        <ListItem
          cryptoListItems={cryptoListItems}
          handleRemoveCrypto={handleRemoveCrypto}
          image={image}
          handleUpdateCrypto={handleUpdateCrypto}
        />
      </div>
      <AlignItems flexDirection='column'>
        <AlignItems margin='2rem 0 0 0'>
          <span
            className='material-icons'
            style={{ fontSize: '.8rem', color: colors.header }}
          >
            add
          </span>
          <AppText
            color={colors.blue}
            cursor='pointer'
            onClick={handleShowList}
          >
            Add a Cryptocurrency
          </AppText>
        </AlignItems>
        {/* code below for updating whole list at once */}
        {cryptoListItems.length > 0 && (
          <AlignItems margin='10px 0 0 0'>
            <span
              className='material-icons'
              style={{ fontSize: '.8rem', color: colors.header }}
            >
              refresh
            </span>
            <AppText
              color={colors.blue}
              cursor='pointer'
              onClick={handleUpdateCrypto}
            >
              Update List
            </AppText>
          </AlignItems>
        )}
      </AlignItems>
    </div>
  );
};

export default CryptoList;
