import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar as BootstrapNavbar } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { darken } from 'polished';
import styled from 'styled-components';

import logo from './img/logo.png';

const StyledNavbar = styled(BootstrapNavbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 80px;
  flex-wrap: nowrap;
`;

const Logo = styled.div`
  width: 200px;


  img {
    width: 100%;
    height: auto;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > a {
    display: flex;
    color: #333;
    padding: 0 20px;
    margin: 0;
    line-height: 18px;
  }

  & > a:not(:last-child) {
    border-right: 1px solid #333;
  }
`;

const Facebook = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  margin: 0 10px;
`;

const StyledButton = styled(Button)`
  background-color: ${({color}) => color};
  margin: 0 15px;
  color: #fff;

  &:hover {
    color: #fff;
    background-color: ${({color}) => darken(0.05, color)}
  }
`;

const Navbar = () => (
  <StyledNavbar>
    <Logo>
      <Link to="/">
        <img alt="comercio local logo" src={logo} />
      </Link>
    </Logo>
    <ButtonsContainer>
      <Links>
        <Link to="/">
          Home
        </Link>
        <Link to="/anuncios">
          Anuncios
        </Link>
        <Link to="/anuncios/me">
          Tus anuncios
        </Link>
        <Link to="/anuncios/new">
          Pon tu anuncio
        </Link>
      </Links>
      { window.localStorage.getItem('user') ?
        <Link to="/logout">
          <StyledButton color="#D30A52" >
            <FontAwesomeIcon icon={faSignInAlt} /> Cerrar sesión
          </StyledButton>
        </Link>
      :
        <>
          <Link to="/login">
            <StyledButton color="#009F97" >
              <FontAwesomeIcon icon={faSignInAlt} /> Iniciar sesión
            </StyledButton>
          </Link>
          <Link to="/signup">
            <StyledButton color="#D30A52">
              <FontAwesomeIcon icon={faUserPlus} /> Registarse
            </StyledButton>
          </Link>
        </>
      }
      <Facebook href="https://facebook.com" target="_blank">
        <FontAwesomeIcon icon={faFacebook} />
      </Facebook>
    </ButtonsContainer>
  </StyledNavbar>
);

export default Navbar;
