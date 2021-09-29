import React from 'react';
import { ItemContainer, AlignItems, AppText } from './styled-components';
import { dollarFormatter } from '../utils';
import colors from '../assets/colors';

const ListItem = ({ cryptoListItems, handleRemoveCrypto }) => {
  return (
    <ItemContainer className='container'>
      {cryptoListItems && cryptoListItems.length > 0 && (
        <div>
          {/* map over list items to show list */}
          {cryptoListItems.map((item, index) => (
            <div className='item-wrapper' key={item.id}>
              <div style={{ display: 'flex' }}>
                <img
                  style={{
                    width: '45px',
                    height: '45px',
                    margin: '0 10px 0 0',
                  }}
                  src={
                    item && item.logo
                      ? `${item.logo}`
                      : 'https://waytomine.com/wp-content/uploads/2018/05/tether-logo.png'
                  }
                  alt='crypto'
                />
                <AlignItems width='100%' justifyContent='space-between'>
                  <div>
                    <AppText
                      color={colors.black}
                      fontSize='1.1rem'
                      margin='0 0 3px 0'
                    >
                      {item.name}
                    </AppText>
                    <AppText color={colors.grey} fontSize='.8rem'>
                      {item.symbol}
                    </AppText>
                  </div>
                  <AlignItems flexDirection='column' alignItems='flex-end'>
                    <AppText color={colors.black} margin='0 0 3px 0'>
                      {/* utils function to convert to dollar price in USD */}
                      {dollarFormatter(item.market_data.price_usd, 2)}
                    </AppText>
                    <AlignItems>
                      {item.market_data.percent_change_usd_last_24_hours
                        .toString()
                        .includes('-') ? (
                        <span
                          className='material-icons'
                          style={{ fontSize: '.8rem', color: colors.red }}
                        >
                          south_west
                        </span>
                      ) : (
                        <span
                          className='material-icons'
                          style={{ fontSize: '.8rem', color: colors.green }}
                        >
                          north_east
                        </span>
                      )}
                      {/* based on negative or positive number change color and make percent  */}
                      <AppText
                        color={
                          item.market_data.percent_change_usd_last_24_hours
                            .toString()
                            .includes('-')
                            ? colors.red
                            : colors.green
                        }
                      >
                        {item.market_data.percent_change_usd_last_24_hours
                          .toFixed(2)
                          .toString()
                          .substring(1)}
                        %
                      </AppText>
                    </AlignItems>
                  </AlignItems>
                </AlignItems>
              </div>
              <div className='remove'>
                <div onClick={() => handleRemoveCrypto(index)}>Remove</div>
              </div>
              <hr style={{ opacity: '0.2', margin: '20px 0' }} />
            </div>
          ))}
        </div>
      )}
    </ItemContainer>
  );
};

export default ListItem;
