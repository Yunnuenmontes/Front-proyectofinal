import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import MainContainer from '../../components/MainContainer/MainContainer';

const Container = styled(Link)`
  width: 260px;
  height: 240px;
  display: flex;
  flex-direction: column;

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
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-top: none;
`;

const Title = styled.h3`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  color: #50545A;
  line-height: 3px;
`;

const Hour = styled.span`
  display: flex;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  color: #F09000;
`;

const Name = styled.span`
  display: flex;
  font-size: 10px;
  font-family: 'Open Sans', sans-serif;
  color: #9199A1;
  line-height: 10px;
`;

const Tutorial = ({ nameService, _id, nameContact,  imagenesServicio, horarioServicio }) => (
  <MainContainer>
    <Navbar />
    <Image>
      <img src={(imagenesServicio && imagenesServicio.length) ? imagenesServicio[0] : ''} alt={nameService} />
    </Image>
    <Info>
      <Title>
        {nameService}
      </Title>
      <Hour>
        {horarioServicio}
      </Hour>
      <Name>
        {nameContact}
      </Name>
    </Info>
  </MainContainer>
);

export default Tutorial;