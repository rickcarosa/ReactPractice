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

  @media screen and (max-width: 1000px) {
      min-width: 60%;
  }

  @media screen and (min-width: 1201px) {
      max-width 30%;
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
`;

export const AddContainer = styled.div`
  height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  margin-top: 10px;
  padding: 10px 5px;
  opacity: 0.8;

  &:focus {
    border: 2px ${colors.yellow} solid;
    outline: none;
  }
`;

export const Button = styled.button``;
