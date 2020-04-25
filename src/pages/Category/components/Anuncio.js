import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import placeholder from '../img/placeholder.png';

const Container = styled(Link)`
  width: 260px;
  height: 280px;
  min-width: 260px;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  margin: 5px;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const Image = styled.div`
  height: 170px;
  width: 100%;

  & > img {
    width: 100%;
    object-fit: cover;
  }
  overflow: hidden;
`;

const Info = styled.div`
  height: 70px;
  background-color: #000;
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-top: none;
`;

const Title = styled.h3`
  font-size: 22px;
  font-family: 'Raleway', sans-serif;
  color: #FFFFFF;
  line-height: 3px;
  font-weight: 700;
`;

const Hour = styled.span`
  display: flex;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  color: #FFFFFF;
`;

const Name = styled.span`
  display: flex;
  font-size: 15px;
  font-family: 'Open Sans', sans-serif;
  color: #FFFFFF;
  line-height: 10px;
`;

const Anuncio = ({ nameService, _id, nameContact,  imagenesServicio, horarioServicio, delegacion, colonia }) => (
  <Container to={`/anuncio/${_id}`}>
    <Image>
      <img src={imagenesServicio.length ? imagenesServicio[0] : placeholder} alt={nameService} />
    </Image>
    <Info>
      <Title>
        {nameService}
      </Title>
      <Hour>
        {horarioServicio}
      </Hour>
      <Name>
        {delegacion}, {colonia}
      </Name>
    </Info>
  </Container>
);

export default Anuncio;