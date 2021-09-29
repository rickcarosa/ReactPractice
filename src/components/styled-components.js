import styled from 'styled-components';
import colors from '../assets/colors';
import logo from '../assets/bg3.jpg';

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BorderContainer = styled.div`
  width: 40%;
  height: 80vh;
  border-radius: 50px;
  border: 3px ${colors.black} solid;
  overflow: auto;

  @media screen and (max-width: 1000px) {
      min-width: 60%;
  }

  @media screen and (min-width: 1201px) {
      max-width 30%;
  }
  
  @media screen and (min-width: 1301px) {
      max-width 25%;
  }
  
  @media screen and (min-width: 1501px) {
      max-width 20%;
  }
`;

export const MainCryptoContainer = styled.div`
  &.active-class {
    margin: 1.5rem;
  }
`;

export const AppText = styled.p`
  color: ${(props) => props.color || `${colors.white}`};
  font-size: ${(props) => props.fontSize || '1rem'};
  cursor: ${(props) => props.cursor};
  margin: ${(props) => props.margin};
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 46px 46px 0 0;
  background: ${colors.blue};
`;

export const HeaderImage = styled.div`
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

export const AlignItems = styled.div`
  display: ${(props) => props.display || 'flex'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  flex-direction: ${(props) => props.flexDirection};
`;

export const AddContainer = styled.div`
  height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    margin-left: auto;
  }
`;

export const Input = styled.input`
  font-size: 1rem;
  margin-top: 10px;
  padding: 10px 5px;
  opacity: 0.8;

  &:focus {
    border: 2px ${colors.yellow} solid;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 7rem;
  font-size: 1rem;
  background: ${colors.yellow};
  color: ${colors.blue};
  padding: 10px 0;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ItemContainer = styled.div`
  margin: 30px 20px 10px;

  .remove {
    display: none;
  }

  .item-wrapper:hover {
    .remove {
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
  }
`;
