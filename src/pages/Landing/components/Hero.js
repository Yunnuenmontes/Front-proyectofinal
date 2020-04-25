import React from 'react';
import styled from 'styled-components';

import SearchBar from '../../../components/SearchBar/SearchBar';

import background from '../img/background.jpg';

const Container = styled.div`
  width: 100%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #fff, transparent), url(${background});
  font-family: 'Raleway', sans-serif;
  color: #50545A;
  background-size: cover;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const Subtitle = styled.h2`
  font-size: 32px;
`

const Hero = () => (
  <Container>
    <Title>
      Apoyando el comercio local
    </Title>
    <Subtitle>
      ¡Descubre lo que hay por ahí!
    </Subtitle>
    <SearchBar />
  </Container>
);

export default Hero;
