import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f4e04d;
  width: 100%;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: 'Raleway', sans-serif;
  color: #50545A;
  padding: 80px 150px;
`;

const Title = styled.h1`
  font-size: 50px;
`;

const Info = styled.div`
  display: flex;
  font-size: 26px;
  color: #000000;
  margin: 30px 0;
`;


const Hero = () => (
  <Container>
    <Title>
      ¿Qué es tu comercio local?
    </Title>
    <Info>
      Tu Comercio Local busca aportar su ayuda para reactivar la economía de pequeñas y medianas empresas y todas quellas personas que se han visto afectadas económicamente por la contingencia.
    </Info>
  </Container>
);

export default Hero;
