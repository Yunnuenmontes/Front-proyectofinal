import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import MainContainer from '../../components/MainContainer/MainContainer';
import CategoriesOverview from '../Landing/components/CategoriesOverview';
import logo from '../../components/Navbar/img/logo.png';
import Footer from '../../components/Footer/Footer';

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
  padding: 10px;
  text-align: center;
`;

const Info = styled.div`
  height: 70px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-top: none;
`;

const Title = styled.h3`
  font-size: 22px;
  font-family: 'Raleway', sans-serif;
  color: #50545A;
  line-height: 3px;
  text-align: center;
  margin-bottom: 4vh;
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

const CreateAd = ({ nameService, _id, nameContact,  imagenesServicio, horarioServicio }) => (
  <MainContainer>
    <Navbar />
    <Image>
      <img src={logo} style={{ maxWidth: '400px', justifyContent: 'center'}}/>
    </Image>
    <Title>Por favor, selecciona una categoría</Title>
    <CategoriesOverview color="yellow"/>
    <Footer />
  </MainContainer>
);

export default CreateAd;