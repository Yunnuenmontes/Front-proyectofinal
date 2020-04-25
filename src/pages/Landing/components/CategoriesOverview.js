import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faStore, faCookieBite, faGraduationCap, faMicrochip, faRandom  } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  width: 100%;
  min-height: 620px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-family: 'Raleway', sans-serif;
  color: #50545A;
  font-size: 36px;

  @media screen(max-width: 768px) {
    margin-top: 20px;
  }
`;

const Categories = styled.div`
  width: 110%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Card = styled(Link)`
  width: 150px;
  height: 150px;
  margin: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F9F9F9;
  color: #50545A;
  font-family: 'Open-sans', sans-serif;
  font-size: 20px;

  &:hover {
    color: #fff;
    text-decoration: none;
    background-color: green;
  }

  & > svg {
    margin: 10px 0;
    font-size: 60px;
  }
`;

const categories = [

  {
    name: 'Comida',
    icon: faCookieBite,
    to: 'food',
  },

  {
    name: 'Servicios',
    to: 'services',
    icon: faStore
  },

  {
    name: 'Formación',
    icon: faGraduationCap,
    to: 'education',
  },
  {
    name: 'Mascotas',
    to: 'pets',
    icon: faDog,
  },
  {
    name: 'Electrónica',
    icon: faMicrochip,
    to: 'electronics',
  },
  {
    name: 'Otros',
    to: 'others',
    icon: faRandom,
  }
]

const CategoriesOverview = ({ color }) => (
  <Container style={{ backgroundColor: color ? color : '#ffffff' }}>
    <Title>
      Categorias de anuncio
    </Title>
    <Categories>
      {categories.map(({name, icon, to}) => (
        <Card to={color ? `/createAd/${to}` : `/category/${to}`} key={name}>
          <h3>{name}</h3>
          <FontAwesomeIcon icon={icon} />
        </Card>
      ))}
    </Categories>
  </Container>
);


export default CategoriesOverview;
