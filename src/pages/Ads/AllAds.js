import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Navbar from '../../components/Navbar/Navbar';
import MainContainer from '../../components/MainContainer/MainContainer';
import Footer from '../../components/Footer/Footer';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';

import Anuncio from '../Category/components/Anuncio';

import API from '../config/API';

const Container = styled.div`
  padding: 30px;
  width: 100%;
  min-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Anuncios = styled.div`
  width: 100%;
  padding: 20px 50px;
  display: flex;
  flex-direction: row;
  overflow: auto;
`;

const Title = styled.h3`
  font-size: 28px;
  font-weight: 700;
  font-family: 'Raleway', sans-serif;
  color: #50545A;
`;

const AllAds = props => {
  const [anuncios, setAnuncios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { params: { category } } = props.match;

  const handleRequest = async () => {
    try {
      setIsLoading(true);
      const response = await API.get(`/anuncio?category=${category}`);
      console.log(response.data);
      setAnuncios(response.data);
      setIsLoading(false);
    } catch(e) {
      setIsLoading(false);
      setError(true)
    }
  };

  useEffect(() => {
    handleRequest();
  }, []);

  return (
    <MainContainer>
      <Navbar />
      { error ?
        <Error />
      :
        <Container>
          <SearchBar />
          <Anuncios>
            {anuncios ? anuncios.map(anuncio => (
              <Anuncio {...anuncio} key={anuncio._id} />
            )) : <Title>Lo sentimos, no hay anuncios nuevos</Title>}
          </Anuncios>
        </Container>
      }
      <Footer />
      <Loader isOpen={isLoading} />
    </MainContainer>
  )
};

export default AllAds;
